import Table from "../components/table/Table";
import { useEffect, useState } from "react";
import { getAllUsers } from "../services/user";
import { Alert, CircularProgress } from "@mui/material";
import Input from "../components/input/Input";
const columnas = ["Codigo", "Nombre", "Usuario", "Correo", "Rol"];

const Home = () => {
  const [usuarios, setUsuarios] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [searcher, setSearcher] = useState("");

  useEffect(() => {
    getAllUsers()
      .then((res) => {
        if (res?.length > 0) {
          const usuariosConRol = res.map((usuario) => {
            const rol = usuario.admin === 1 ? "admin" : "usuario";
            return {
              ...usuario,
              rol: rol,
            };
          });

          setUsuarios(usuariosConRol);
        } else {
          setError(true);
        }
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);
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
    <div>
      <div className="title-page">Inicio</div>
      <h2 className="title-2">Lista de usuarios</h2>
      <div className="container-input-search">
        <Input type={"text"} placeholder={"Buscar..."} value={searcher} onChange={(e) => setSearcher(e.target.value)} />
      </div>

      {loading && <CircularProgress />}
      {error && <Alert severity="error">Error al cargar los datos</Alert>}

      {!loading && <Table columns={columnas} data={results} />}
    </div>
  );
};

export default Home;
