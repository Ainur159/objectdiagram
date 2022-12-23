import { observer } from "mobx-react-lite";
import React from "react";

export type IAttributeType = "STRING" | "NUMBER" | "OBJECT" | "CUSTOM";

const TypeToColor = {
  STRING: "red",
  NUMBER: "yellow",
  OBJECT: "blue",
  CUSTOM: "green",
};

export interface IAttributeProps {
  id: number;
  name?: string;
  ident?: string;
  showTypeColor?: boolean;
  type?: IAttributeType;
  required?: boolean;
}

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
