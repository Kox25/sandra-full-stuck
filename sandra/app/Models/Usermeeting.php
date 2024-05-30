<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
class Usermeeting extends Model
{
    use HasFactory;

    protected $fillable = [
         'patient_id' ,
         'doctor_id' , 
         'url' ,
         'app_id' , 
         'channel' , 
         'appCertificate' , 
         'uid' ,
        ];
    protected $table = 'usermeetings';
    
    public function patients (): BelongsTo
    {
        return $this->belongsTo(Patient::class , 'patient_id'); 
    }

    public function doctors ():BelongsTo
    {
        return $this->belongsTo(Doctor::class , 'doctor_id'); 
    }

}
