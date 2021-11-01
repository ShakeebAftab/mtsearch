import { Grid, makeStyles, Modal, Typography } from "@material-ui/core";
import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { SearchContextProvider } from "../context/SearchContext";
import { Ranking } from "./Ranking";
import { Suggestion } from "./Suggestion";
import { MovieType } from "./types";

const useStyles = makeStyles((theme) => ({
  img: {
    objectFit: "cover",
    width: "100%",
    height: "300px",
  },
  paper: {
    position: "absolute",
    width: "80vw",
    maxHeight: "70vh",
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
    paddingTop: "0px",
    paddingBottom: "10px",
  },
  gridItemRanking: {
    padding: "20px",
    paddingTop: "10px",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "whitesmoke",
    paddingBottom: "20px",
    marginBottom: "10px",
  },
  releaseDateTxt: {
    color: "gray",
    marginLeft: "3px",
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
  const [imdbId, setImdbId] = useState<string | null>("");
  const [modalStyle] = useState(getModalStyle);
  const [, , , , openDetails, setOpenDetails] = useContext(
    SearchContextProvider
  );

  useEffect(() => {
    const getImdbId = async () => {
      try {
        const data = await axios.get(
          `https://api.themoviedb.org/3/movie/${movie.id}/external_ids?api_key=${process.env.REACT_APP_TMDB_API}`
        );
        setImdbId(data.data.imdb_id);
      } catch (error) {
        console.log(error);
        setImdbId(null);
      }
    };
    getImdbId();

    const getImdbData = async () => {
      if (process.env.REACT_APP_IMDB_API && imdbId) {
        try {
          const data = await axios.get(
            "https://imdb8.p.rapidapi.com/title/get-top-cast",
            {
              params: { tconst: imdbId },
              headers: {
                "x-rapidapi-host": "imdb8.p.rapidapi.com",
                "x-rapidapi-key": process.env.REACT_APP_IMDB_API,
              },
            }
          );
          const names: string[] = [];
          for (let i = 0; i < 5; i++)
            names.push(data.data[i].substring(6, data.data[i].length - 1));

          const getChars = async () => {
            const chars: any[] = [];
            names.forEach(async (name: string) => {
              if (process.env.REACT_APP_IMDB_API) {
                try {
                  const data = await axios.get(
                    `https://imdb8.p.rapidapi.com/title/get-charname-list`,
                    {
                      params: {
                        id: name,
                        tconst: imdbId,
                      },
                      headers: {
                        "x-rapidapi-host": "imdb8.p.rapidapi.com",
                        "x-rapidapi-key": process.env.REACT_APP_IMDB_API,
                      },
                    }
                  );
                  chars.push(data.data);
                } catch (error) {
                  console.log(error);
                }
                console.log(chars);
              }
            });
          };
          getChars();
        } catch (error: any) {
          console.log(error.message);
        }
      }
    };
    getImdbData();
  }, [movie, imdbId]);

  return (
    <Modal
      open={openDetails}
      onClose={() => setOpenDetails(false)}
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
            <Typography variant="h4">
              {movie.title ||
                movie.original_name ||
                movie.original_title ||
                movie.name}
            </Typography>
            <Typography variant="body2" className={classes.releaseDateTxt}>
              {movie.release_date}
            </Typography>
          </Grid>
          <Grid item xs={12} className={classes.gridItemDesc}>
            <Typography variant="body1">{movie.overview}</Typography>
          </Grid>
        </Grid>
        <Grid
          container
          item
          xs={12}
          spacing={0}
          className={classes.gridItemRanking}
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
        <Suggestion id={movie.genre_ids[0]} currMovieID={movie.id} />
      </div>
    </Modal>
  );
};
