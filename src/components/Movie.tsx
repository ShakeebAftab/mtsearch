import { makeStyles } from "@material-ui/styles";
import LazyLoad from "react-lazyload";

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
  lazy?: boolean;
}

export const Movie = ({ id, posterPath, lazy }: Props) => {
  const classes = useStyles();

  if (lazy)
    return (
      <LazyLoad height={200} offset={300} once>
        <img
          src={`https://image.tmdb.org/t/p/original${posterPath}`}
          alt={`${id}`}
          className={classes.img}
        />
      </LazyLoad>
    );

  return (
    <img
      src={`https://image.tmdb.org/t/p/original${posterPath}`}
      alt={`${id}`}
      className={classes.img}
    />
  );
};
