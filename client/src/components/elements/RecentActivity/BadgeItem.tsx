import clsx from "clsx";
import React from "react";
import { Card, CardContent, CardMedia, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

import { Badge } from "types/api";
import { formatDate } from "utils";

interface Props extends Badge {
  className: string;
}

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
  },
  content: {
    flex: "1 1 auto",
  },
  cover: {
    width: 80,
    height: 80,
  },
  coverWrapper: {
    padding: "5px 5px 5px 0",
    display: "flex",
    alignItems: "center",
  },
}));

const BageItem: React.FC<Props> = ({
  className,
  date,
  description,
  iconUrl,
}) => {
  const classes = useStyles();

  return (
    <Card className={clsx(className, classes.root)}>
      <CardContent className={classes.content}>
        <Typography gutterBottom>{description}</Typography>
        <Typography variant="body2" color="textSecondary" component="p">
          {formatDate(date)}
        </Typography>
      </CardContent>
      <div className={classes.coverWrapper}>
        <CardMedia
          className={classes.cover}
          image={iconUrl}
          title="badge-image"
        />
      </div>
    </Card>
  );
};

export default BageItem;
