<?php

namespace App\Http\Controllers;

use App\Models\Asistencias;
use Illuminate\Http\Request;

class AsistenciasController extends Controller
{
    public function obtenerAsistencias(Request $request)
    {
        if($request->fechaInicio && $request->fechaFinal && $request->codigosUsuarios) {
            $asistencias = Asistencias::whereIn('codigo_usuario', $request->codigosUsuario)->whereBetween("fecha", [$request->fechaInicio, $request->fechaFinal])->get();
            return response()->json($asistencias);
        }

        if($request->fechaInicio && $request->fechaFinal) {
            $asistencias = Asistencias::whereBetween("fecha", [$request->fechaInicio, $request->fechaFinal])->get();
            return response()->json($asistencias);
        }

        if ($request->codigo) {
            $asistencias = Asistencias::where("codigo", $request->codigo)->get();
            return response()->json($asistencias);
        }

        $asistencias = Asistencias::all();

        return response()->json($asistencias);
    }

    public function obtenerAsistencia(Request $request, $codigo)
    {

        if($request->fechaInicio && $request->fechaFinal) {
            $asistencias = Asistencias::where("codigo", $codigo)->whereBetween("fecha", [$request->fechaInicio, $request->fechaFinal])->get();
            return response()->json($asistencias);
        }

        $asistencias = Asistencias::where("codigo", $codigo)->get();

        return response()->json($asistencias);
    }

    public function agregarAsistencia(Request $request)
    {
        $asistencias = new Asistencias();
        $asistencias->codigo = $request->codigo;
        $asistencias->entrada = $request->entrada;
        $asistencias->fecha = $request->fecha;
        $asistencias->hora = $request->hora;
        $asistencias->save();

        return response()->json($asistencias);
    }

}
