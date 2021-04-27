import { ReactNode } from "react"
import { Head } from "./components/Head"
import { Card, Grid, makeStyles } from "@material-ui/core"
import { useStyles } from "./components/styles"

type LayoutProps = {
  title?: string
  children: ReactNode
}

export const AuthLayout = ({ title, children }: LayoutProps) => {
  const classes = useStyles()

  return (
    <>
      <Head title={title || "providers-choice-challenge"} />

      <Grid
        container
        justify="center"
        alignContent="center"
        className={classes.authWrapper}
      >
        <Grid
          item
          md={4}
          xs={12}
        >
          <Card className={classes.authBox}>
            {children}
          </Card>
        </Grid>
      </Grid>
    </>
  )
}

export default AuthLayout
