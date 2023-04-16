import React, { useState } from "react";
import { RouterProvider, createBrowserRouter, createHashRouter } from "react-router-dom";
import "./index.css";
import "./App.css";
import Root from "./routes/root.jsx";
import Attendance from "./routes/Attendance";
import Report from "./routes/Report";
import Login from "./routes/Login";
import Register from "./routes/Register";
import Home from "./routes/Home";
import { ProtectedRoute } from "./components/ProtectedRouter";
import UsuarioPage from "./routes/usuarioPage";

// const router = createBrowserRouter([
//   {
//     path: "/",
//     element: <Root />,
//     children: [
//       { path: "/asistencia", element: <Attendance /> },
//       { path: "/reporte", element: <Report /> },
//       { path: "/registro", element: <Register /> },
//       { path: "/inicio-sesion", element: <Login /> },
//     ],
//   },
// ]);

// rutas todo en un objeto
const rutas = {
  root: "/portal",
  inicio: "/portal/inicio",
  asistencia: "/portal/asistencia",
  reporte: "/portal/reporte",
  registro: "/portal/registro",
  inicioSesion: "/",
};
// rutas sin portal
// const rutasSinPortal = {
//   root: "/",
//   inicio: "/inicio",
//   asistencia: "/asistencia",
//   reporte: "/reporte",
//   registro: "/registro",
//   inicioSesion: "/",
// };

const App = () => {
  const storedUser = JSON.parse(localStorage.getItem("usuario"));
  const [usuario, setUsuario] = useState(storedUser || null);
  const login = (usuarioLogeado) => {
    if (!usuario || usuarioLogeado) {
      setUsuario(usuarioLogeado);
      localStorage.setItem("usuario", JSON.stringify(usuarioLogeado));
      return usuarioLogeado;
    }
  };
  const logout = () => {
    localStorage.removeItem("usuario");
    setUsuario(null);
  };
  const router = createHashRouter([
    { path: "/", element: <Login login={login} usuario={usuario} /> },
    {
      path: "/portal",
      element: (
        <ProtectedRoute isAllowed={!!usuario} redirectTo={"/"} rutas={rutas} usuario={usuario}>
          <Root rutas={rutas} usuario={usuario} logout={logout} />
        </ProtectedRoute>
      ),
      children: [
        { path: "/portal/inicio", element: <Home /> },
        // { path: "/portal/asistencia", element: usuario?.admin ? <Attendance /> : <UsuarioPage /> },
        { path: "/portal/asistencia", element: <Attendance /> },
        { path: "/portal/reporte", element: <Report /> },
        {
          path: "/portal/registro",
          element: (
            <ProtectedRoute
              isAllowed={!!usuario && usuario?.admin}
              rutas={rutas}
              usuario={usuario}
              redirectTo="/portal/inicio"
            >
              <Register />
            </ProtectedRoute>
          ),
        },
      ],
    },
  ]);

  return <RouterProvider router={router} usuario={usuario} />;
};

export default App;
