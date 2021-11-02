import {
  Box,
  CircularProgress,
  Container,
  Grid,
  makeStyles,
  Modal,
  Typography,
} from "@material-ui/core";
import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { SearchContextProvider } from "../context/SearchContext";
import { genres } from "../helpers/genres";
import { ThemeContextProvider } from "../theme/theme";
import { CastPoster } from "./CastPoster";
import { Ranking } from "./Ranking";
import { Suggestion } from "./Suggestion";
import { MovieType } from "./types";
import { WatchRow } from "./WatchRow";

const useStyles = makeStyles((theme) => ({
  img: {
    objectFit: "cover",
    width: "100%",
    height: "300px",
  },
  paper: {
    position: "absolute",
    width: "80vw",
    maxHeight: "80vh",
    overflow: "auto",
    backgroundColor: theme.palette.background.paper,
    boxShadow: theme.shadows[5],
    outline: "none",
  },
  gridItemTitle: {
    padding: "20px",
    paddingBottom: "5px",
    paddingTop: "10px",
  },
  gridItemDesc: {
    padding: "20px",
    paddingTop: "0",
    paddingBottom: "10px",
    marginBottom: "10px",
    marginTop: "10px",
  },
  gridItemRanking: {
    padding: "20px",
    paddingTop: "10px",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    paddingBottom: "20px",
    marginBottom: "10px",
  },
  releaseDateTxt: {
    marginLeft: "3px",
  },
  center: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
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
  genre: {
    paddingTop: "0",
    marginLeft: "2px",
    fontSize: "14px",
  },
}));

const getModalStyle = () => {
  return {
    top: `50%`,
    left: `50%`,
    transform: `translate(-50%, -50%)`,
  };
};

interface Props {
  movie: MovieType;
}

export const MovieDetail = ({ movie }: Props) => {
  const classes = useStyles();
  const [error, setError] = useState(false);
  const [whereToWatch, setWhereToWatch] = useState<any[]>([]);
  const [genList, setGenList] = useState("");
  const [modalStyle] = useState(getModalStyle);
  const [, , , , openDetails, setOpenDetails] = useContext(
    SearchContextProvider
  );
  const [cast, setCast] = useState<any[]>([]);
  const [isDark] = useContext(ThemeContextProvider);

  const onClickReset = () => {
    setCast([]);
  };

  useEffect(() => {
    const getAvailability = async () => {
      try {
        const data = await axios.get(
          `https://api.themoviedb.org/3/movie/${movie.id}/watch/providers?api_key=${process.env.REACT_APP_TMDB_API}`
        );
        if (data.data.results["US"].flatrate) {
          setWhereToWatch(data.data.results["US"].flatrate);
        } else if (data.data.results["US"].rent) {
          setWhereToWatch(data.data.results["US"].rent);
        }
      } catch (error: any) {
        console.log(error.message);
      }
    };
    getAvailability();

    const getCast = async () => {
      const movieCast = [];
      try {
        const data = await axios.get(
          `https://api.themoviedb.org/3/movie/${movie.id}/credits?api_key=${process.env.REACT_APP_TMDB_API}`
        );
        for (let i = 0; i < 5; i++) movieCast.push(data.data.cast[i]);
        setCast(movieCast);
      } catch (error: any) {
        setError(true);
        console.log(error.message);
      }
    };
    getCast();

    const getGenres = () => {
      let gen = "";
      movie.genre_ids.forEach((id: number) => {
        if (genres[id]) gen += `${genres[id]}, `;
      });
      setGenList(gen.substring(0, gen.length - 2));
    };
    getGenres();
  }, [movie]);

  const handleClose = () => {
    setOpenDetails(false);
    setCast([]);
    setError(false);
    setWhereToWatch([]);
  };

  return (
    <Modal
      open={openDetails}
      onClose={() => handleClose()}
      aria-labelledby="simple-modal-title"
      aria-describedby="simple-modal-description"
    >
      <div style={modalStyle} className={classes.paper}>
        <Grid container>
          <Grid item xs={12}>
            <img
              src={`https://image.tmdb.org/t/p/original/${movie.backdrop_path}`}
              alt="backdrop"
              className={classes.img}
            />
          </Grid>
          <Grid item xs={12} className={classes.gridItemTitle}>
            <Typography variant="h4" color="textPrimary">
              {movie.title ||
                movie.original_name ||
                movie.original_title ||
                movie.name}
            </Typography>
            {genList !== "" && (
              <Typography
                variant="body2"
                className={classes.genre}
                color="textSecondary"
              >
                {genList}
              </Typography>
            )}
            <Typography
              variant="body2"
              className={classes.releaseDateTxt}
              color="textSecondary"
            >
              {movie.release_date}
            </Typography>
          </Grid>
          <Grid item xs={12} className={classes.gridItemDesc}>
            <Typography variant="body1" color="textPrimary">
              {movie.overview}
            </Typography>
          </Grid>
        </Grid>
        <Grid
          container
          item
          xs={12}
          spacing={0}
          className={classes.gridItemRanking}
          style={{ backgroundColor: isDark ? "#4d4d4d" : "whitesmoke" }}
        >
          <Grid item xs={4} md={2}>
            <Ranking
              name="Rating"
              progress={movie.vote_average * 10}
              value={movie.vote_average}
            />
          </Grid>
          <Grid item xs={4} md={2}>
            <Ranking
              name="Votes"
              progress={
                movie.vote_count % 100 === 0 ? 100 : movie.vote_count % 100
              }
              value={movie.vote_count}
            />
          </Grid>
          <Grid item xs={4} md={2}>
            <Ranking
              name="Popularity"
              progress={
                movie.popularity % 100 === 0 ? 100 : movie.popularity % 100
              }
              value={Math.floor(movie.popularity)}
            />
          </Grid>
        </Grid>
        {error ? (
          <Box
            overflow="hidden"
            textOverflow="wrap"
            mt="15px"
            mb="15px"
            display="flex"
            justifyContent="center"
            alignItems="center"
          >
            <Typography variant="h6" color="error">
              Unable to load cast members
            </Typography>
          </Box>
        ) : cast.length > 0 ? (
          <Box
            overflow="hidden"
            mt="15px"
            mb="15px"
            display="flex"
            justifyContent="center"
            alignItems="center"
          >
            <Container maxWidth="sm" className={classes.center}>
              <Grid container spacing={2} className={classes.center}>
                {cast.map((member: any, idx: number) => (
                  <Grid
                    item
                    sm={6}
                    md={4}
                    key={`${idx}`}
                    className={classes.center}
                  >
                    <CastPoster
                      img={`https://image.tmdb.org/t/p/original/${member.profile_path}`}
                      name={member.original_name || member.name}
                      role={member.character}
                    />
                  </Grid>
                ))}
              </Grid>
            </Container>
          </Box>
        ) : (
          <Box
            overflow="hidden"
            mt="15px"
            mb="15px"
            display="flex"
            justifyContent="center"
            alignItems="center"
          >
            <CircularProgress />
          </Box>
        )}
        {whereToWatch.length > 0 && <WatchRow watchList={whereToWatch} />}
        <Suggestion
          id={movie.genre_ids[0]}
          currMovieID={movie.id}
          reset={onClickReset}
        />
      </div>
    </Modal>
  );
};
