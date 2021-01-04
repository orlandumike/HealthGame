import React from "react";
import { makeStyles } from "@material-ui/core/styles";

import { ApiData, Activity, Article, Badge } from "types/api";
import ActivityItem from "./ActivityItem";
import ArticleItem from "./ArticleItem";
import BageItem from "./BadgeItem";

interface Props {
  items: ApiData["recentActivity"];
}

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    flexDirection: "column",
  },
  item: {
    "&:not(:first-child)": {
      marginTop: theme.spacing(2),
    },
  },
}));

const List: React.FC<Props> = ({ items }) => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      {items.map((item) => {
        switch (item.type) {
          case "activity":
            return (
              <ActivityItem
                key={item.description}
                className={classes.item}
                {...(item as Activity)}
              />
            );
          case "communication":
            return (
              <ArticleItem
                key={item.description}
                className={classes.item}
                {...(item as Article)}
              />
            );
          case "badge":
            return (
              <BageItem
                key={item.description}
                className={classes.item}
                {...(item as Badge)}
              />
            );
          default:
            return null;
        }
      })}
    </div>
  );
};

export default List;
