import { useMutation, useRouter } from "blitz"
import { AppBar, Toolbar, Typography, InputBase, Box, Button, Container } from "@material-ui/core"
import { Search as SearchIcon } from "@material-ui/icons"
import logout from "app/auth/mutations/logout"
import { useStyles } from "./styles"
import { ChangeEvent, FormEvent, useState } from "react"

export function Header() {
  const classes = useStyles()
  const router = useRouter()
  // Get logout mutation
  const [logoutMutation] = useMutation(logout)
  // initialize state for search text
  const [searchText, setSearchText] = useState("")

  const onLogout = async () => {
    await logoutMutation()
  }

  const onFormSubmit = (event: FormEvent) => {
    event.preventDefault()
    let redirectTo = "/"
    if (searchText) redirectTo = `/?q=${searchText}`
    router.push(redirectTo)
  }

  return (
    <AppBar className={classes.appBar}>
      <form onSubmit={onFormSubmit}>
        <Container fixed>
          <Toolbar disableGutters>
            <Typography variant="h5">
              SWAPI Challenge
          </Typography>
            <Box className={classes.searchWrapper}>
              <SearchIcon />
              <InputBase
                placeholder="Search"
                inputProps={{ 'aria-label': 'search' }}
                value={searchText}
                onChange={(event: ChangeEvent<HTMLInputElement>) => setSearchText(event.currentTarget.value)}
              />
            </Box>
            <Box className={classes.grow} />
            <Box>
              <Button color="inherit" onClick={onLogout}>Logout</Button>
            </Box>
          </Toolbar>
        </Container>
      </form>
    </AppBar>
  )
}