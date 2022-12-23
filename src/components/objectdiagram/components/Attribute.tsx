import React from "react";
import { IAttributeProps, TypeToColor } from "./types";

export const Attribute = (props: IAttributeProps) => {
  return (
    <div className="d-attr d-flex align-items-center">
      {props.name && <span className="d-attr-name">{props.name}</span>}
      {props.ident && <span className="d-attr-ident">{props.ident}</span>}
      {props.required && <span className="d-attr-required">*</span>}
      {(props.showTypeColor && props.type && (
        <span
          className="d-attr-color"
          style={{ backgroundColor: TypeToColor[props.type] }}
        />
      )) || <></>}
      {props.type && <span className="d-attr-type">{props.type.toLowerCase()}</span>}
    </div>
  );
};
