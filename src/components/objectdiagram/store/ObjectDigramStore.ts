import { observable, action, makeAutoObservable, computed } from "mobx";
import { IPointProps, ISettings, ITableProps } from "../components/types";
import { SvgProvider } from "./SvgProvider";

export class ObjectDigramStore {
  @observable
  name: string = "test diagram";

  @observable
  tables = observable.array<ITableProps>();

  @observable
  relations = observable.array<any>();

  @observable.ref
  gridPoints = {};

  @observable
  selectedTableId?: number;

  @observable
  x0: number = 0;

  @observable
  y0: number = 0;

  @observable
  isDown: boolean = false;

  @observable
  isResize: boolean = false;

  @observable
  settings: ISettings = {
    scale: 100,
    x0: 0,
    y0: 0,
    tableName: true,
    tableIdent: false,
    attrName: true,
    attrType: true,
    attrIdent: false,
    attrRequired: false,
    typeColor: true,
    relationType: true,
    relationLineType: true,
  };

  svgContainer: SVGSVGElement | null;

  constructor() {}

  init = (svgContainer: SVGSVGElement | null, id?: number) => {
    this.svgContainer = svgContainer;
    this.initGridPoints();

    if (id) {
      // TODO
      return;
    }

    this.tables.push({
      id: 1,
      x: 100,
      y: 100,
      title: "Object type",
      width: 100,
      height: 100,
      attrs: [
        {
          id: 1,
          name: "str",
          type: "STRING",
          showTypeColor: true,
          required: true,
        },
        { id: 2, name: "obj", type: "OBJECT", showTypeColor: true },
        {
          id: 3,
          name: "num",
          type: "NUMBER",
          showTypeColor: true,
          required: true,
        },
        { id: 4, name: "cus", type: "CUSTOM", showTypeColor: true },
      ],
      isSelected: false,
    });
  };

  @action
  initGridPoints = () => {
    if (!this.svgContainer) {
      return;
    }
    const { clientWidth, clientHeight } = this.svgContainer;
    this.gridPoints = SvgProvider.createGridPoints(clientWidth, clientHeight);
  };

  @action
  changeName = (name: string) => {
    this.name = name;
  };

  @action
  resetSelected = () => {
    this.selectedTableId = undefined;
    this.selectTable();
  };

  @action
  svgMouseMove = (newX: number, newY: number) => {
    const dx = newX - this.x0;
    const dy = newY - this.y0;
    if (this.isResize && this.selectedTable) {
      this.selectedTable.width += dx;
      this.selectedTable.height += dy;
    } else if (this.isDown && this.selectedTable) {
      this.tableMove(dx, dy);
    }
    this.x0 = newX;
    this.y0 = newY;
  };

  @action
  svgMouseUp = () => {
    if (this.isResize) {
      this.onTableResizeUp();
    }
    if (this.selectedTable) {
      this.onTableMouseUp();
    }
  };

  @computed
  get selectedTable(): ITableProps | undefined {
    return this.tables.find((el) => el.id === this.selectedTableId);
  }

  @action
  selectTable = (id?: number) => {
    this.tables.forEach((table) => {
      if (table.id === id) {
        table.isSelected = true;
        return;
      }
      table.isSelected = false;
    });
  };

  @action
  onTableMouseDown = (id: number) => {
    this.selectedTableId = id;
    this.selectTable(id);
    this.isDown = true;
  };

  @action
  tableMove = (dx: number, dy: number) => {
    const selTable = this.selectedTable;
    if (selTable) {
      selTable.x += dx;
      selTable.y += dy;
    }
  };

  @action
  onTableMouseUp = () => {
    this.isDown = false;
    if (!this.selectedTable) {
      return;
    }

    if (this.isResize) {
      this.onTableResizeUp();
      return;
    }

    const { x: oldX, y: oldY } = this.selectedTable;
    const { x, y } =
      SvgProvider.nearPointInGrid(this.gridPoints, oldX, oldY) || {};

    if (!x || !y) {
      return;
    }

    this.selectedTable.x = x;
    this.selectedTable.y = y;
  };

  @action
  onTableResizeDown = (id: number) => {
    this.selectTable(id);
    this.isResize = true;
  };

  @action
  onTableResizeUp = () => {
    this.isResize = false;
  };
}
