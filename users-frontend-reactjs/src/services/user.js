import { API_URL } from "../config/config";

export function getUser({ codigo }) {
  return fetch(`${API_URL}/usuarios/${codigo}`, { method: "GET" })
    .then((res) => res.json())
    .catch((err) => err);
}
export function getAllUsers() {
  return fetch(`${API_URL}/usuarios`, { method: "GET" })
    .then((res) => res.json())
    .catch((err) => err);
}
