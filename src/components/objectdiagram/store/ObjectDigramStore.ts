import { observable, action, makeAutoObservable, computed } from "mobx";
import { ITableProps } from "../components/Table";

export class ObjectDigramStore {
  @observable
  name: string = "";

  @observable
  tables = observable.array<ITableProps>([]);

  @observable
  relations = observable.array<any>([]);

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

  constructor() {}

  init = (id?: number) => {
    if (id) {
      // TODO
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
    if (this.isDown && this.selectedTable) {
      this.tableMove(newX - this.x0, newY - this.y0);
    }
    this.x0 = newX;
    this.y0 = newY;
  };

  @action
  svgMouseUp = () => {
    this.isDown = false;
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
  };
}
