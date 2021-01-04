import React, { useEffect, useRef } from "react";
import Chart from "chart.js";
import { useTheme } from "@material-ui/core/styles";

import { DataPoint } from "types/api";

interface Props {
  data: DataPoint[];
}

const BarChart: React.FC<Props> = ({ data }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const chartRef = useRef<Chart | null>(null);

  const theme = useTheme();

  useEffect(() => {
    chartRef.current = new Chart(canvasRef.current!, {
      type: "bar",
      data: {
        labels: data.map((e) =>
          e.date
            ? new Date(e.date).toLocaleDateString("fr-CH")
            : `Semaine ${e.weekNumber}`
        ),
        datasets: [
          {
            label: "Nombre d'activités",
            data: data.map((e) => e.value),
            backgroundColor: theme.palette.primary.main,
          },
        ],
      },
      options: {
        scales: {
          yAxes: [
            {
              ticks: {
                stepSize: 1,
                min: 0,
              },
            },
          ],
        },
      },
    });

    return () => {
      chartRef.current?.destroy();
    };
  }, [data, theme]);

  return <canvas ref={canvasRef} />;
};

export default BarChart;
