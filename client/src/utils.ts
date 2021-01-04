import { Article } from "types/api";

const EXCERPT_MAX_LENGTH = 100;

export const descriptionExcerpt = (text: Article["description"]) => {
  if (text.length > EXCERPT_MAX_LENGTH) {
    return `${text.substring(0, EXCERPT_MAX_LENGTH)}...`;
  }
  return text;
};

export const formatDate = (value: string): string => {
  const date = new Date(Date.parse(value));
  return date.toLocaleString("fr-CH");
};