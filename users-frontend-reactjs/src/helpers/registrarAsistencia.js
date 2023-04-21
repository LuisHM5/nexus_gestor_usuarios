import { servicio_registrarAsistencia } from "../services/asistencia";
import { formatDate } from "./formatDate";

export function registrarAsistencia({ usuario }) {
  const now = new Date();
  const fechaHora = formatDate(now);
  console.log(usuario);
  const registroFinal = {
    codigo: Number(usuario.codigo),
    entrada: usuario.entrada,
    fecha: fechaHora.fecha,
    hora: fechaHora.hora,
  };
  console.log(registroFinal);

  servicio_registrarAsistencia(registroFinal);
}
