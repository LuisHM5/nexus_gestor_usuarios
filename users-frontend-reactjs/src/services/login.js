import { API_URL } from "../config/config";

export default function serviciologin({ usuario, correo, contraseña }) {
  return fetch(`${API_URL}/login`, {
    method: "POST",
    body: JSON.stringify({ usuario, correo, contraseña }),
    headers: { "Content-Type": "application/json" },
  })
    .then((res) => res.json())
    .catch((err) => err);
}
