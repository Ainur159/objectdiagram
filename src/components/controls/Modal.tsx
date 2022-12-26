import { observable } from "mobx";
import React from "react";
import ReactDOM from "react-dom";
import "./Controls.less";

export interface IModalProps {
  children: React.ReactNode;
  footer?: React.ReactNode[];
  header?: string;
  onClose?: () => void;
  id: string;
}

export const Modal = (props: IModalProps) => {
  return (
    <div
      className="modal fade"
      id={props.id}
      data-bs-backdrop="static"
      data-bs-keyboard="false"
      aria-hidden="true"
    >
      <div className="modal-dialog modal-dialog-scrollable">
        <div className="modal-content">
          <div className="modal-header">
            <h1 className="modal-title fs-5">
              {props.header}
            </h1>
            <button
              type="button"
              className="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>
          </div>
          <div className="modal-body">
            {props.children}
          </div>
          <div className="modal-footer">
            {props.footer}
          </div>
        </div>
      </div>
    </div>
  );
};
