import { Card, Typography, IconButton } from "@material-ui/core"
import { Favorite } from "@material-ui/icons"
import { Link, Routes, useMutation } from "blitz"
import { Person } from "graphql/models"
import toggleFavorite from "app/characters/mutations/toggleFavorite"
import { useStyles } from "./styles"
import { FC, useState } from "react"

interface ComponentProps {
  character: Person;
  inFavorites: boolean;
}

export const CharacterTile: FC<ComponentProps> = ({ character, inFavorites }) => {
  const classes = useStyles()
  const [toggleFavoriteMutation] = useMutation(toggleFavorite)
  const [inFavorite, setInFavorite] = useState(inFavorites)

  return (
    <Card className={classes.tileWrapper}>
      <Typography variant="h5">
        {character.name}
      </Typography>
      <Typography variant="body1">
        Gender: <b>{character.gender}</b>
      </Typography>
      <Typography variant="body1">
        Height: <b>{character.height} cm</b>
      </Typography>
      {!!character.homeworld && !!character.homeworld.name && (
        <Typography variant="body1">
          HomeWorld: <b>{character.homeworld.name}</b>
        </Typography>
      )}
      <Link href={Routes.ShowCharacterPage({ characterId: character.id })}>
        <a className={classes.tileLink}>
          View Details
        </a>
      </Link>
      <IconButton className={`${classes.favoriteIcon} ${inFavorite ? "active" : ""}`} onClick={async () => {
        const inFaves = await toggleFavoriteMutation({ characterId: atob(character.id) })
        setInFavorite(inFaves)
      }}>
        <Favorite />
      </IconButton>
    </Card>
  )
}