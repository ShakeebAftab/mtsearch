import {
  alpha,
  makeStyles,
  Theme,
  createStyles,
} from "@material-ui/core/styles";
import InputBase from "@material-ui/core/InputBase";
import { Button, Grid, Paper } from "@material-ui/core";
import { CreateRounded, DirectionsRun } from "@material-ui/icons";
import { useContext } from "react";
import { SearchContextProvider } from "../context/SearchContext";
import { Genre } from "./Genre";

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
    gridItemGenre: {
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
    },
  })
);

export const Input = () => {
  const classes = useStyles();
  const [search, setSearch, , setPage, , , , , , setMovies, genre, setGenre] =
    useContext(SearchContextProvider);

  const handleChange = async (
    e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
  ) => {
    setSearch(e.target.value);
    setPage(1);
    setMovies(null);
  };

  return (
    <form>
      <Paper className={classes.paper} elevation={0}>
        <Grid container alignItems="center" spacing={2}>
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
          <Grid
            item
            xs={12}
            container
            spacing={0}
            className={classes.gridItemGenre}
          >
            <Grid item md={2} onClick={() => setGenre("ALL")}>
              <Genre
                name="All"
                height={20}
                Icon={DirectionsRun}
                selected={genre === "ALL"}
              />
            </Grid>
            <Grid item md={2} onClick={() => setGenre("ACTION")}>
              <Genre
                name="Action"
                height={20}
                Icon={DirectionsRun}
                selected={genre === "ACTION"}
              />
            </Grid>
            <Grid item md={2} onClick={() => setGenre("COMEDY")}>
              <Genre
                name="Comedy"
                height={20}
                Icon={DirectionsRun}
                selected={genre === "COMEDY"}
              />
            </Grid>
            <Grid item md={2} onClick={() => setGenre("ROMANCE")}>
              <Genre
                name="Romance"
                height={20}
                Icon={DirectionsRun}
                selected={genre === "ROMANCE"}
              />
            </Grid>
            <Grid item md={2} onClick={() => setGenre("HORROR")}>
              <Genre
                name="Horror"
                height={20}
                Icon={DirectionsRun}
                selected={genre === "HORROR"}
              />
            </Grid>
          </Grid>
        </Grid>
      </Paper>
    </form>
  );
};
