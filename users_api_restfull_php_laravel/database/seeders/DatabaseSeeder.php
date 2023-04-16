<?php

namespace Database\Seeders;

// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     *
     * @return void
     */
    public function run()
    {
        foreach ($this->getUsuarios() as $usuario) {
            $codigo = $this->generarCodigo();
            $usuarioData = [
                'nombre' => $usuario['nombre'],
                'usuario' => $usuario['usuario'],
                'correo' => $usuario['correo'],
                'contraseña' => Hash::make($usuario['contraseña']),
                'admin' => $usuario['admin'],
                'codigo' => $codigo,
            ];
            try {
                DB::table('usuarios')->insert($usuarioData);
            } catch (\Throwable $th) {
                echo "usuarios ya insertados";
                return;
            }
        }
    }

    private function getUsuarios()
    {
        return [
            [
                'nombre' => 'Luis Hernández Macías',
                'usuario' => 'admin',
                'correo' => 'admin@gmail.com',
                'contraseña' => 'adminadmin',
                'admin' => true,
            ],
            [
                'nombre' => 'Leonel Gonzalez Erives',
                'usuario' => 'sacredblades',
                'correo' => 'blades@gmail.com',
                'contraseña' => '12345678',
                'admin' => true,
            ],
            [
                'nombre' => 'Alejandro Ramirez',
                'usuario' => 'test',
                'correo' => 'test@gmail.com',
                'contraseña' => 'adminadmin',
                'admin' => false,
            ],
            [
                'nombre' => 'Alejandro Ramirez 2',
                'usuario' => 'test2',
                'correo' => 'test2@gmail.com',
                'contraseña' => 'adminadmin',
                'admin' => false,
            ],
        ];
    }

    private function generarCodigo()
    {
        return DB::select('SELECT generar_codigo() as codigo')[0]->codigo;
    }
}