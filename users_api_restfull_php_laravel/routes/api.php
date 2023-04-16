<?php

use App\Http\Controllers\AutentificacionController;
use App\Http\Controllers\VistasController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\UsuarioController;
use App\Http\Controllers\AsistenciasController;


/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});

Route::get('/usuarios', [UsuarioController::class, 'obtenerUsuarios']);

Route::get('/usuarios/{codigo}', [UsuarioController::class, 'obtenerUsuario']);

Route::post('/usuarios', [UsuarioController::class, 'crearUsuario']);

Route::delete('/usuarios/{codigo}', [UsuarioController::class, 'eliminarUsuario']);

Route::put('/usuarios/{codigo}/actualizar', [UsuarioController::class, 'actualizarUsuario']);

Route::get('/asistencias', [AsistenciasController::class, 'obtenerAsistencias']);

Route::get('/asistencias/{codigo}', [AsistenciasController::class, 'obtenerAsistencia']);

Route::post('/asistencias', [AsistenciasController::class, 'agregarAsistencia']);

Route::get('/vistas/{vista}', [VistasController::class, 'obtenerVista']);

Route::get('/vistas', [VistasController::class, 'obtenerConsulta']);

Route::post('/login', [AutentificacionController::class, 'login']);
