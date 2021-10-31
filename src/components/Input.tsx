import {
  alpha,
  makeStyles,
  Theme,
  createStyles,
} from "@material-ui/core/styles";
import InputBase from "@material-ui/core/InputBase";
import { Button, Grid, Paper } from "@material-ui/core";
import { CreateRounded } from "@material-ui/icons";
import { useContext } from "react";
import { SearchContextProvider } from "../context/SearchContext";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    search: {
      position: "relative",
      borderRadius: "60px",
      backgroundColor: alpha(theme.palette.common.black, 0.07), // "#eef3f8",
      marginLeft: 0,
      minWidth: "100%",
      border: "1px solid lightgray",
    },
    searchIcon: {
      padding: theme.spacing(0, 1.25),
      height: "100%",
      position: "absolute",
      pointerEvents: "none",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      color: "#0d0d0d",
    },
    inputRoot: {
      color: "inherit",
    },
    inputInput: {
      padding: theme.spacing(1, 0, 1, 0),
      paddingLeft: `calc(1em + ${theme.spacing(3)}px)`,
      transition: theme.transitions.create("width"),
      width: "100%",
      [theme.breakpoints.up("md")]: {
        width: "85%",
      },
    },
    paper: {
      display: "flex",
      justifyContent: "center",
      paddingTop: "20px",
      paddingBottom: "20px",
      // paddingRight: "5px",
    },
    inputDiv: {
      width: "95%",
    },
    gridItem: {
      display: "flex",
      justifyContent: "center",
    },
    writeIcon: {
      color: "gray",
    },
    button: {
      display: "none",
    },
  })
);

export const Input = () => {
  const classes = useStyles();

  const [search, setSearch, , setPage] = useContext(SearchContextProvider);

  const handleChange = async (
    e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
  ) => {
    setSearch(e.target.value);
    setPage(1);
  };

  return (
    <form>
      <Paper className={classes.paper} elevation={0}>
        <Grid container alignItems="center">
          <Grid item xs={12} className={classes.gridItem}>
            <div className={classes.inputDiv}>
              <div className={classes.search}>
                <div className={classes.searchIcon}>
                  <CreateRounded className={classes.writeIcon} />
                </div>
                <InputBase
                  placeholder="What would you like to search"
                  classes={{
                    root: classes.inputRoot,
                    input: classes.inputInput,
                  }}
                  value={search}
                  fullWidth
                  onChange={(e) => handleChange(e)}
                />
              </div>
            </div>
          </Grid>
          <Button
            variant="contained"
            color="primary"
            className={classes.button}
            disableElevation
            type="submit"
            onClick={(e) => e.preventDefault()}
          >
            search
          </Button>
        </Grid>
      </Paper>
    </form>
  );
};
