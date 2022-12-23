import { observer } from "mobx-react-lite";
import React from "react";
import { IPointProps } from "./types";

export const Point = observer((props: IPointProps) => {
  return (
    <circle cx={props.x} cy={props.y} r={props.r} className={props.className} />
  );
});
