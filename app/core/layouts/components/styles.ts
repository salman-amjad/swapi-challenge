import { makeStyles } from "@material-ui/core"

export const useStyles = makeStyles({
  authWrapper: {
    height: "100vh"
  },
  authBox: {
    padding: "30px 20px"
  },
  appBar: {
    padding: "5px 10px"
  },
  search: {
    maxWidth: "500px"
  },
  grow: {
    flex: 1,
  },
  searchWrapper: {
    padding: "0 20px 0 10px",
    background: "rgba(255,255,255,0.3)",
    borderRadius: "5px",
    display: "flex",
    marginLeft: "30px",
    alignItems: "center",
    width: "50%",
    maxWidth: "500px",

    "& input": {
      padding: "10px 20px",
      color: "#FFF",

      "&::before": {
        display: "none"
      }
    }
  },
  searchIcon: {
    // padding: "10px 0"
  }
})