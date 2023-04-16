<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Usuario extends Model
{
    protected $table = 'usuarios';
    public function asistencias()
    {
        return $this->hasMany(Asistencias::class);
    }
    protected $fillable = [
        'codigo',
        'nombre',
        'correo',
        'contraseña',
        'admin',
    ];
    protected $primaryKey = 'codigo';
    public $incrementing = false;
    public $timestamps = false;


    use HasFactory;
}