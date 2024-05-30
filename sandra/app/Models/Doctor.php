<?php

namespace App\Models;

use Illuminate\Contracts\Auth\Authenticatable;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Relations\HasOne;
use Illuminate\Notifications\Notifiable;
use Laravel\Sanctum\HasApiTokens;
use Illuminate\Auth\Notifications\VerifyEmail;
use Illuminate\Contracts\Auth\MustVerifyEmail as MustVerifyEmailContract;


class Doctor extends Model implements Authenticatable, MustVerifyEmailContract
{
    use HasFactory, HasApiTokens, Notifiable;


    protected $table = "doctors";
    protected $fillable = [
        'user_name',
        'email',
        'password',
    ];

    protected $appends = ['Document', 'isVerfiy'];

    protected $guard = "doctors";

    public function Patients(): HasMany
    {
        return $this->hasMany(Patient::class, 'doctor_id');
    }

    public function Secertarie(): HasOne
    {
        return $this->hasOne(Secertarie::class, 'doctor_id');
    }

    //this is the relationship between the doctors and the chats tables 
    public function chats(): HasMany
    {
        return $this->hasMany(Chat::class, 'doctor_id');
    }

    public function post(): HasMany
    {
        return $this->hasMany(Post::class, 'doctor_id');
    }

    public function posts()
    {
        return $this->hasMany(Post::class);
    }

    public function Usermeetings(): HasMany
    {
        return $this->hasMany(Usermeeting::class, 'doctor_id');
    }

    public function getAuthIdentifierName()
    {
        return 'id'; // Replace with the name of the primary key column in the patients table
    }

    public function getAuthIdentifier()
    {
        return $this->getKey();
    }

    public function getAuthPassword()
    {
        return $this->password;
    }

    public function getRememberToken()
    {
        return $this->remember_token;
    }

    public function setRememberToken($value)
    {
        $this->remember_token = $value;
    }

    public function getRememberTokenName()
    {
        return 'remember_token';
    }

    public function DoctorLikes(): HasMany
    {
        return $this->hasMany(Like::class, 'doctor_id');
    }


    // this section for verfiy by email 
    public function hasVerifiedEmail()
    {
        return $this->email_verified_at !== null;
    }

    public function markEmailAsVerified()
    {
        $this->email_verified_at = now();
        $this->save();
    }

    public function sendEmailVerificationNotification()
    {
        $this->notify(new VerifyEmail);
    }

    public function getEmailForVerification()
    {
        return $this->email;
    }


    public function file()
    {
        return $this->hasOne(DoctorVerfiy::class);
    }

    public function likes()
    {
        return $this->hasMany(Like::class);
    }

    public function getDocumentAttribute()
    {
        $document = DoctorVerfiy::select('filename')
            ->where('doctor_id', $this->id)
            ->first();

        if ($document) {
            $url = stripslashes(asset('storage/app/uploads/' . $document->filename));
            return $url;
        }

        return null;
    }


    public function getIsVerfiyAttribute()
    {
        $doctorVerfiy = DoctorVerfiy::where('doctor_id', $this->id)->first();

        if ($doctorVerfiy) {
            return $doctorVerfiy->isVerfiy;
        }

        return false;
    }

    

}
