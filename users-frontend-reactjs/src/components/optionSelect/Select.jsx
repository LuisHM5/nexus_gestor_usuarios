import React from "react";
import "./Select.css"; // Importamos el archivo CSS

const Select = ({ options, value, onChange }) => {
  return (
    <select className="select" value={value} onChange={onChange}>
      {options.map((option) => (
        <option className="option" key={option.value} value={option.value}>
          {option.label}
        </option>
      ))}
    </select>
  );
};

export default Select;
