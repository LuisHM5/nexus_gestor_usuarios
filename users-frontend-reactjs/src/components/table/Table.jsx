import React from "react";
import "./Table.css";
const Table = ({ columns, data, component, type, onClick }) => {
  return (
    <table className="table">
      <thead className="table-head">
        <tr>
          {component && <th className="component">.</th>}

          {columns.map((column) => (
            <th key={column}>{column}</th>
          ))}
        </tr>
      </thead>
      <tbody className="table-body">
        {data.map((row, index) => (
          <tr key={index}>
            {component && (
              <td className="component" data-label={"Seleccion"}>
                <div className={`component-container ${type}`}>
                  <i className={`bx bx-${type} button-add-delete`} onClick={onClick} data-codigo={row?.codigo}></i>
                </div>
              </td>
            )}
            {columns.map((column) => (
              <td key={column} data-label={column}>
                {column === "Registro" ? (row.entrada === 1 ? "Entrada" : "Salida") : row[column.toLowerCase()]}
                {!row[column.toLowerCase()] && "Sin registrar"}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default Table;
