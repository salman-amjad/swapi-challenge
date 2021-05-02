import { useQuery, gql } from "@apollo/client"
import { Grid } from "@material-ui/core"
import { useQuery as blitzUseQuery } from "blitz"

import { Root, RootAllPeopleArgs, Person } from "graphql/models"
import { CharacterTile } from "app/characters/components/CharacterTile"
import getFavorites from "app/users/queries/getFavorites"

interface AllPeople extends Pick<Root, "allPeople"> { }

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

export const CharactersList = () => {
  const [faves, { error, isLoading }] = blitzUseQuery(getFavorites, null)
  const { data: { allPeople = {} as AllPeople["allPeople"] } = {}, loading } = useQuery<AllPeople, RootAllPeopleArgs>(GET_CHARACTERS, {})

  return (
    <Grid container spacing={2}>
      {allPeople && allPeople.people && allPeople.people.map((character: Person) => (
        <Grid item md={3} xs={6}>
          <CharacterTile
            key={character.id}
            inFavorites={!!faves && faves.some(item => item.characterId == atob(character.id))}
            character={character}
          />
        </Grid>
      ))}
    </Grid>
  )
}

export default CharactersList