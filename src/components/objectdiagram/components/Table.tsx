import React, { useEffect, useRef, useState } from "react";
import { observer } from "mobx-react-lite";
import { useStore } from "../ObjectDiagramProvider";
import { ObjectDigramStore } from "../store/ObjectDigramStore";
import { Attribute, IAttributeProps } from "./Attribute";
import classNames from "classnames";
import { observable } from "mobx";

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

const TABLE_PADDING = 10;

export const Table = observer((props: ITableProps) => {
  const store: ObjectDigramStore = useStore();

  const titleLineRef = useRef<HTMLDivElement>(null);
  const attrsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // calc attrs height for scroll
    if (titleLineRef.current && attrsRef.current) {
      const attrsHeight =
        props.height - 2 * TABLE_PADDING - titleLineRef.current.offsetTop;
      attrsRef.current.style.height = `${attrsHeight}px`;
    }
  });

  const onMouseDown = (e: React.MouseEvent<SVGGElement>) => {
    store.onTableMouseDown?.(props.id);
    e.stopPropagation();
  };

  const onMouseUp = (e: React.MouseEvent<SVGGElement>) => {
    store.onTableMouseUp();
    e.stopPropagation();
  };

  return (
    <g className="d-table" onMouseDown={onMouseDown} onMouseUp={onMouseUp}>
      <foreignObject
        x={props.x}
        y={props.y}
        width={props.width}
        height={props.height}
      >
        <div
          className={classNames(
            "d-table-border",
            props.isSelected && "d-table-selected"
          )}
        >
          <div className="d-table-title">{props.title}</div>
          <div className="d-table-title-line" ref={titleLineRef} />
          {/* TODO table */}
          <div className="d-table-attrs d-flex flex-column pt-1" ref={attrsRef}>
            {props.attrs.map((el) => {
              return <Attribute key={el.id} {...el} />;
            })}
          </div>
          <div className="d-resizer">z</div>
        </div>
      </foreignObject>
    </g>
  );
});
