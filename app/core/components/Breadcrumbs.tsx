import { FC } from "react"
import { Link as BlitzLink, Routes } from "blitz"
import { Typography, Breadcrumbs as MaterialBreadcrumbs, Link } from "@material-ui/core"

interface IProps {
  currentPage?: string;
}

export const Breadcrumbs: FC<IProps> = ({ currentPage }) => (
  <MaterialBreadcrumbs aria-label="breadcrumb" style={{ padding: "10px 0" }}>
    <BlitzLink href={Routes.Home()}>
      <Link color="inherit" style={{ cursor: "pointer" }}>
        Home
      </Link>
    </BlitzLink>
    {!!currentPage && (
      <Typography color="textPrimary">
        {currentPage}
      </Typography>
    )}
  </MaterialBreadcrumbs>
)