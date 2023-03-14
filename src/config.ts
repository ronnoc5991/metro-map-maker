type SizedThing = "stationRadius" | "lineSegmentWidth" | "gridCell";

const sizes: Record<SizedThing, number> = {
  stationRadius: 10, // need to know when drawing and when testing for click hits
  lineSegmentWidth: 3, // need to know when drawing and testing for click hits?
  gridCell: 25, // need to know when calculating grid line positions
};

export { sizes };
