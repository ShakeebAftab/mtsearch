import { Box, Grid, Typography } from "@material-ui/core";
import { MovieType } from "./types";

interface Props {
  movie: MovieType;
}

export const MovieDetail = ({ movie }: Props) => {
  return (
    <Box overflow="hidden">
      <Grid container>
        <Grid item xs={12}>
          <Box height="30vh">
            <img
              src={`https://image.tmdb.org/t/p/original/${movie.backdrop_path}`}
              alt="backdrop"
              style={{ objectFit: "contain", height: "100%" }}
            />
          </Box>
        </Grid>
        <Grid item xs={12}>
          <Typography variant="h6">
            {movie.title ||
              movie.original_name ||
              movie.original_title ||
              movie.name}
          </Typography>
          <Typography variant="body2">{movie.release_date}</Typography>
        </Grid>
        <Grid xs={12}>
          <Typography variant="body1">{movie.overview}</Typography>
        </Grid>
      </Grid>
    </Box>
  );
};
