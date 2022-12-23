import React, { useEffect, useRef, useState } from "react";
import { observer } from "mobx-react-lite";
import { useStore } from "../ObjectDiagramProvider";
import { ObjectDigramStore } from "../store/ObjectDigramStore";
import { Attribute } from "./Attribute";
import classNames from "classnames";
import { observable } from "mobx";
import { ITableProps } from "./types";
import { ResizerSvgIcon } from "./ResizerIcon";

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

  const onResizerMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
    store.onTableResizeDown?.(props.id);
    e.stopPropagation();
  };

  const onResizerMouseUp = (e: React.MouseEvent<HTMLDivElement>) => {
    store.onTableResizeUp?.();
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
          <div className="d-table-header">
            <div className="d-table-title">{props.title}</div>
            <div className="d-table-title-line" ref={titleLineRef} />
          </div>
          {/* TODO table */}
          <div className="d-table-attrs d-flex flex-column" ref={attrsRef}>
            {props.attrs.map((el) => {
              return <Attribute key={el.id} {...el} />;
            })}
          </div>
          <div className="d-resizer" onMouseDown={onResizerMouseDown} onMouseUp={onResizerMouseUp}>
            <ResizerSvgIcon />
          </div>
        </div>
      </foreignObject>
    </g>
  );
});
