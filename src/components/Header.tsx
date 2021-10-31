import React from "react";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      flexGrow: 1,
    },
    appbar: {
      display: "flex",
      alignItems: "center",
    },
    title: {
      fontWeight: 800,
      padding: "10px",
    },
  })
);

export const Header = () => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <AppBar position="static" className={classes.appbar} elevation={0}>
        <Toolbar variant="dense">
          <Typography variant="h6" color="inherit" className={classes.title}>
            M&T Search
          </Typography>
        </Toolbar>
      </AppBar>
    </div>
  );
};
