<?php

namespace App\Http\Controllers;

use App\Models\Usuario;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;

class UsuarioController extends Controller
{
    public function obtenerUsuarios(Request $request)
    {
        $request->codigo;
        if ($request->codigo) {
            $usuarios = Usuario::where("codigo", $request->codigo)->get();
            return response()->json($usuarios);
        }

        $usuarios = Usuario::all();

        return response()->json($usuarios);
    }
    public function obtenerUsuario(Request $request, $codigo)
    {
        $usuario = Usuario::where("codigo", $codigo)->first();

        return response()->json($usuario);
    }

    public function crearUsuario(Request $request)
    {
        $usuario = new Usuario();
        $usuario->codigo = DB::select('SELECT generar_codigo() as codigo')[0]->codigo;
        $usuario->nombre = $request->nombre;
        $usuario->usuario = $request->usuario;
        $usuario->correo = $request->correo;

        if ($request->nombre == null || $request->nombre == "") {
            return response()->json(['message' => 'El nombre no puede estar vacio']);
        }
        if ($request->usuario == null || $request->usuario == "") {
            return response()->json(['message' => 'El usuario no puede estar vacio']);
        }
        if ($request->correo == null || $request->correo == "") {
            return response()->json(['message' => 'El correo no puede estar vacio']);
        }

        if (strlen($request->input('contraseña')) < 8) {
            return response()->json(['message' => 'La contraseña no puede estar vacia']);
        }
        $busqueda = null;
        $busqueda = Usuario::where("usuario", $request->usuario)->first();

        if ($busqueda) {
            return response()->json(['message' => 'El usuario ya existe']);
        }
        $busqueda = Usuario::where("correo", $request->correo)->first();

        if ($busqueda) {
            return response()->json(['message' => 'El correo ya existe']);
        }

        $hashed = Hash::make($request->contraseña);
        $usuario->contraseña = $hashed;

        $usuario->admin = $request->admin;
        $usuario->save();

        return response()->json($usuario);
    }

    public function eliminarUsuario(Request $request, $codigo)
    {
        $usuario = Usuario::where("codigo", $codigo)->first();

        if (!$usuario) {
            abort(404);
        }

        $usuario::where("codigo", $codigo)->delete();

        return response()->json(['message' => 'El usuario ha sido eliminado']);
    }

    public function actualizarUsuario(Request $request, $codigo)
    {
        $usuario = Usuario::where("codigo", $codigo)->first();

        if (!$usuario) {
            abort(404);
        }

        $usuario::where("codigo", $codigo)->update($request->all());

        return response()->json($usuario);

    }

}