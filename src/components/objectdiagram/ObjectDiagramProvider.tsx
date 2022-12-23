import React from "react";
import { ObjectDiagram } from "./ObjectDiagram";
import { ObjectDigramStore } from "./store/ObjectDigramStore";

const store = new ObjectDigramStore();
const storesContext = React.createContext(store);
const StoresProvider = storesContext.Provider;

export const useStore = () => React.useContext(storesContext);

export const ObjectDiagramProvider = () => {
  return (
    <StoresProvider value={store}>
      <ObjectDiagram />
    </StoresProvider>
  );
};
