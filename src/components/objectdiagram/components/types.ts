export interface IPointProps {
  id: number;
  x: number;
  y: number;
  r: number;
  className?: string;
}

export interface ITableProps {
  id: number;
  x: number;
  y: number;
  width: number;
  height: number;
  title: string;
  attrs: IAttributeProps[];
  isSelected: boolean;
}

export type IAttributeType = "STRING" | "NUMBER" | "OBJECT" | "CUSTOM";

export const TypeToColor = {
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

export interface ISettings {
  scale: number,
  x0: number,
  y0: number,
  tableName: boolean,
  tableIdent: boolean,
  attrName: boolean,
  attrType: boolean,
  attrIdent: boolean,
  attrRequired: boolean,
  typeColor: boolean,
  relationType: boolean,
  relationLineType: boolean,
}