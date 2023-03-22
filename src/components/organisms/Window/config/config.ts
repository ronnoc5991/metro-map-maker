type ConfigProperty =
  | "DEFAULT_ZOOM_PERCENTAGE"
  | "MIN_ZOOM_PERCENTAGE"
  | "MAX_ZOOM_PERCENTAGE"
  | "ZOOM_SCROLL_STEP_SIZE"
  | "ZOOM_BUTTON_STEP_SIZE";

const config: Record<ConfigProperty, number> = {
  DEFAULT_ZOOM_PERCENTAGE: 100,
  MIN_ZOOM_PERCENTAGE: 50,
  MAX_ZOOM_PERCENTAGE: 300,
  ZOOM_SCROLL_STEP_SIZE: 1,
  ZOOM_BUTTON_STEP_SIZE: 10,
};

export default config;