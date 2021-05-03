import { Suspense } from "react"
import { BlitzPage, Routes } from "blitz"
import { Box, Grid, Typography, Select, MenuItem } from "@material-ui/core"
import Layout from "app/core/layouts/Layout"
import { CharactersList } from "app/characters/components/CharactersList"

const Home: BlitzPage = () => {
  const { q: searchQuery } = useRouterQuery()
  return (
    <Box>
      <Grid container>
        <Grid item md={6} xs={12}>
          <Typography variant="h4" style={{ padding: "30px 0" }}>
            Characters
          </Typography>
        </Grid>
        <Grid item md={6} xs={12} style={{ textAlign: "right", alignSelf: "center" }}>
          <span style={{ paddingRight: "10px" }}>Sort By:</span>
          <Select value="default">
            <MenuItem value="default" selected>Default</MenuItem>
            <MenuItem value="gender">Gender</MenuItem>
            <MenuItem value="height">Height</MenuItem>
          </Select>
        </Grid>
      </Grid>

      <Suspense fallback="Loading...">
        <CharactersList />
      </Suspense>
    </Box>
  )
}

Home.authenticate = { redirectTo: Routes.LoginPage().pathname }
Home.getLayout = (page) => <Layout title="Home">{page}</Layout>

export default Home
