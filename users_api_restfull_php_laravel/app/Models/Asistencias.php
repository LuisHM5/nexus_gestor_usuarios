<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Asistencias extends Model
{
    protected $table = 'asistencias';
    protected $fillable = [
        'codigo',
        'entrada',
        'fecha',
        'hora',
    ];

    public $timestamps = false;
    use HasFactory;
}