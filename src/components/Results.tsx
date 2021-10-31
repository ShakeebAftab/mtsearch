import { Box, Grid } from "@material-ui/core";
import axios from "axios";
import { useCallback, useContext, useEffect, useRef, useState } from "react";
import { SearchContextProvider } from "../context/SearchContext";
import { filter } from "../helpers/filter";
import { Movie } from "./Movie";
import { MovieDetail } from "./MovieDetail";
import { MovieType } from "./types";

export const Results = () => {
  const [search] = useContext(SearchContextProvider);
  const [fetch, setFetch] = useState(false);
  const [
    ,
    ,
    page,
    setPage,
    ,
    setOpenDetails,
    openMovieDetails,
    setOpenMovieDetails,
    movies,
    setMovies,
  ] = useContext(SearchContextProvider);

  const observer = useRef<any>(null);
  const lastPoster = useCallback(
    (node) => {
      if (fetch) return;
      if (observer.current?.isConnected) observer.current.disconnect();
      observer.current = new IntersectionObserver((enteries) => {
        if (enteries[0].isIntersecting) setPage((page: number) => page + 1);
      });
      if (node) observer.current.observe(node);
    },
    [fetch, setPage]
  );

  const handlePosterClick = (movie: MovieType) => {
    setOpenMovieDetails(movie);
    setOpenDetails(true);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await axios.get(
          search === ""
            ? `https://api.themoviedb.org/3/trending/all/week?api_key=${process.env.REACT_APP_TMDB_API}&language=en-US&page=${page}`
            : `https://api.themoviedb.org/3/search/movie?api_key=${process.env.REACT_APP_TMDB_API}&language=en-US&query=${search}&page=${page}&include_adult=false`
        );
        setMovies((movies: MovieType[]) =>
          movies !== null
            ? filter(movies, data.data.results)
            : data.data.results
        );
      } catch (error: any) {
        console.log(error?.message);
      }
      setFetch(false);
    };

    setFetch(true);
    fetchData();
  }, [search, page, setMovies]);

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
                ref={lastPoster}
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
