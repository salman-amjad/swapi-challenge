import { FC } from "react"
import { Head as BlitzHead } from "blitz"
import { CssBaseline } from "@material-ui/core"

interface IProps {
  title: string;
}

export const Head: FC<IProps> = ({ title }) => (
  <>
    <BlitzHead>
      <title>{title || "providers-choice-challenge"}</title>
      <link rel="icon" href="/favicon.ico" />
      <link rel="stylesheet" href="https://fonts.googleapis.com/icon?family=Material+Icons" />
      <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap" />
    </BlitzHead>
    <CssBaseline />
  </>
)

export default Head