import { FC, Suspense } from "react"
import { Link as BlitzLink, useRouter, useParam, BlitzPage, Routes, ErrorComponent } from "blitz"
import { gql, useQuery } from "@apollo/client"
import { Typography, Link, Card, Grid, List, ListItem, ListItemText, Backdrop, Chip, Badge } from "@material-ui/core"
import Layout from "app/core/layouts/Layout"
import { Breadcrumbs } from "app/core/components"
import { parseCharacterId } from "app/core/utils"
import { Maybe, Root, RootPersonArgs } from "graphql/models"

interface Person extends Pick<Root, "person"> { }

const GET_CHARACTER = gql`
  query GetPerson(
    $personID: ID
  ) {
    person(personID: $personID){
        id
        name
        birthYear
        gender
        eyeColor
        hairColor
        skinColor
        height
        mass
        homeworld {
          id
          name
        }
        filmConnection {
          totalCount
          films {
              id
              title
          }
        }
    }
  }
`

interface CharacterBioItemProps {
  title: string;
  value?: Maybe<string>;
}

const CharacterBioItem: FC<CharacterBioItemProps> = ({ title, value }) => (
  <Grid item xs={6} md={4}>
    <List>
      <ListItem>
        <ListItemText
          primary={title}
          secondary={value}
        />
      </ListItem>
    </List>
  </Grid>
)

export const Character = () => {
  const characterIdParam = useParam("characterId", "string")
  const personID = parseCharacterId(characterIdParam)
  const { loading, error, data } = useQuery<Person, RootPersonArgs>(GET_CHARACTER, { variables: { personID } })
  if (loading) return <Backdrop open />
  if (!!!data || !!!data.person || error) return <ErrorComponent statusCode={404} />
  const { person: character } = data

  return (
    <>
      {!!character.name && (
        <Breadcrumbs currentPage={character.name} />
      )}

      <Typography variant="h3" style={{ padding: "20px 0" }}>
        {character.name}
      </Typography>

      <Card>
        <Grid container spacing={1}>
          <CharacterBioItem
            title="BirthYear"
            value={character.birthYear}
          />

          <CharacterBioItem
            title="Gender"
            value={character.gender}
          />

          <CharacterBioItem
            title="Eye Color"
            value={character.eyeColor}
          />

          <CharacterBioItem
            title="Hair Color"
            value={character.hairColor}
          />

          <CharacterBioItem
            title="Skin Color"
            value={character.skinColor}
          />

          {!!character.homeworld && (
            <CharacterBioItem
              title="HomeWorld"
              value={character.homeworld.name}
            />
          )}

          <CharacterBioItem
            title="Height"
            value={`${character.height} cm`}
          />

          <CharacterBioItem
            title="Mass"
            value={`${character.mass} kg`}
          />
        </Grid>
      </Card>

      {character.filmConnection && character.filmConnection.films && (
        <>
          <Typography variant="h5" style={{ padding: "30px 0 15px" }}>
            Films
          </Typography>
          {character.filmConnection.films.map(film => (
            <Chip label={film?.title} color="secondary" style={{ marginRight: "10px" }} />
          ))}
        </>
      )}
    </>
  )
}

const ShowCharacterPage: BlitzPage = () => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Character />
    </Suspense>
  )
}

ShowCharacterPage.authenticate = true
ShowCharacterPage.getLayout = (page) => <Layout>{page}</Layout>

export default ShowCharacterPage
