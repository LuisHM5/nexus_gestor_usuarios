import { useState } from "react";
import {
  Avatar,
  Button,
  TextField,
  Box,
  Typography,
  Container,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
} from "@mui/material";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import register from "../services/register";
import Notification from "../components/Notification";
import "./Styles/customstyles/InputText.css";
const theme = createTheme();

export default function Register() {
  const initformRegister = { nombre: "", usuario: "", correo: "", contraseña: "", admin: "" };
  const [formRegister, setformRegister] = useState(initformRegister);

  const [notificacionRegistro, setNotificacionRegistro] = useState(false);
  const [tipoNotificacionRegistro, setTipoNotificacionRegistro] = useState("error");
  const [notificacionRegistroMensaje, setNotificacionRegistroMensaje] = useState("");
  const handleSubmit = (event) => {
    event.preventDefault();

    register(formRegister).then((res) => {
      if (res?.message) {
        setNotificacionRegistro(true);
        setTipoNotificacionRegistro("error");
        setNotificacionRegistroMensaje(res.message);
      } else {
        setNotificacionRegistro(true);
        setTipoNotificacionRegistro("success");
        setNotificacionRegistroMensaje("Usuario creado correctamente");
        setformRegister(initformRegister);
      }
    });
  };
  const handleChangeForm = (event) => {
    setformRegister({
      ...formRegister,
      [event.target.name]: event.target.value,
    });
  };
  const handleRolChange = (event) => {
    setformRegister({
      ...formRegister,
      admin: event.target.value,
    });
  };
  return (
    <ThemeProvider theme={theme}>
      <div className="title-page">Registro</div>
      <Notification type={tipoNotificacionRegistro} open={notificacionRegistro} setOpen={setNotificacionRegistro}>
        {notificacionRegistroMensaje}
      </Notification>
      <Container component="main" maxWidth="xs">
        <Box
          sx={{
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography className="title-2" component="h1" variant="h5">
            Registrar usuario
          </Typography>
          <Box component="form" onSubmit={handleSubmit} sx={{ mt: 1 }}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="nombre"
              className="input-dark"
              label="Nombre completo"
              name="nombre"
              autoComplete="nombre"
              autoFocus
              inputProps={{ minLength: 4, maxLength: 40 }}
              value={formRegister.nombre}
              onChange={handleChangeForm}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              id="usuario"
              className="input-dark"
              label="Usuario"
              name="usuario"
              autoComplete="usuario"
              value={formRegister.usuario}
              inputProps={{ minLength: 4, maxLength: 40 }}
              onChange={handleChangeForm}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              id="correo"
              className="input-dark"
              label="Correo electrónico"
              name="correo"
              type="email"
              autoComplete="correo"
              value={formRegister.correo}
              onChange={handleChangeForm}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="contraseña"
              label="Contraseña"
              type="password"
              id="password"
              className="input-dark"
              autoComplete="current-password"
              inputProps={{ minLength: 8, maxLength: 40 }}
              value={formRegister.contraseña}
              onChange={handleChangeForm}
            />
            <FormControl fullWidth sx={{ mt: 3 }}>
              <InputLabel id="rol-select-label">Rol</InputLabel>
              <Select
                labelId="rol-select-label"
                id="rol-select"
                label="Rol"
                className="input-dark"
                value={formRegister.admin}
                onChange={handleRolChange}
                required
              >
                <MenuItem value={false}>Usuario</MenuItem>
                <MenuItem value={true}>Admin</MenuItem>
              </Select>
            </FormControl>
            <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>
              Registrar
            </Button>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}
