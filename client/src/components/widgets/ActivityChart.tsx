import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";

import Filter from "components/elements/ActivityChartFilter";
import BarChart from "components/elements/BarChart";
import { ApiData } from "types/api";

const useStyles = makeStyles((theme) => ({
  toggle: {
    marginTop: theme.spacing(2),
    display: "flex",
    justifyContent: "center",
  },
}));

export type FilterType = "byDay" | "byWeek";

interface Props {
  data: ApiData["activityChart"];
}

const ActivityChart: React.FC<Props> = ({ data: allData }) => {
  const classes = useStyles();

  const [filter, setFilter] = useState<FilterType>("byDay");

  const handleSelectFilter = (value: FilterType) => {
    setFilter(value);
  };

  const data = allData[filter];

  return (
    <div style={{ marginTop: 50 }}>
      <BarChart data={data} />
      <div className={classes.toggle}>
        <Filter onSelectFilter={handleSelectFilter} />
      </div>
    </div>
  );
};

export default ActivityChart;
