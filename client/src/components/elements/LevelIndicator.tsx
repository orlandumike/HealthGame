import React, { useEffect, useRef, useState } from "react";
import { Typography } from "@material-ui/core";
import { yellow, orange, grey, green, blue } from "@material-ui/core/colors";
import { makeStyles } from "@material-ui/core/styles";

import DiscountBadge from "components/elements/DiscountBadge";
import { ApiData } from "types/api";

const TOTAL_DURATION = 500;
const STEPS = 20;
const INTERVAL = TOTAL_DURATION / STEPS;

const BAR_HEIGHT = 30;
const TOTAL_WIDTH = 300;

const useStyles = makeStyles({
  levelAndBadge: {
    display: "flex",
    alignItems: "center",
    "& > :first-child": {
      marginRight: 10,
    },
  },
});

type ProgressProps = Pick<
  LevelIndicatorProps,
  "currentPoints" | "levelMinPoints" | "levelMaxPoints"
>;

const Progress: React.FC<ProgressProps> = ({
  currentPoints,
  levelMinPoints,
  levelMaxPoints,
}) => {
  const [progress, setProgress] = useState(0);
  const counter = useRef(0);

  const levelPoints = levelMaxPoints - levelMinPoints;
  const value = (currentPoints - levelMinPoints) / levelPoints;
  const valuePercentage = value * 100;

  // 100 % = levelPoints
  // Actuel = currentPoints - levelMinPoints

  const scoreColor =
    valuePercentage < 40
      ? yellow[600]
      : valuePercentage < 80
      ? orange[600]
      : green[500];

  useEffect(() => {
    const diff = value / STEPS;

    const timer = setInterval(() => {
      setProgress((oldProgress) => oldProgress + diff);
      counter.current += 1;
      if (counter.current >= STEPS) {
        clearInterval(timer);
        counter.current = 0;
      }
    }, INTERVAL);

    return () => {
      clearInterval(timer);
    };
  }, [value]);

  return (
    <div
      style={{
        position: "absolute",
        top: 0,
        bottom: 0,
        left: 0,
        right: TOTAL_WIDTH - progress * TOTAL_WIDTH,
        backgroundColor: scoreColor,
      }}
    ></div>
  );
};

type LevelIndicatorProps = ApiData["levelInfos"];

const LevelIndicator: React.FC<LevelIndicatorProps> = ({
  currentLevel,
  currentLevelGift,
  ...rest
}) => {
  const classes = useStyles();

  return (
    <div style={{ display: "flex", alignItems: "center" }}>
      <div
        style={{
          marginRight: 20,
          marginTop: BAR_HEIGHT + 10,
          textAlign: "right",
        }}
      >
        <div className={classes.levelAndBadge}>
          <Typography>Niveau {currentLevel}</Typography>
          <DiscountBadge amount={currentLevel} />
        </div>
        {/* <Typography>-{currentLevel}% sur votre LAMal</Typography> */}
        {/* <Typography>{currentLevelGift}</Typography> */}
      </div>
      <div
        style={{
          position: "relative",
          height: BAR_HEIGHT,
          width: TOTAL_WIDTH,
          backgroundColor: grey[300],
          marginTop: BAR_HEIGHT + 10,
        }}
      >
        <Progress {...rest} />
        <div
          style={{
            position: "absolute",
            top: -5,
            bottom: -5,
            left: -4,
            width: 4,
            backgroundColor: blue[800],
          }}
        ></div>
        <div
          style={{
            position: "absolute",
            top: -5,
            bottom: -5,
            right: -4,
            width: 4,
            backgroundColor: blue[800],
          }}
        ></div>
      </div>
    </div>
  );
};

export default LevelIndicator;
