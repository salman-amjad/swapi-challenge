import { useMutation } from "blitz"
import { AppBar, Toolbar, Typography, InputBase, Box, Button } from "@material-ui/core"
import { Search as SearchIcon } from "@material-ui/icons"
import logout from "app/auth/mutations/logout"
import { useStyles } from "./styles"

export const Header = () => {
  const classes = useStyles()
  const [logoutMutation] = useMutation(logout)

  const onLogout = async () => {
    await logoutMutation()
  }

  return (
    <AppBar className={classes.appBar}>
      <Toolbar>
        <Typography variant="h5">
          Star Wars Challenge
        </Typography>
        <Box className={classes.searchWrapper}>
          <SearchIcon />
          <InputBase
            placeholder="Search"
            inputProps={{ 'aria-label': 'search' }}
          />
        </Box>
        <Box className={classes.grow} />
        <Box>
          <Button color="inherit" onClick={onLogout}>Logout</Button>
        </Box>
      </Toolbar>
    </AppBar>
  )
}