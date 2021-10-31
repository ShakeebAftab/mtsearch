import { makeStyles, SvgIconTypeMap, Typography } from "@material-ui/core";
import { OverridableComponent } from "@material-ui/core/OverridableComponent";

interface Props {
  Icon: OverridableComponent<SvgIconTypeMap<{}, "svg">>;
  name: string;
  color?: string;
  height: number;
  selected: boolean;
}

const useStyles = makeStyles({
  itemDiv: {
    display: "flex",
    height: "100%",
    padding: "15px",
    paddingBottom: "10px",
    cursor: "pointer",
    color: "gray",
    borderRadius: "10px",
    "&:hover": {
      backgroundColor: "whitesmoke",
    },
    justifyContent: "center",
    marginLeft: "15px",
    marginRight: "15px",
  },
  name: {
    fontWeight: 600,
  },
});

export const Genre = ({ Icon, name, height, selected }: Props) => {
  const classes = useStyles();
  return (
    <div
      className={classes.itemDiv}
      style={{ backgroundColor: selected ? "whitesmoke" : "" }}
    >
      <Icon
        style={{
          height: `${height}px`,
          objectFit: "contain",
        }}
        color="primary"
      />
      <Typography variant="button" className={classes.name}>
        {name}
      </Typography>
    </div>
  );
};
