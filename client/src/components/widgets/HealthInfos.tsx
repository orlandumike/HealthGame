import React from "react";
import { makeStyles } from "@material-ui/core/styles";

import HealthIndicator from "components/widgets/HealthIndicator";
import UserInfo from "components/widgets/UserInfo";
import { ApiData } from "types/api";

const useStyles = makeStyles({
  root: {
    display: "flex",
    alignItems: "flex-end",
    "& > *:not(:last-child)": {
      marginRight: 40,
    },
  },
  healthIndicator: {
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-end",
  },
});

interface Props {
  levelInfos: ApiData["levelInfos"];
  user: ApiData["user"];
}

const HealthInfos: React.FC<Props> = ({ levelInfos, user }) => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <div className={classes.healthIndicator}>
        <HealthIndicator dayPoints={user.dayPoints} levelInfos={levelInfos} />
      </div>
      <div>
        <UserInfo {...user} />
      </div>
    </div>
  );
};

export default HealthInfos;
