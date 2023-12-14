<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class DoctorVerfiy extends Model
{
    use HasFactory;

    protected $fillable = ['filename', 'original_filename' , 'isVerfiy'];

    public function doctor()
    {
        return $this->belongsTo(Doctor::class);
    }
}
