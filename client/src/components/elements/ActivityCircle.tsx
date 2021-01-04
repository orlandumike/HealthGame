import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { grey } from "@material-ui/core/colors";

type Props = {
  previous?: boolean;
  value: number;
};

const useStyles = makeStyles((theme) => ({
  root: (props: Pick<Props, "previous">) => ({
    border: `4px solid ${
      props.previous ? grey[500] : theme.palette.primary.main
    }`,
    borderRadius: "90%",
    width: 40,
    height: 40,
    display: "inline-flex",
    flexShrink: 0,
    alignItems: "center",
    justifyContent: "center",
    fontSize: "22px",
    color: props.previous ? grey[500] : theme.palette.primary.main,
  }),
}));

const ActivityCircle: React.FC<Props> = ({ previous = false, value }) => {
  const classes = useStyles({ previous });

  return <div className={classes.root}>{value}</div>;
};

export default ActivityCircle;
