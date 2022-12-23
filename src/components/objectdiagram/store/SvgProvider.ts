import { IPointProps } from "../components/types";

export const svgNS = "http://www.w3.org/2000/svg";
export class SvgProvider {
  static GRID_POINTS_LENGTH = 30;

  static createGridPoints = (width: number, height: number) => {
    const dL = SvgProvider.GRID_POINTS_LENGTH;
    const gridPointRadius = 1;
    let id = 1;
    const rows = {};
    for (let y = dL; y < height - dL; y += dL) {
      rows[y] = {};
      for (let x = dL; x < width - dL; x += dL) {
        rows[y][x] = {
          id,
          x,
          y,
          r: gridPointRadius,
        } as IPointProps;
        id++;
      }
    }
    return rows;
  };

  static nearPointInGrid = (
    gridPointsObj: any,
    x: number,
    y: number
  ): { x: number; y: number } | undefined => {
    const dL = this.GRID_POINTS_LENGTH / 2;
    const nearY = Object.keys(gridPointsObj).find(
      (rowY) => Math.abs(Number(rowY) - y) <= dL
    );

    if (!nearY) {
      return;
    }

    const rowPoints = gridPointsObj[nearY];
    const nearX = Object.keys(rowPoints).find(
      (rowX) => Math.abs(Number(rowX) - x) <= dL
    );

    if (!nearX) {
      return;
    }

    return { x: Number(nearX), y: Number(nearY) };
  };
}
