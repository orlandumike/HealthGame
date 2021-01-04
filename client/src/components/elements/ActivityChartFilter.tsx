import React, { useState } from "react";
import { Switch, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

import { FilterType } from "components/widgets/ActivityChart";

const useStyles = makeStyles({
  root: {
    display: "flex",
    alignItems: "center",
    "& > *:not(:last-child)": {
      marginRight: 10,
    },
  },
});

interface Props {
  onSelectFilter: (value: FilterType) => void;
}

const ActivityChartFilter: React.FC<Props> = ({ onSelectFilter }) => {
  const classes = useStyles();
  const [checked, setChecked] = useState(false);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setChecked(event.target.checked);
    onSelectFilter(event.target.checked ? "byWeek" : "byDay");
  };

  return (
    <div className={classes.root}>
      <Typography>7 derniers jours</Typography>
      <Switch
        checked={checked}
        color="default"
        inputProps={{ "aria-label": "checkbox with default color" }}
        onChange={handleChange}
      />
      <Typography>8 dernières semaines</Typography>
    </div>
  );
};

export default ActivityChartFilter;
