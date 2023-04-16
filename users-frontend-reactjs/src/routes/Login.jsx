import { Avatar, Button, TextField, Typography, Container, Box } from "@mui/material";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { Navigate } from "react-router-dom";
import serviciologin from "../services/login";
import { useState } from "react";
import Notification from "../components/Notification";
const theme = createTheme();

export default function Login({ login, usuario }) {
  const [navigateToInicio, setNavigateToInicio] = useState(false);
  const initFormLogin = { usuario: "", contraseña: "" };
  const [formLogin, setFormLogin] = useState(initFormLogin);

  const [notificacionLogin, setNotificacionLogin] = useState(false);
  const [tipoNotificacionLogin, setTipoNotificacionLogin] = useState("error");
  const [notificacionLoginMensaje, setNotificacionLoginMensaje] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();

    if (!formLogin.usuario || !formLogin.contraseña) return;

    const regexCorreo = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

    let envio = { usuario: formLogin.usuario, contraseña: formLogin.contraseña };

    if (regexCorreo.test(formLogin.usuario)) {
      envio = { correo: formLogin.usuario, contraseña: formLogin.contraseña };
    }
    let usuarioLogeado = null;
    serviciologin(envio).then((res) => {
      if (res?.message) {
        setNotificacionLogin(true);
        setTipoNotificacionLogin("error");
        setNotificacionLoginMensaje(res.message);
      } else {
        setFormLogin(initFormLogin);
        usuarioLogeado = login(res);
      }
    });

    if (usuarioLogeado) {
      setNavigateToInicio(true);
    }
  };
  const handleChangeForm = (event) => {
    setFormLogin({
      ...formLogin,
      [event.target.name]: event.target.value,
    });
  };

  if (usuario) {
    return <Navigate to={"/portal/inicio"} replace />;
  }

  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
        <Notification type={tipoNotificacionLogin} open={notificacionLogin} setOpen={setNotificacionLogin}>
          {notificacionLoginMensaje}
        </Notification>
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
          <Typography component="h1" variant="h5">
            Iniciar Sesión
          </Typography>
          <Box component="form" onSubmit={handleSubmit} sx={{ mt: 3 }}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="username"
              label="Usuario o correo electrónico"
              name="usuario"
              autoComplete="username"
              value={formLogin.usuario}
              onChange={handleChangeForm}
              autoFocus
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="contraseña"
              label="Contraseña"
              type="password"
              inputProps={{ minLength: 8, maxLength: 40 }}
              id="password"
              value={formLogin.contraseña}
              onChange={handleChangeForm}
              autoComplete="current-password"
            />
            <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>
              Iniciar Sesión
            </Button>
            {navigateToInicio && <Navigate to={"/portal/inicio"} replace />}
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}
