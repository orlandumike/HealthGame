import React, { useEffect, useRef, useState } from "react";
import { Typography } from "@material-ui/core";
import { yellow, orange, grey, green, blue } from "@material-ui/core/colors";

// - 0 => 140
// - 80 objectif

// < 40 => orange
// < 80 => jaune
// >= 80 => vert

const TOTAL_DURATION = 500;
const STEPS = 20;
const INTERVAL = TOTAL_DURATION / STEPS;

const TARGET_POINTS = 80;
const MAX_DAY_POINTS = 140;

const BAR_HEIGHT = 30;
const TOTAL_WIDTH = 300;

interface Props {
  value: number;
}

const Progress: React.FC<Props> = ({ value }) => {
  const [progress, setProgress] = useState(0);
  const counter = useRef(0);
  const scoreColor =
    value < 40 ? yellow[600] : value < 80 ? orange[600] : green[500];

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
        right: TOTAL_WIDTH - (progress / MAX_DAY_POINTS) * TOTAL_WIDTH,
        backgroundColor: scoreColor,
      }}
    ></div>
  );
};

const TodayActivity: React.FC<Props> = ({ value }) => {
  return (
    <div style={{ display: "flex", alignItems: "center" }}>
      <div style={{ marginRight: BAR_HEIGHT, marginTop: BAR_HEIGHT + 10 }}>
        <Typography>Aujourd'hui</Typography>
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
        <Progress value={value} />
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
            left: (TARGET_POINTS / MAX_DAY_POINTS) * TOTAL_WIDTH - 2,
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
        <div
          style={{
            position: "absolute",
            top: -30,
            bottom: -5,
            left: (TARGET_POINTS / MAX_DAY_POINTS) * TOTAL_WIDTH - 30,
          }}
        >
          <Typography>Objectif</Typography>
        </div>
      </div>
    </div>
  );
};

export default TodayActivity;
