import { makeStyles } from "@material-ui/styles";
import { Box, Typography } from "@material-ui/core";
import { Service } from "./Service";
import { useContext } from "react";
import { ThemeContextProvider } from "../theme/theme";

const useStyles = makeStyles(() => ({
  title: {
    paddingLeft: "20px",
    paddingTop: "10px",
  },

  posters: {
    display: "flex",
    padding: "20px",
    paddingTop: "5px",
    overflowY: "hidden",
    overflowX: "scroll",
    "&::-webkit-scrollbar": {
      display: "none",
    },
  },
}));

interface Props {
  watchList: any[];
}

export const WatchRow = ({ watchList }: Props) => {
  const classes = useStyles();
  const [isDark] = useContext(ThemeContextProvider);

  return (
    <Box mb="8px">
      <Typography
        variant="h6"
        component="h2"
        color="textPrimary"
        className={classes.title}
        style={{ background: isDark ? "#242424" : "whitesmoke" }}
      >
        Stream Now
      </Typography>
      <Box
        className={classes.posters}
        style={{ background: isDark ? "#242424" : "whitesmoke" }}
      >
        {watchList.map((item: any, idx: number) => (
          <div key={`${idx}`}>
            <Service
              img={`https://image.tmdb.org/t/p/original/${item.logo_path}`}
              name={item.provider_name}
            />
          </div>
        ))}
      </Box>
    </Box>
  );
};
