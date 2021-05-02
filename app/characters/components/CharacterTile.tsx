import { Card, Typography, Icon, IconButton } from "@material-ui/core"
import { Favorite } from "@material-ui/icons"
import { Link, Routes, useMutation } from "blitz"
import { Person } from "graphql/models"
import toggleFavorite from "app/characters/mutations/toggleFavorite"
import { useStyles } from "./styles"
import { FC, useState } from "react"

interface IProps {
  character: Person;
  inFavorites: boolean;
}

export const CharacterTile: FC<IProps> = ({ character, inFavorites }) => {
  const [toggleFavoriteMutation] = useMutation(toggleFavorite)
  const [inFavorite, setInFavorite] = useState(inFavorites)
  const classes = useStyles()

  return (
    <Card className={classes.tileWrapper}>
      <Typography variant="h5">
        {character.name}
      </Typography>
      <Typography variant="h6">
        {character.gender}
      </Typography>
      <Typography variant="h6">
        {character.homeworld?.name}
      </Typography>
      <Link href={Routes.ShowCharacterPage({ characterId: character.id })}>
        <a className={classes.tileLink} />
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