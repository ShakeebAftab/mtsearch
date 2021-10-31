import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { makeStyles } from "@material-ui/styles";
import { Box, Typography } from "@material-ui/core";
import { MovieType } from "./types";
import { Movie } from "./Movie";
import { SearchContextProvider } from "../context/SearchContext";

const useStyles = makeStyles(() => ({
  title: {
    paddingLeft: "20px",
  },

  posters: {
    display: "flex",
    padding: "20px",
    overflowY: "hidden",
    overflowX: "scroll",
    "&::-webkit-scrollbar": {
      display: "none",
    },
  },
}));

interface Props {
  id: number;
  currMovieID: number;
}

export const Suggestion = ({ id, currMovieID }: Props) => {
  const classes = useStyles();
  const [movies, setMovies] = useState<MovieType[] | null>(null);
  const [, , , , , , , setOpenMovieDetails] = useContext(SearchContextProvider);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await axios.get(
          `https://api.themoviedb.org/3/discover/movie?api_key=${process.env.REACT_APP_TMDB_API}&with_genres=${id}`
        );
        setMovies(data.data.results);
      } catch (err) {
        console.log(err);
      }
    };
    fetchData();
  }, [id]);

  return (
    <Box>
      <Typography
        variant="h6"
        component="h2"
        color="textPrimary"
        className={classes.title}
      >
        Similar Movies
      </Typography>
      <Box className={classes.posters}>
        {movies?.map(
          (movie: MovieType, idx: number) =>
            currMovieID !== movie.id && (
              <div onClick={() => setOpenMovieDetails(movie)}>
                <Movie
                  id={movie.id}
                  posterPath={movie.poster_path}
                  key={`${movie.id}:${idx}`}
                />
              </div>
            )
        )}
      </Box>
    </Box>
  );
};
