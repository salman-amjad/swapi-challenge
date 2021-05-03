import { ChangeEvent, Suspense, useState } from "react"
import { BlitzPage, Routes, useRouterQuery } from "blitz"
import { Box, Grid, Typography, Select, MenuItem, IconButton } from "@material-ui/core"
import { FilterList } from "@material-ui/icons"
import Layout from "app/core/layouts/Layout"
import { CharactersList, FiltersDrawer, FiltersChangeType } from "app/characters/components"
import { SortableAttributes } from "app/core/utils"

const Home: BlitzPage = () => {
  const { q: searchQuery } = useRouterQuery()
  const [sortBy, setSortBy] = useState("default")
  const [isDrawerOpen, toggleDrawer] = useState(false)
  const [filters, setFilters] = useState<FiltersChangeType>({ films: [], planets: [], species: [] })

  const onChangeSortOrder = (event: ChangeEvent<HTMLSelectElement>) => {
    setSortBy(event.target.value)
  }

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
          <Select value={sortBy} onChange={onChangeSortOrder}>
            <MenuItem value="default">Default</MenuItem>
            <MenuItem value="gender">Gender</MenuItem>
            <MenuItem value="height">Height</MenuItem>
          </Select>

          <IconButton style={{ marginLeft: "10px" }} onClick={() => toggleDrawer(true)}>
            <FilterList />
          </IconButton>
        </Grid>
      </Grid>

      <FiltersDrawer
        isOpen={isDrawerOpen}
        onClose={() => toggleDrawer(false)}
        onChange={filters => setFilters(filters)}
      />

      <Suspense fallback="Loading...">
        <CharactersList
          searchQuery={searchQuery as string}
          sortOrder={sortBy as SortableAttributes}
          filters={filters}
        />
      </Suspense>
    </Box>
  )
}

Home.authenticate = { redirectTo: Routes.LoginPage().pathname }
Home.getLayout = (page) => <Layout title="Home">{page}</Layout>

export default Home
