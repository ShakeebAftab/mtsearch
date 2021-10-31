import { CircularProgress } from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";

const useStyles = makeStyles(() => ({
  img: {
    objectFit: "contain",
    marginRight: "20px",
    transition: "700ms",
    maxHeight: "200px",
    maxWidth: "130px",
    marginTop: "10px",
    "&:hover": {
      transform: "scale(1.08)",
    },
  },
}));

interface Props {
  id: number;
  posterPath?: string | null;
}

export const Movie = ({ id, posterPath }: Props) => {
  const classes = useStyles();

  if (!posterPath)
    return <CircularProgress color="primary" className={classes.img} />;

  return (
    <img
      src={`https://image.tmdb.org/t/p/original${posterPath}`}
      alt={`${id}`}
      className={classes.img}
    />
  );
};
