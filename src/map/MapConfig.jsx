export const MAPBOX_TOKEN = process.env.NEXT_PUBLIC_MAPBOX_TOKEN?.trim() || "";

export const MAPBOX_STYLE_DARK =
  process.env.NEXT_PUBLIC_MAPBOX_STYLE ||
  "mapbox://styles/aminbennayevv/cmr5i7g6v000m01r021wg31ab";

export const MAPBOX_STYLE_LIGHT =
  process.env.NEXT_PUBLIC_MAPBOX_STYLE_NORMAL ||
  "mapbox://styles/aminbennayevv/cmrfjli0y005n01qw9k9take5";

export const getMapStyle = (theme) =>
  theme === "dark" ? MAPBOX_STYLE_DARK : MAPBOX_STYLE_LIGHT;

export const INITIAL_VIEW = {
  center: [49.834, 40.3665],
  zoom: 14.2,
  pitch: 56,
  bearing: -18,
};

export const getLightPreset = (theme) => (theme === "dark" ? "night" : "day");
