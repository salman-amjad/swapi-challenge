import { ChangeEvent, FC, useState } from "react"
import { Drawer, Box } from "@material-ui/core"
import { useStyles } from "./styles"
import { useQuery, gql } from "@apollo/client"
import { Planet, Root, Species } from "graphql/models"
import { FiltersList, SyntheticFilm } from "./FiltersList"

interface FiltersQueryType extends Pick<Root, "allSpecies" | "allPlanets" | "allFilms"> { }
export interface FiltersChangeType {
  films: string[];
  planets: string[];
  species: string[];
}

interface ComponentProps {
  isOpen: boolean;
  onClose?: () => void;
  onChange: (filters: FiltersChangeType) => void;
}

const GET_FILTERS = gql`
  query GetFilters {
    allFilms{
        films {
            id
            name: title
        }
    }
    allPlanets {
        planets {
            id
            name
        }
    }
    allSpecies {
        species {
            id
            name
        }
    }
}
`

export const FiltersDrawer: FC<ComponentProps> = ({ isOpen, onClose, onChange }) => {
  const classes = useStyles()
  const [filmFilters, setFilmFilters] = useState<string[]>([])
  const [planetFilters, setPlanetFilters] = useState<string[]>([])
  const [specieFilters, setSpecieFilters] = useState<string[]>([])

  // Execute the query
  const { data: { allSpecies, allPlanets, allFilms } = {} } = useQuery<FiltersQueryType>(GET_FILTERS)

  // TODO: make testable
  const handleChange = (type: keyof FiltersChangeType) => (event: ChangeEvent<HTMLInputElement>) => {
    // Get current filters
    let currentFilters: string[] = []
    let updateFunction;

    // Handle film filters
    if (type === "films") {
      updateFunction = setFilmFilters
      currentFilters = [...filmFilters]
    }

    // Handle planet filters
    if (type === "planets") {
      updateFunction = setPlanetFilters
      currentFilters = [...planetFilters]
    }

    // Handle specie filters
    if (type === "species") {
      updateFunction = setSpecieFilters
      currentFilters = [...specieFilters]
    }

    if (event.target.checked) {
      // Push to the array if checked
      currentFilters.push(event.target.name)
    } else {
      // Remove from the array if un-checked
      currentFilters = currentFilters.filter(id => id !== event.target.name)
    }

    // Update the relevant filter values
    updateFunction(currentFilters)
    onChange({
      films: filmFilters,
      planets: planetFilters,
      species: specieFilters,
      [type]: currentFilters
    })
  }

  return (
    <Drawer anchor="right" open={isOpen} onClose={onClose}>
      <Box className={classes.filtersWrapper}>
        {!!allFilms && !!allFilms.films && (
          <FiltersList
            md={6}
            title="Films"
            items={allFilms.films as SyntheticFilm[]}
            selectedFilters={filmFilters}
            onChange={handleChange("films")}
          />
        )}

        {!!allPlanets && !!allPlanets.planets && (
          <FiltersList
            title="Planets"
            items={allPlanets.planets as Planet[]}
            selectedFilters={planetFilters}
            onChange={handleChange("planets")}
          />
        )}

        {!!allSpecies && !!allSpecies.species && (
          <FiltersList
            title="Species"
            items={allSpecies.species as Species[]}
            selectedFilters={specieFilters}
            onChange={handleChange("species")}
          />
        )}
      </Box>
    </Drawer>
  )
}