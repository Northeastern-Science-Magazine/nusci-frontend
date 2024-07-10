// TODO: update these to actual theme colors
const COLORS = {
  secondary: "#E7D4FA",
  primary: "#F84949",
  black: "#222222",
  white: "#FFFFFF",
  disabled: "#FBA4A4",
  green: "#4CAF50",
  blue: "#2196F3",
  darkGreen: "#388E3C",
  red: "#F44336",
  lightGray: "#CDCDCD",
  purple: "#9C27B0",
  pink: "#E91E63",
  orange: "#FF9800",
  yellow: "#FFEB3B",
  darkBlue: "#3F51B5",
  silver: "#9E9E9E",
  earthyBrown: "#795548",
};

// TODO: we should store some mapping of categories to colors (ex. environment = green, health = red, etc.)

const CATEGORY_COLORS: Map<string, string> = new Map([
  ["Biology", COLORS.green],
  ["Chemistry", COLORS.blue],
  ["Environment", COLORS.darkGreen],
  ["Health", COLORS.red],
  ["Newsletter", COLORS.lightGray],
  ["Opinion", COLORS.purple],
  ["Physics", COLORS.orange],
  ["Culture", COLORS.pink],
  ["Psychology", COLORS.yellow],
  ["Space", COLORS.darkBlue],
  ["Technology", COLORS.silver],
  ["World", COLORS.earthyBrown],
]);

export { COLORS, CATEGORY_COLORS };
