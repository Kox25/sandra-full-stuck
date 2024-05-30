<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class MeetingEntry extends Model
{
    use HasFactory;

    protected $fillable = [
        'patient_id' , 
        'doctor_id' , 
        'name' , 
        'url' , 
        'status' ,
        'random_user'
    ]; 

    protected $table = 'meeting_entries';
    
    public function patient():BelongsTo
    {
        return $this->belongsTo(Patient::class , 'patient_id'); 
    }
    
    public function doctor():BelongsTo
    {
        return $this->belongsTo(Doctor::class , 'doctor_id'); 
    }
}
