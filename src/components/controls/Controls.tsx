import classNames from "classnames";
import { observable } from "mobx";
import { observer } from "mobx-react-lite";
import React, {
  HTMLInputTypeAttribute,
  PropsWithChildren,
  useState,
} from "react";
import "./Controls.less";

export interface IButtonProps extends PropsWithChildren {
  onClick?: () => void;
  isCircle?: boolean;
  isPill?: boolean;
  disabled?: boolean;
  className?: string;
  isTransparent?: boolean;
  dataBsToggle?: string;
  dataBsTargetId?: string;
}

export const Button = (props: IButtonProps) => {
  const getClassName = () => {
    return classNames(
      "btn btn-success",
      props.isCircle && "rounded rounded-circle",
      props.isPill && "rounded rounded-pill",
      props.className
    );
  };

  return (
    <button
      className={getClassName()}
      onClick={props.onClick}
      disabled={props.disabled}
      data-bs-toggle={props.dataBsToggle}
      data-bs-target={`#${props.dataBsTargetId}`}
    >
      {props.children}
    </button>
  );
};

export type TextFieldValueType = string | number | string[] | undefined;

export interface ITextFieldProps {
  label?: string;
  type: HTMLInputTypeAttribute;
  placeholder?: string;
  readonly?: boolean;
  disabled?: boolean;
  className?: string;
  value?: TextFieldValueType;
  onChange?: (value: TextFieldValueType) => void;
  isRealtime?: boolean;
}

export const TextField = observer((props: ITextFieldProps) => {
  const [value, setValue] = useState<string | number | string[] | undefined>();

  const getValue = () => {
    return props.isRealtime === false ? value : props.value;
  };

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (props.isRealtime !== false) {
      props.onChange?.(value);
      return;
    }
    setValue(value);
  };

  const onBlur = () => {
    if (props.isRealtime === false) {
      props.onChange?.(value);
    }
  };

  return (
    <div className="">
      {props.label && <label className="form-label">{props.label}</label>}
      <input
        type={props.type}
        className={classNames("form-control", props.className)}
        placeholder={props.placeholder}
        readOnly={props.readonly}
        disabled={props.disabled}
        value={getValue()}
        onChange={onChange}
        onBlur={onBlur}
      />
    </div>
  );
});

export interface ISwitchControlProps {
  label?: string;
  value?: boolean;
  onChange?: (val: boolean) => void;
}

export const SwitchControl = (props: ISwitchControlProps) => {
  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    props.onChange?.(e.target.checked);
  };

  return (
    <div className="form-check form-switch">
      <input
        className="form-check-input"
        type="checkbox"
        role="switch"
        checked={props.value}
        onChange={onChange}
      />
      <label className="form-check-label">{props.label}</label>
    </div>
  );
};
