import React from "react";
import { Card, CardContent, Typography } from "@material-ui/core";

import { Activity } from "types/api";
import { formatDate } from "utils";

interface Props extends Activity {
  className: string;
}

const ActivityItem: React.FC<Props> = ({
  className,
  date,
  description,
  pointsWon,
}) => (
  <Card className={className}>
    <CardContent>
      <Typography variant="h6" gutterBottom>
        {description}
      </Typography>
      <Typography variant="body2" component="p" gutterBottom>
        {pointsWon} activity points {pointsWon > 1 ? "gagnés" : "gagné"}
      </Typography>
      <Typography variant="body2" color="textSecondary" component="p">
        {formatDate(date)}
      </Typography>
    </CardContent>
  </Card>
);

export default ActivityItem;
