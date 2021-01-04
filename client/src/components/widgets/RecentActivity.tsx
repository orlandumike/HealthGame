import React, { useState } from "react";
import { Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

import Filter from "components/elements/RecentActivity/Filter";
import RecentActivityList from "components/elements/RecentActivity/List";
import { ActivityType, ApiData } from "types/api";

const useStyles = makeStyles((theme) => ({
  titleLine: {
    marginBottom: theme.spacing(2),
    display: "flex",
    alignItems: "center",
  },
}));

export type FilterType = ActivityType | null;

interface Props {
  items: ApiData["recentActivity"];
}

const RecentActivity: React.FC<Props> = ({ items: allItems }) => {
  const classes = useStyles();

  const [filter, setFilter] = useState<FilterType>(null);

  const handleSelectFilter = (value: FilterType) => {
    setFilter(value);
  };

  const items =
    filter === null
      ? allItems
      : allItems.filter((item) => item.type === filter);

  return (
    <div style={{ marginTop: 50, maxWidth: 600 }}>
      <div className={classes.titleLine}>
        <Typography variant="h5">Fil d'actualité</Typography>
        <Filter onSelectFilter={handleSelectFilter} />
      </div>
      <RecentActivityList items={items} />
    </div>
  );
};

export default RecentActivity;
