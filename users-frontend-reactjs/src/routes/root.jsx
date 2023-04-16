import { Outlet } from "react-router-dom";
import Sidebar from "../components/sidebar/Sidebar";
import { useState } from "react";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";
import "dayjs/locale/es-mx";
import { useMediaQuery } from "@mui/material";

const root = ({ rutas, usuario, logout }) => {
  const isMobile = !useMediaQuery("(min-width:600px)");
  const getDarkMode = JSON.parse(localStorage.getItem("darkMode"));
  const getSidebarClose = JSON.parse(localStorage.getItem("sidebarClose"));

  const [darkMode, setDarkMode] = useState(getDarkMode || false);
  const [sidebarClose, setSidebarClose] = useState(getSidebarClose || isMobile);
  return (
    <div className={`app ${darkMode ? "dark" : ""}`}>
      <Sidebar
        mode={{ darkMode, setDarkMode }}
        sidebar={{ sidebarClose, setSidebarClose }}
        rutas={rutas}
        usuario={usuario}
        logout={logout}
      />
      <div className={`page ${sidebarClose ? "close" : ""}`}>
        <div className="container-page">
          <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale={dayjs.locale("es-mx")}>
            <div className="container-content">
              <Outlet />
            </div>
          </LocalizationProvider>
        </div>
      </div>
    </div>
  );
};

export default root;
