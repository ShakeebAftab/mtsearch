import { Box, Grid, makeStyles, Typography } from "@material-ui/core";

const useStyles = makeStyles({
  box: {
    borderRadius: 25,
    background: "whitesmoke",
    textAlign: "center",
  },
  img: {
    objectFit: "cover",
    width: "100%",
    height: "90px",
  },
  charName: {
    color: "gray",
    fontSize: "10px",
    fontWeight: 600,
  },
  name: {
    marginTop: "4px",
    fontSize: "12px",
    fontWeight: 600,
  },
});

interface Props {
  img?: string;
  name?: string;
  role?: string;
}

export const CastPoster = ({ img, name, role }: Props) => {
  const classes = useStyles();
  return (
    <Box
      overflow="hidden"
      textOverflow="wrap"
      height="150px"
      width="120px"
      className={classes.box}
    >
      <Grid container spacing={0}>
        <Grid item xs={12}>
          <img src={img} alt="cast pic" className={classes.img} />
        </Grid>
        <Grid item xs={12}>
          <Typography variant="body1" className={classes.name}>
            {name}
          </Typography>
        </Grid>
        <Grid item xs={12}>
          <Typography variant="body2" className={classes.charName}>
            {role}
          </Typography>
        </Grid>
      </Grid>
    </Box>
  );
};
