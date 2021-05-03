import { FC } from "react"
import { useQuery, gql } from "@apollo/client"
import { Grid } from "@material-ui/core"
import { useQuery as blitzUseQuery } from "blitz"

import { Root, RootAllPeopleArgs, Person } from "graphql/models"
import { CharacterTile } from "app/characters/components/CharacterTile"
import getFavorites from "app/users/queries/getFavorites"
import { filterCharactersByName, sortCharactersByAttribute, SortableAttributes, filterCharactersByAttribute } from "app/core/utils"

interface AllPeople extends Pick<Root, "allPeople"> { }

interface ComponentProps {
  searchQuery?: string;
  sortOrder?: SortableAttributes;
}
const GET_CHARACTERS = gql`
  query GetPeople {
    allPeople {
      people{
          id
          name
          gender
          homeworld {
              id
              name
          }
      }
    }
  }
`

export const CharactersList: FC<ComponentProps> = ({ searchQuery, sortOrder, filters }) => {
  const [faves] = blitzUseQuery(getFavorites, null)
  const { data: { allPeople } = {} } = useQuery<AllPeople, RootAllPeopleArgs>(GET_CHARACTERS, {})

  // Get characters from query result
  let characters: Person[] = []
  if (!!allPeople && !!allPeople.people) {
    characters = [...allPeople.people] as Person[]

    // Filters characters using search query
    if (!!searchQuery) characters = filterCharactersByName(searchQuery, characters)

    // Apply sort order
    if (!!sortOrder) characters = sortCharactersByAttribute(sortOrder, characters)
  }

  return (
    <Grid container spacing={2}>
      {!!characters && characters.map((character: Person) => (
        <Grid item md={3} xs={6}>
          <CharacterTile
            key={character.id}
            inFavorites={!!faves && faves.some(item => item.characterId === atob(character.id))}
            character={character}
          />
        </Grid>
      ))}
    </Grid>
  )
}

export default CharactersList