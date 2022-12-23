import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";
import "bootstrap-icons/font/bootstrap-icons.css";

import "reflect-metadata";

import React from "react";
import ReactDOM from "react-dom/client";
import "./index.less";

import "moment/locale/ru";
import moment from "moment";
import { ObjectDiagramProvider } from "./components/objectdiagram/ObjectDiagramProvider";

moment.locale("ru");

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <ObjectDiagramProvider />
);
