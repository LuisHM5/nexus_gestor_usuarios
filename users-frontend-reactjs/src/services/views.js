import { API_URL } from "../config/config";
import { useFetch } from "../hooks/useFetch";

export function views({ vista }) {
  const { loading, data, error, handleCancelRequest } = useFetch(`${API_URL}/vistas/${vista}`, "GET");

  return { loading, error, data, handleCancelRequest };
}

export function getReporteFinal({ listaUsuarios, fechaInicio, fechaFinal }) {
  return fetch(
    `${API_URL}/vistas?listaUsuarios=[${listaUsuarios}]&fechaInicio=${fechaInicio}&fechaFinal=${fechaFinal}`,
    {
      method: "GET",
    }
  )
    .then((res) => res.json())
    .catch((err) => err);
}
