import React from "react";
import "./Input.css";

const Input = ({ type, placeholder, value, onChange, onKeyDown }) => {
  return (
    <input
      className="input"
      type={type}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      onKeyDown={onKeyDown}
    />
  );
};

export default Input;
