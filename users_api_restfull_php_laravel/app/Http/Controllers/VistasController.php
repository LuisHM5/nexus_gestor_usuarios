<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

use Illuminate\Support\Facades\DB;

class VistasController extends Controller
{
    public function obtenerVista(Request $request, $vista)
    {

        $consulta = "SELECT * FROM " . $vista;

        $resultados = DB::select($consulta);

        return response()->json(["resultados" => $resultados]);
    }

    public function obtenerConsulta(Request $request)
    {
        $listaUsuarios = $request->input('listaUsuarios');
        $fechaInicio = $request->input('fechaInicio');
        $fechaFinal = $request->input('fechaFinal');
        $listaUsuarios = json_decode($listaUsuarios);

        if ($request->has('listaUsuarios') && $request->has('fechaInicio') && $request->has('fechaFinal')) {

            $consulta = DB::table("v_entrada_salida")->whereIn("codigo", $listaUsuarios)->whereBetween("fecha", [$fechaInicio, $fechaFinal])->get();

            return response()->json($consulta);
        }
    }
}