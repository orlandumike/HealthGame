export type ColorsType = {
  orange: string;
  red: string;
  teal: string;
  Red: string;
  RedLighten10: string;
};

export type ActivityColorType = keyof Pick<
  ColorsType,
  "orange" | "red" | "teal"
>;
