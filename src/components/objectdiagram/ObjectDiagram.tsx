import React, { useEffect, useRef, useState } from "react";
import { ObjectDigramStore } from "./store/ObjectDigramStore";
import { svgNS } from "./store/SvgProvider";
import classNames from "classnames";
import "./ObjectDiagram.less";
import { Button, SwitchControl, TextField } from "../controls/Controls";
import { observer } from "mobx-react-lite";
import { useStore } from "./ObjectDiagramProvider";
import { Table } from "./components/Table";
import { Point } from "./components/Point";
import { Modal } from "../controls/Modal";

export const ObjectDiagram = observer(() => {
  const svgContainerRef = useRef<SVGSVGElement>(null);
  const [isInit, setIsInit] = useState(false);
  const [settingsModalOpen, setSettingsModalOpen] = useState(false);

  const store: ObjectDigramStore = useStore();

  useEffect(() => {
    if (!isInit) {
      store.init(svgContainerRef?.current);
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
  };

  const onSvgMouseUp = () => {
    store.svgMouseUp();
  };

  const onSvgMouseWheel = (e: React.WheelEvent<SVGSVGElement>) => {
    let a = 10;
  };

  const onContextMenu = (e: React.MouseEvent<SVGSVGElement>) => {
    e.preventDefault();
  };

  const openSettingsModal = () => {
    setSettingsModalOpen(true);
  };

  const closeSettingsModal = () => {
    setSettingsModalOpen(false);
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
        <div className="d-header-btns">
          <Button onClick={createDiagramClick} isCircle={true}>
            <i className="bi bi-plus-lg"></i>
          </Button>
          <Button onClick={openSettingsModal} isCircle={true} dataBsToggle="modal" dataBsTargetId="settingsModal">
            <i className="bi bi-gear"></i>
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
            (store.isDown || store.isResize) && "d-svg-mouse"
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
            onWheel={onSvgMouseWheel}
            onContextMenu={onContextMenu}
          >
            {Object.keys(store.gridPoints).map((rowY) => {
              const rowPoints = store.gridPoints[rowY];
              if (!rowPoints) {
                return <></>;
              }
              return Object.keys(rowPoints).map((rowX) => {
                const point = rowPoints[rowX];
                if (!point) {
                  return <></>;
                }
                return (
                  <Point key={point.id} {...point} className="d-grid-point" />
                );
              });
            })}
            {store.tables.map((table) => {
              return <Table key={table.id} {...table} />;
            })}
          </svg>
          {settingsModalOpen && (
            <Modal header="Настройки" onClose={closeSettingsModal} id="settingsModal" footer={
              [
                <Button onClick={closeSettingsModal} isPill={true}>{"ОК"}</Button>
              ]
            }>
              <div className="container-fluid">
                <div className="row">
                  <h4>{"Тип"}</h4>
                  <div className="col-6">
                    <SwitchControl label="Наименование" />
                  </div>
                  <div className="col-6">
                    <SwitchControl label="Идентификатор" />
                  </div>
                </div>
                <div className="row">
                  <h4>{"Атрибуты"}</h4>
                  <div className="col-6">
                    <SwitchControl label="Наименование" />
                  </div>
                  <div className="col-6">
                    <SwitchControl label="Идентификатор" />
                  </div>
                  <div className="col-6">
                    <SwitchControl label="Обязательность" />
                  </div>
                  <div className="col-6">
                    <SwitchControl label="Цвет" />
                  </div>
                  <div className="col-6">
                    <SwitchControl label="Тип" />
                  </div>
                  <div className="col-6"></div>
                </div>
                <div className="row">
                  <h4>{"Связи"}</h4>
                  <div className="col-6">
                    <SwitchControl label="Текст" />
                  </div>
                  <div className="col-6">
                    <SwitchControl label="Прямой тип линии" />
                  </div>
                </div>
              </div>
            </Modal>
          )}
        </div>
      </div>
    </div>
  );
});
