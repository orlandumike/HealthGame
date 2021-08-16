import { orange, red, teal } from "@material-ui/core/colors";

import { ActivityColorType, ColorsType } from "types/colors";

export const getActivityColor = (color: ActivityColorType) => Colors[color];

const Colors: ColorsType = {
  orange: orange[500],
  red: red[600],
  teal: teal[400],
  Red: "#e62d0a",
  RedLighten10: "#f64f2f",
};

export default Colors;
