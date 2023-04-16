import { API_URL } from "../config/config";

export default function register({ nombre, usuario, correo, contraseña, admin }) {
  return fetch(`${API_URL}/usuarios`, {
    method: "POST",
    body: JSON.stringify({ nombre, usuario, correo, contraseña, admin }),
    headers: { "Content-Type": "application/json" },
  })
    .then((res) => res.json())
    .catch((err) => err);
}
