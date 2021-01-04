import React from "react";
import { Typography } from "@material-ui/core";
import { grey } from "@material-ui/core/colors";
import { makeStyles } from "@material-ui/core/styles";

import ActivityCircle from "../elements/ActivityCircle";
import { ApiData } from "types/api";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    flexDirection: "column",
    flexShrink: 0,
    marginRight: 40,
  },
  activity: {
    display: "flex",
    flexWrap: "wrap",
    flexShrink: 0,
    alignItems: "center",
    "&:not(:first-child)": {
      marginTop: theme.spacing(2),
    },
    "& > *:not(:first-child)": {
      marginLeft: theme.spacing(1),
    },
  },
  activityItems: {
    display: "flex",
  },
  current: {
    color: theme.palette.primary.main,
  },
  previous: {
    color: grey[600],
  },
  titleLine: {
    marginBottom: theme.spacing(3),
  },
}));

const Activity: React.FC<ApiData["activityCounter"]> = ({
  currentMonth,
  currentWeek,
  previousMonth,
  previousWeek,
}) => {
  const classes = useStyles();

  return (
    <div>
      <Typography variant="h5" className={classes.titleLine}>
        Statistiques des activités réalisées
      </Typography>
      <div className={classes.activityItems}>
        <div className={classes.root}>
          <div className={classes.activity}>
            <ActivityCircle value={currentWeek} />
            <Typography className={classes.current}>cette semaine</Typography>
          </div>
          <div className={classes.activity}>
            <ActivityCircle previous value={previousWeek} />
            <Typography className={classes.previous}>
              semaine précédente
            </Typography>
          </div>
        </div>
        <div className={classes.root}>
          <div className={classes.activity}>
            <ActivityCircle value={currentMonth} />
            <Typography className={classes.current}>ce mois</Typography>
          </div>
          <div className={classes.activity}>
            <ActivityCircle previous value={previousMonth} />
            <Typography className={classes.previous}>mois précédent</Typography>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Activity;
