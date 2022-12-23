import React, { useCallback, useEffect, useRef, useState } from "react";
import { ObjectDigramStore } from "./store/ObjectDigramStore";
import { svgNS } from "./utils";
import classNames from "classnames";
import "./ObjectDiagram.less";
import { Button, TextField } from "../controls/Controls";
import { observer } from "mobx-react-lite";
import { useStore } from "./ObjectDiagramProvider";
import { Table } from "./components/Table";
import { autorun, reaction } from "mobx";

export const ObjectDiagram = observer(() => {
  const svgContainerRef = useRef<SVGSVGElement>(null);
  const [isInit, setIsInit] = useState(false);

  const store: ObjectDigramStore = useStore();

  useEffect(() => {
    if (!isInit) {
      store.init();
      setIsInit(true);
    }
  });

  const createDiagramClick = () => {
    // TODO
  };

  const removeDiagramClick = () => {
    // TODO
  };

  const changeName = (name: string) => {
    store.changeName(name);
  };

  const onSvgMouseDown = () => {
    store.resetSelected();
  };

  const onSvgMouseMove = (e: React.MouseEvent<SVGSVGElement>) => {
    const { clientX, clientY } = e;
    store.svgMouseMove(clientX, clientY);

    svgContainerRef.current &&
      (svgContainerRef.current.style.backgroundColor = "#fff");
  };

  const onSvgMouseUp = () => {
    store.svgMouseUp();
  };

  return (
    <div className={"objectdiagram h-100"}>
      <div
        className={classNames(
          "d-header",
          "border border-bottom-1",
          "d-flex align-items-center justify-content-between p-2"
        )}
      >
        <div className="">
          <Button onClick={createDiagramClick} isCircle={true}>
            <i className="bi bi-plus-lg"></i>
          </Button>
        </div>
        <div>
          <TextField
            type="text"
            className="border-0 border-bottom d-name"
            value={store.name}
            onChange={changeName}
            isRealtime={false}
          />
        </div>
        <div className="">
          <Button isPill={true} className="d-flex" onClick={removeDiagramClick}>
            <i className="bi bi-trash"></i>
            &nbsp;
            <span>{"Удалить предметную область"}</span>
          </Button>
        </div>
      </div>
      <div className={"d-content p-2"}>
        <div
          className={classNames(
            "d-svgContainer h-100 border border-1",
            store.isDown && "d-svg-mouse"
          )}
        >
          <svg
            ref={svgContainerRef}
            width="100%"
            height="100%"
            xmlns={svgNS}
            onMouseDown={onSvgMouseDown}
            onMouseMove={onSvgMouseMove}
            onMouseUp={onSvgMouseUp}
          >
            {store.tables.map((table) => {
              return <Table key={table.id} {...table} />;
            })}
          </svg>
        </div>
      </div>
    </div>
  );
});