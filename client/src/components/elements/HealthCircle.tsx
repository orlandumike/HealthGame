import clsx from "clsx";
import React from "react";
import { Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

import { ActivityColorType } from "types/colors";

type Props = {
  className: string;
  color: ActivityColorType;
  nextLevelTreshold: number;
  value: number;
};

const useStyles = makeStyles((theme) => ({
  root: {
    border: `4px solid ${theme.palette.primary.dark}`,
    borderRadius: "90%",
    color: theme.palette.primary.dark,
    width: 120,
    height: 120,
    display: "flex",
    flexDirection: "column",
    flexShrink: 0,
    alignItems: "center",
    justifyContent: "center",
  },
}));

const HealthCircle: React.FC<Props> = ({
  className,
  color,
  nextLevelTreshold,
  value,
}) => {
  const classes = useStyles({ color });

  return (
    <div className={clsx(className, classes.root)}>
      <Typography variant="h6">{value}</Typography>
      <Typography>/</Typography>
      <Typography variant="h6">{nextLevelTreshold}</Typography>
    </div>
  );
};

export default HealthCircle;
