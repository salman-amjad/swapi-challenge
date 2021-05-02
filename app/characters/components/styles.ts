import { makeStyles } from "@material-ui/core"

export const useStyles = makeStyles({
  tileWrapper: {
    padding: "20px",
    position: "relative",
  },
  tileLink: {
    position: "absolute",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    opacity: 0,
    background: "rgb(255,255,255)",
    transition: "all 0.5s ease-in-out",

    "&:hover": {
      opacity: 0.1,
    }
  },
  favoriteIcon: {
    position: "absolute",
    bottom: "15px",
    right: "10px",
    zIndex: 9,

    "&.active": {
      color: "red"
    }
  }
})