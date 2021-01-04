export type ColorsType = {
  orange: string;
  red: string;
  teal: string;
  AssuraRed: string;
  AssuraRedLighten10: string;
};

export type ActivityColorType = keyof Pick<
  ColorsType,
  "orange" | "red" | "teal"
>;
