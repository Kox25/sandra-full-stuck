<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Relations\HasOne; 
use Illuminate\Notifications\Notifiable;
use Laravel\Sanctum\HasApiTokens;
use Illuminate\Contracts\Auth\Authenticatable;
use Illuminate\Auth\Notifications\VerifyEmail;
use Illuminate\Contracts\Auth\MustVerifyEmail as MustVerifyEmailContract;
use Illuminate\Database\Eloquent\Relations\BelongsTo;



class Doctor extends Model implements Authenticatable
{
    use HasFactory , HasApiTokens ,Notifiable;

    
    protected $fillable = [
        'user_name',
        'email',
        'password',
        'points',
        'address',
        'about',
        'university',
        'phone',
        'available',
        'gender',
        'speciality',
        'email_verified_at',
        'verification_token'
    ];

    protected $guard = "doctors" ; 

    public function Patients(): HasMany
    {
        return $this->hasMany(Patient::class, 'doctor_id');
    }
    public function Category():BelongsTo
    {
        return $this->belongsTo(Category::class, 'speciality');
    }
    public function Secertarie():HasOne
    {
        return $this->hasOne(Secertarie::class , 'doctor_id'); 
    }
    
    //this is the relationship between the doctors and the chats tables 
    public function chats(): HasMany
    {
        return $this->hasMany(Chat::class, 'doctor_id');
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
    
    public function Articles():HasMany{
        return $this->hasMany(Article::class,'doctorID');

    }
    
    public function reviewedArticles()
    {
        return $this->belongsToMany(Review::class, 'reviews','doctorID','articleID');
    }
}