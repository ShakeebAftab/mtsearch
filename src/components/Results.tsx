import { Box, CircularProgress, Container, Grid } from "@material-ui/core";
import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { SearchContextProvider } from "../context/SearchContext";
import { Movie } from "./Movie";
import { MovieDetail } from "./MovieDetail";
import { MovieType } from "./types";

export const Results = () => {
  const [search] = useContext(SearchContextProvider);
  const [fetch, setFetch] = useState(false);
  const [movies, setMovies] = useState<MovieType[] | null>();
  const [, , , , , setOpenDetails, openMovieDetails, setOpenMovieDetails] =
    useContext(SearchContextProvider);

  const handlePosterClick = (movie: MovieType) => {
    setOpenMovieDetails(movie);
    setOpenDetails(true);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await axios.get(
          search === ""
            ? `https://api.themoviedb.org/3/trending/all/week?api_key=${process.env.REACT_APP_TMDB_API}&language=en-US`
            : `https://api.themoviedb.org/3/search/movie?api_key=${
                process.env.REACT_APP_TMDB_API
              }&language=en-US&query=${search}&page=${1}&include_adult=false`
        );
        setMovies(data.data.results);
      } catch (error: any) {
        console.log(error?.message);
      }
      setFetch(false);
    };

    setFetch(true);
    fetchData();
  }, [search]);

  if (fetch)
    return (
      <Container maxWidth="xs">
        <CircularProgress color="primary" />
      </Container>
    );

  return (
    <Box
      overflow="hidden"
      display="flex"
      justifyContent="center"
      alignItems="center"
    >
      <Grid container style={{ display: "flex", justifyContent: "center" }}>
        {movies?.map(
          (movie: MovieType, idx: number) =>
            movie.poster_path &&
            (movies.length - 1 === idx ? (
              <Grid
                item
                key={`${movie.id}:${idx}`}
                onClick={() => handlePosterClick(movie)}
              >
                <Movie id={movie.id} posterPath={movie.poster_path} />
              </Grid>
            ) : (
              <Grid
                item
                key={`${movie.id}:${idx}`}
                onClick={() => handlePosterClick(movie)}
              >
                <Movie id={movie.id} posterPath={movie.poster_path} />
              </Grid>
            ))
        )}
      </Grid>
      {openMovieDetails && <MovieDetail movie={openMovieDetails} />}
    </Box>
  );
};
