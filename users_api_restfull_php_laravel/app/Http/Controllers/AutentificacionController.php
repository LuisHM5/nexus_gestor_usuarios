<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Usuario;
use Illuminate\Support\Facades\Hash;

class AutentificacionController extends Controller
{
    public function login(Request $request)
    {

        $usuario = $request->input('usuario');
        $contraseña = $request->input('contraseña');
        $correo = $request->input('correo');

        if (!$usuario && !$correo) {
            return response()->json(['message' => 'No se ha especificado un usuario o correo'], 400);
        }

        $usuarioBusqueda = null;

        if ($usuario) {
            $usuarioBusqueda = Usuario::where('usuario', $usuario)->first();
        } else if ($correo) {
            $usuarioBusqueda = Usuario::where('correo', $correo)->first();
        }

        if (!$usuarioBusqueda) {
            return response()->json(['message' => 'Usuario o correo incorrecto'], 404);
        }

        if (!Hash::check($contraseña, $usuarioBusqueda->contraseña)) {
            return response()->json(['message' => 'La contraseña proporcionada no es correcta'], 400);
        }

        return response()->json($usuarioBusqueda);
    }
}