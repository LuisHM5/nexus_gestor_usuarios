// import Button from "../components/button/Button";
import { Alert, Button, CircularProgress } from "@mui/material";
import Input from "../components/input/Input";
import Select from "../components/optionSelect/Select";
import { useState, useEffect } from "react";
import Table from "../components/table/Table";
import { views } from "../services/views";
import "./Styles/Attendance.css";
import { servicio_registrarAsistencia } from "../services/asistencia";
import { getUser } from "../services/user";
// import { TextField } from "@mui/material";
import Notification from "../components/Notification";
import { formatDate } from "../helpers/formatDate";
const columnas = ["Codigo", "Nombre", "Fecha", "Entrada", "Salida"];

const Attendance = () => {
  const options = [
    { value: "true", label: "Entradas" },
    { value: "false", label: "Salidas" },
  ];
  const [datos, setDatos] = useState({ resultados: [] });
  const [datos2, setDatos2] = useState({ resultados: [] });

  const { loading, error, data, handleCancelRequest } = views({ vista: "v_entrada_salida_hoy" });
  const { loading: loading2, error: error2, data: data2 } = views({ vista: "v_entrada_salida" });

  const [entrada, setEntrada] = useState("true");

  const [notificacionAsistencia, setNotificacionAsistencia] = useState(false);
  const [tipoNotificacionAsistencia, setTipoNotificacionAsistencia] = useState("error");
  const [notificacionAsistenciaMensaje, setNotificacionAsistenciaMensaje] = useState("");

  const initRegistro = { codigo: "", entrada: entrada, fecha: "", hora: "" };

  const [registro, setRegistro] = useState(initRegistro);

  useEffect(() => {
    if (!loading && !error) {
      setDatos(data);
    }
  }, [data]);

  useEffect(() => {
    if (!loading2 && !error2) {
      setDatos2(data2);
    }
  }, [data2]);

  const handleInputCodigoChange = (e) => {
    setNotificacionAsistencia(false);

    setRegistro({ ...registro, codigo: e.target.value });
  };

  const handleInputKeyDown = (e) => {
    if (e.key === "Enter") {
      registrarAsistencia();
    }
  };

  const handleSelectChange = (e) => {
    setEntrada(e.target.value);
    setRegistro({ ...registro, entrada: e.target.value });
  };

  useEffect(() => {
    changeByHour();
  }, []);

  const changeByHour = () => {
    const date = new Date();
    if (date.getHours() >= 12) {
      setEntrada("false");
      setRegistro({ ...registro, entrada: "false" });
    } else {
      setEntrada("true");
      setRegistro({ ...registro, entrada: "true" });
    }
  };

  // const formatDate = (date) => {
  //   const year = date.getFullYear().toString().padStart(4, "0");
  //   const month = (date.getMonth() + 1).toString().padStart(2, "0");
  //   const day = date.getDate().toString().padStart(2, "0");
  //   const hours = date.getHours().toString().padStart(2, "0");
  //   const minutes = date.getMinutes().toString().padStart(2, "0");
  //   const seconds = date.getSeconds().toString().padStart(2, "0");
  //   return { fecha: `${year}-${month}-${day}`, hora: `${hours}:${minutes}:${seconds}` };
  // };

  const registrarAsistencia = async () => {
    setNotificacionAsistencia(false);

    const now = new Date();
    const fechaHora = formatDate(now);

    const registroFinal = {
      codigo: Number(registro.codigo),
      entrada: registro.entrada === "true",
      fecha: fechaHora.fecha,
      hora: fechaHora.hora,
    };

    setTipoNotificacionAsistencia("error");
    setNotificacionAsistenciaMensaje("");
    const isValid = /^\d{12}$/.test(registroFinal.codigo); // expresión regular para validar 12 dígitos
    if (!isValid) {
      setNotificacionAsistencia(true);
      setNotificacionAsistenciaMensaje("El valor ingresado no es válido. Debe contener exactamente 12 dígitos.");

      setRegistro(initRegistro);
      return;
    }

    let user = await getUser({ codigo: registroFinal.codigo });

    if (!user?.codigo) {
      setNotificacionAsistencia(true);
      setNotificacionAsistenciaMensaje("El usuario no existe");

      setRegistro(initRegistro);

      return;
    }

    const { hora } = registroFinal;
    const tipoRegistro = registroFinal.entrada ? "entrada" : "salida";

    const registroAnterior = datos.resultados.find((item) => item.codigo === registroFinal.codigo);
    const tipoRegistroAnterior = registroAnterior?.entrada ? "entrada" : "salida";

    const FindAttendance = datos.resultados.find((item) => item.codigo === registroFinal.codigo);

    if (!registroAnterior && !registroFinal.entrada) {
      setNotificacionAsistencia(true);
      setNotificacionAsistenciaMensaje("El usuario no ha registrado su entrada");

      setRegistro(initRegistro);
      return;
    }

    if (FindAttendance?.entrada && FindAttendance?.salida) {
      setNotificacionAsistencia(true);
      setNotificacionAsistenciaMensaje("El usuario solo puede registrar su asistencia una vez al día");

      setRegistro(initRegistro);

      return;
    }

    if (FindAttendance) {
      if (FindAttendance.entrada && registroFinal.entrada) {
        setNotificacionAsistencia(true);
        setNotificacionAsistenciaMensaje("El usuario ya ha registrado su entrada");
        setRegistro(initRegistro);

        return;
      } else if (FindAttendance.salida && !registroFinal.entrada) {
        setNotificacionAsistencia(true);
        setNotificacionAsistenciaMensaje("El usuario ya ha registrado su salida");
        setRegistro(initRegistro);
        return;
      }
    }

    servicio_registrarAsistencia(registroFinal);
    setTipoNotificacionAsistencia("success");
    setNotificacionAsistenciaMensaje("Asistencia registrada correctamente");
    setNotificacionAsistencia(true);
    if (registroAnterior) {
      const dbfiltrado = datos.resultados.filter((item) => item.codigo !== registroFinal.codigo);
      setDatos({
        resultados: [
          {
            ...registroFinal,
            nombre: user.nombre,
            [tipoRegistro]: hora,
            [tipoRegistroAnterior]: registroAnterior[tipoRegistroAnterior],
          },
          ...dbfiltrado,
        ],
      });
    } else {
      setDatos({
        resultados: [{ ...registroFinal, nombre: user.nombre, [tipoRegistro]: hora }, ...datos.resultados],
      });
    }

    setRegistro(initRegistro);
  };

  return (
    <>
      {/* <div className="title-page">Registrando asistencia</div>
      <Notification type={tipoNotificacionAsistencia} open={notificacionAsistencia} setOpen={setNotificacionAsistencia}>
        {notificacionAsistenciaMensaje}
      </Notification>
      <div className="input-container-principal">
        <Select options={options} value={entrada} onChange={handleSelectChange} />
        <Input
          type={"number"}
          placeholder={"Codigo usuario"}
          value={registro.codigo}
          onChange={handleInputCodigoChange}
          onKeyDown={handleInputKeyDown}
        />
        <Button
          variant="contained"
          color="success"
          onClick={registrarAsistencia}
          sx={{ padding: "18px 0", paddingX: 6 }}
        >
          Aceptar
        </Button>
      </div>

      <h2 className="title-2">Asistencias del día de hoy</h2> */}
      <div className="title-page">Asistencias del día de hoy</div>

      {loading && <CircularProgress />}
      {error && <Alert severity="error">Error al cargar los datos</Alert>}
      {data && <Table columns={columnas} data={datos?.resultados} component={false} />}

      <div className="title-page">Todas las Asistencias</div>
      {data2 && <Table columns={columnas} data={datos2?.resultados} component={false} />}
    </>
  );
};

export default Attendance;
