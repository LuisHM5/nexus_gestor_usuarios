import "./Sidebar.css";
import { Link } from "react-router-dom";
import { useState } from "react";
import Avatar from "@mui/material/Avatar";
const Sidebar = ({ mode, sidebar, rutas, usuario, logout }) => {
  function toggleDarkMode() {
    mode.setDarkMode(!mode.darkMode);
    localStorage.setItem("darkMode", JSON.stringify(!mode.darkMode));
  }
  function toogleSidebar() {
    sidebar.setSidebarClose(!sidebar.sidebarClose);
    localStorage.setItem("sidebarClose", JSON.stringify(!sidebar.sidebarClose));
  }
  function stringAvatar(name) {
    const nameSplit = name.split(" ");

    if (nameSplit.length === 1)
      return {
        sx: {
          bgcolor: "green",
        },
        children: `${name[0]}`,
      };
    return {
      sx: {
        bgcolor: "green",
      },
      children: `${name.split(" ")[0][0]}${name.split(" ")[1][0]}`,
    };
  }
  return (
    <nav className={`sidebar ${sidebar.sidebarClose ? "close" : ""}`}>
      <header>
        <div className="image-text">
          <span className="image">
            {/* <i className="bx bx-user img"></i> */}

            <Avatar className="img" {...stringAvatar(usuario?.nombre)} />
          </span>

          <div className="text header-text">
            {/* <span className="name">Luis Hernandez Macias</span> */}
            <span className="name">{usuario?.nombre}</span>
          </div>
        </div>
        <div className="rol text">{usuario?.admin ? "Admin" : "Usuario"}</div>
        {sidebar.sidebarClose ? (
          <i className="bx bx-chevron-right toggle" onClick={toogleSidebar}></i>
        ) : (
          <i className="bx bx-chevron-left toggle" onClick={toogleSidebar}></i>
        )}
      </header>
      <div className="menu-bar">
        <div className="menu">
          <ul className="menu-links">
            <li className="nav-link">
              <Link to={rutas.inicio}>
                <i className="bx bx-home icon"></i>
                <span className="text nav-text nav-text-1">Inicio</span>
              </Link>
            </li>
            <li className="nav-link">
              <Link to={rutas.asistencia}>
                <i className="bx bx-edit icon"></i>
                <span className="text nav-text nav-text-2">Registrar Asistencia</span>
              </Link>
            </li>
            <li className="nav-link">
              <Link to={rutas.reporte}>
                <i className="bx bxs-report icon"></i>
                <span className="text nav-text nav-text-3">Generar reporte</span>
              </Link>
            </li>
          </ul>
          <ul className="menu-links menu-bottom">
            {!!usuario?.admin && (
              <li className="nav-link">
                <Link to={rutas.registro}>
                  <i className="bx bx-user-plus icon icon-registrar"></i>
                  <span className="text nav-text ">Registrar</span>
                </Link>
              </li>
            )}
            <li className="nav-link">
              <Link to={rutas.inicioSesion} onClick={logout}>
                {/* <i className="bx bx-log-in icon icon-iniciar"></i> */}
                {/* <span className="text nav-text">Iniciar sesión</span> */}
                <i className="bx bx-log-out icon icon-iniciar"></i>
                <span className="text nav-text">Cerrar sesión</span>
              </Link>
            </li>
            <li className="mode">
              <div className="sun-moon">
                <i className="bx bx-moon icon moon"></i>
                <i className="bx bx-sun icon sun"></i>
              </div>
              <span className="text nav-text">{mode.darkMode ? "Modo claro" : "Modo obscuro"}</span>

              <div className="toggle-switch" onClick={toggleDarkMode}>
                <span className="switch"></span>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Sidebar;
