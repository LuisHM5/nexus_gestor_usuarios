import { useEffect, useState } from "react";
import { DatePicker } from "@mui/x-date-pickers";
import Table from "../components/table/Table";
import { getAllUsers } from "../services/user";
import Button from "@mui/material/Button";
import { getReporteFinal } from "../services/views";
import generarPDF from "../helpers/generarPDF";
import "./Styles/customstyles/DatePicker.css";
import Notification from "../components/Notification";
import "./Styles/Report.css";
import { Alert, Checkbox, CircularProgress, FormControlLabel } from "@mui/material";
import Input from "../components/input/Input";
const columnas = ["Codigo", "Nombre", "Usuario", "Correo"];

const Report = () => {
  // usuarios
  const [reporteFinal, setReporteFinal] = useState([]);
  const [seleccionUsuarios, setSeleccionUsuarios] = useState([]);
  const [usuarios, setUsuarios] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [searcher, setSearcher] = useState("");
  const [fechaDesde, setFechaDesde] = useState("");
  const [fechaHasta, setFechaHasta] = useState("");
  const [seleccionarTodos, setSeleccionarTodos] = useState(false);
  const [notificacionReporte, setNotificacionReporte] = useState(false);
  const [tipoNotificacionReporte, setTipoNotificacionReporte] = useState("error");
  const [notificacionReporteMensaje, setNotificacionReporteMensaje] = useState("");
  useEffect(() => {
    getAllUsers().then((res) => {
      setLoading(false);

      if (res?.length > 0) {
        setUsuarios(res);
      } else {
        setError(true);
      }
    });
  }, []);
  useEffect(() => {}, [seleccionUsuarios]);

  const handleAdd = (e) => {
    if (seleccionarTodos) {
      handleSeleccionarTodos();
    }

    const usuarioAgregadoAnteriormente = seleccionUsuarios.some(
      (idUsuario) => idUsuario === e.currentTarget.dataset.codigo
    );

    if (usuarioAgregadoAnteriormente) {
      setNotificacionReporte(true);
      setTipoNotificacionReporte("error");
      setNotificacionReporteMensaje("El usuario ya ha sido agregado");
      return;
    }
    const usuarioEncontrado = usuarios.filter((usuario) => usuario.codigo == e.currentTarget.dataset.codigo);
    usuarios;
    setReporteFinal([...reporteFinal, ...usuarioEncontrado]);
    if (!seleccionarTodos) setSeleccionUsuarios([...seleccionUsuarios, e.currentTarget.dataset.codigo]);
    else {
      setSeleccionUsuarios([e.currentTarget.dataset.codigo]);
    }
  };

  const handleRemove = (e) => {
    const eliminarSeleccion = reporteFinal.filter((usuario) => usuario.codigo != e.currentTarget.dataset.codigo);
    setReporteFinal(eliminarSeleccion);
    const usuariosFiltrados = seleccionUsuarios.filter((idUsuario) => idUsuario !== e.currentTarget.dataset.codigo);
    setSeleccionUsuarios([...usuariosFiltrados]);
  };

  const handleLimpiar = () => {
    document.querySelectorAll(".checkbox-table").forEach((el) => (el.checked = false));
    setReporteFinal([]);
    if (seleccionarTodos) {
      handleSeleccionarTodos();
    }
  };
  const handleSeleccionarTodos = () => {
    if (seleccionarTodos) {
      setSeleccionarTodos(false);
      setReporteFinal([]);
      setSeleccionUsuarios([]);
    } else {
      setReporteFinal([]);
      setSeleccionarTodos(true);
      setSeleccionUsuarios(usuarios.map((usuario) => usuario.codigo));
    }
  };

  function handleClick(e) {
    if (!fechaDesde || !fechaHasta) {
      setNotificacionReporte(true);
      setTipoNotificacionReporte("error");
      setNotificacionReporteMensaje("Debe seleccionar un rango de fechas");
      return;
    }

    if (seleccionUsuarios.length === 0) {
      setNotificacionReporte(true);
      setTipoNotificacionReporte("error");
      setNotificacionReporteMensaje("Debe seleccionar al menos un usuario");
      return;
    }

    const fechainiciofinal = `${fechaDesde["$y"]}-${fechaDesde["$M"] + 1}-${fechaDesde["$D"]} `;
    const fechaFinfinal = `${fechaHasta["$y"]}-${fechaHasta["$M"] + 1}-${fechaHasta["$D"]} `;

    const envioDatos = {
      listaUsuarios: seleccionUsuarios,
      fechaInicio: fechainiciofinal,
      fechaFinal: fechaFinfinal,
    };

    getReporteFinal(envioDatos).then((res) => {
      if (res?.length > 0) {
        try {
          generarPDF(res);
          setSeleccionUsuarios([]);
          setNotificacionReporte(true);
          setTipoNotificacionReporte("success");
          setNotificacionReporteMensaje("Reporte generado correctamente");
          handleLimpiar();
        } catch (error) {
          setNotificacionReporte(true);
          setTipoNotificacionReporte("error");
          setNotificacionReporteMensaje("Error al generar el reporte \n" + error);
        }
      }
      if (res?.length <= 0) {
        setNotificacionReporte(true);
        setTipoNotificacionReporte("error");
        setNotificacionReporteMensaje("No se encontraron datos para generar el reporte");
      }
    });
  }

  const results = !searcher
    ? usuarios
    : usuarios.filter(
        (dato) =>
          dato.codigo.toString().toLowerCase().includes(searcher.toLocaleLowerCase()) ||
          dato.nombre.toString().toLowerCase().includes(searcher.toLocaleLowerCase()) ||
          dato.usuario.toString().toLowerCase().includes(searcher.toLocaleLowerCase()) ||
          dato.correo.toString().toLowerCase().includes(searcher.toLocaleLowerCase())
      );

  return (
    <>
      <div className="title-page">Generando reporte</div>
      <Notification type={tipoNotificacionReporte} open={notificacionReporte} setOpen={setNotificacionReporte}>
        {notificacionReporteMensaje}
      </Notification>
      <h2 className="title-2">Rango de fecha</h2>

      <div className="input-container-principal-report">
        <DatePicker
          className="date-picker"
          label="Desde"
          localeText={{ clearButtonLabel: "GGGG" }}
          format="DD/MM/YYYY"
          onChange={(newValue) => setFechaDesde(newValue)}
          views={["day", "month", "year"]}
        />
        <DatePicker
          className="date-picker"
          label="Hasta"
          format="DD/MM/YYYY"
          onChange={(newValue) => setFechaHasta(newValue)}
          views={["day", "month", "year"]}
        />
        <Button
          variant="contained"
          color="success"
          onClick={handleClick}
          className="btn-generar"
          sx={{ padding: "16px 0", paddingX: 6 }}
        >
          Generar
        </Button>
        <FormControlLabel
          control={<Checkbox checked={seleccionarTodos} value={seleccionarTodos} onChange={handleSeleccionarTodos} />}
          label="Seleccionar todos"
          className="lbl-checkbox"
        />
      </div>

      <h2 className="title-2">Usuarios seleccionados</h2>
      {/* seleccionar todos div */}

      {seleccionarTodos && <div className="title-2 todos">Todos</div>}
      {reporteFinal?.length > 0 ? (
        <Table columns={columnas} data={reporteFinal} component={true} type={"minus"} onClick={handleRemove} />
      ) : (
        <div style={{ height: "30px" }}></div>
      )}

      <h2 className="title-2">Busqueda</h2>
      <div className="container-input-search">
        <Input type={"text"} placeholder={"Buscar..."} value={searcher} onChange={(e) => setSearcher(e.target.value)} />
      </div>
      {loading && <CircularProgress />}
      {error && <Alert severity="error">Error al cargar los datos</Alert>}
      {!loading && <Table columns={columnas} data={results} component={true} type={"plus"} onClick={handleAdd} />}
    </>
  );
};

export default Report;
