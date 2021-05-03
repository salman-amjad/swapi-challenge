import { ChangeEvent, FC } from "react"
import { Typography, FormGroup, FormControlLabel, Checkbox, Grid, GridSize } from "@material-ui/core"
import { Planet, Species, Film } from "graphql/models"

export interface SyntheticFilm extends Film {
  name: string;
}

interface ComponentProps {
  title: string;
  items: Planet[] | Species[] | SyntheticFilm[];
  md?: GridSize;
  xs?: GridSize;
  selectedFilters: string[];
  onChange: (event: ChangeEvent<HTMLInputElement>) => void;
}

export const FiltersList: FC<ComponentProps> = ({ title, items, selectedFilters, onChange, md = 4, xs = 12 }) => (
  <>
    <Typography variant="h6">
      {title}
    </Typography>
    <FormGroup style={{ paddingBottom: "20px" }}>
      <Grid container>
        {items.map((item: Planet | Species | SyntheticFilm) => (
          <Grid item md={md} xs={xs}>
            <FormControlLabel
              control={
                <Checkbox
                  name={item.id}
                  checked={selectedFilters.includes(item.id)}
                  onChange={onChange}
                />
              }
              label={item.name}
            />
          </Grid>
        ))}
      </Grid>
    </FormGroup>
  </>
)