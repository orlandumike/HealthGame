import React from "react";

import LevelIndicator from "components/elements/LevelIndicator";
import TodayActivity from "components/elements/TodayActivity";
import { ApiData } from "types/api";

type Props = {
  dayPoints: ApiData["user"]["dayPoints"];
  levelInfos: ApiData["levelInfos"];
};

const HealthIndicator: React.FC<Props> = ({ dayPoints, levelInfos }) => (
  <>
    <TodayActivity value={dayPoints} />
    <LevelIndicator {...levelInfos} />
  </>
);

export default HealthIndicator;
