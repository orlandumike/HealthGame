import React from "react";
import { Grid } from "@material-ui/core";

import Activity from "components/widgets/Activity";
import ActivityChart from "components/widgets/ActivityChart";
import HealthInfos from "components/widgets/HealthInfos";
import RecentActivity from "components/widgets/RecentActivity";
import { ApiData } from "types/api";

interface Props {
  data: ApiData;
}

const HomePage: React.FC<Props> = ({ data }) => (
  <Grid
    container
    justify="flex-start"
    alignItems="flex-start"
    spacing={5}
  >
    <Grid item xs={12} lg={6}>
      <HealthInfos levelInfos={data.levelInfos} user={data.user} />
      <RecentActivity items={data.recentActivity} />
    </Grid>
    <Grid item xs={12} lg={6}>
      <Activity {...data.activityCounter} />
      <ActivityChart data={data.activityChart} />
    </Grid>
  </Grid>
);

export default HomePage;
