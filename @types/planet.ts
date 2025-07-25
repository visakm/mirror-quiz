export enum Planet {
  SHADOW = "shadow",
  PRIMARY = "primary",
  SUPPORTING = "supporting",
}

export enum Position {
  BOTTOM = "bottom",
  RIGHT = "right",
  LEFT = "left",
}

export type Movement = {
  acc: Position;
  cur: Position;
};

export type PlanetMovement = Record<Planet, Movement>;
