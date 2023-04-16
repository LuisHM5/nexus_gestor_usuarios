import { API_URL } from "../config/config";
import { helpHttp } from "../helpers/helpHttp";
export const servicio_registrarAsistencia = ({ codigo, entrada, fecha, hora }) => {
  const api = helpHttp();

  api
    .post(`${API_URL}/asistencias`, {
      body: {
        codigo,
        entrada,
        fecha,
        hora,
      },
      headers: { "content-type": "application/json" },
    })
    .then((res) => {
      if (!res.ok) throw { status: res.status, statusText: res.statusText };
      return res.json();
    });
};
