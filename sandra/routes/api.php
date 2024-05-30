<?php

use App\Http\Controllers\AdminController;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\ChatController;
use App\Http\Controllers\DislikeController;
use App\Http\Controllers\DlikeController;
use App\Http\Controllers\DoctorController;
use App\Http\Controllers\LikeController;
use App\Http\Controllers\PlikeController;
use App\Http\Controllers\PostController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\DoctorVerfiyController; 

 
Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});




//this section for auth
//it's work 
Route::post('/signup/user' , [AuthController::class , 'signup']); 
//it's work 
Route::post('/signup/doctor',[AuthController::class , 'signupDoctor']);
//this api for verify doctor email before login 
Route::get('/verify-email/{token}', 
[AuthController::class, 'verifyEmail'])
->name('verify.email');
//this api for verfiy patient email before login 
Route::get('/verify-email-patient/{token}', 
[AuthController::class, 'verifyEmailUser'])
->name('verify.email.user');
//it's work 
Route::post('/login',[AuthController::class , 'login']); 
//it's work 
Route::post('/logout/{type}/{id}', [AuthController::class , 'logout']); 


//this section for the admin 
//Admin api 
//for me 
Route::post('firstAdmin' , [AdminController::class , 'AddFirstAdmin']);
//for sireen  
Route::post('secondAdmin' , [AdminController::class , 'AddSecondAdmin']); 
//for accept or reject doctors depend on them documents 
Route::post('/AcceptOrReject/{doctorId}' , [AdminController::class , 'acceptOrRejectDoctor']); 
//for show all doctor 
Route::get('/show/doctor' , [AdminController::class , 'getAllDoctors']);
//for delete doctor 
Route::delete('/delete/doctor/{doctorId}', [AdminController::class, 'deleteDoctor']);
//for show admin information 
Route::post('/show/admin/info/{id}' , [AdminController::class , 'getAdminById']); 
//for get document and doctor info 
Route::get('/admin/file-info', [AdminController::class, 'getFileAndDoctorInfo']);
//for get images 
Route::get('/get/images' , [AdminController::class , 'getImages']); 




//this section for the ChatController 
//first function openChat 
//it's work
Route::post('/open-chat/{user_type}/{user_id}/{other_user_id}' , [ChatController::class , 'openChat']);
//second function sendMessage
//it's work  
Route::post('/send-message/{sender_id}/{receiver_id}', [ChatController::class, 'sendMessage']);
//third function showMessages
//it's work
Route::post('/show-messages/{id}',[ChatController::class , 'showMessages']); 
//forth function showChat 
//it's work 
Route::post('/show-chat/{id}' , [ChatController::class , 'showChat']);  
//fifth function GetChatById
//it's work 
Route::post('/get-chat/{id}' , [ChatController::class , 'GetChatByID']); 
//sixth function deleteChat
//it's work 
Route::post('/delete-chat/{id}/{user_id}' , [ChatController::class , 'deleteChat']); 





//this section for doctor controller
// it's work
Route::post('/add/secertarie',[DoctorController::class , 'addSecertarie']); 
// it's work 
Route::get('/get/doctors' , [DoctorController::class ,'getAllDoctor']);








//this section for the Posts 
// on the test 
Route::post('/posts', [PostController::class, 'store']);
//on the test 
Route::get('/posts/{id}', [PostController::class, 'show']); 
//on the test 
Route::get('/get/posts' , [PostController::class, 'getAllPosts']); 
//on the test 
Route::post('/add/post/like/{post_id}/{patient_id}' , [PlikeController::class , 'addPostLike']); 
//on the test 
Route::get('/get/post/like/{post_id}' , [PlikeController::class , 'showPostLikes']);  
//on the test 
Route::get('get/suggestion/post/{id}' , [PostController::class , 'suggestionPost']); 
//on the test 
Route::get('/delete/post/{id}', [PostController::class , 'deletePost']);
//on the test 
Route::get('doctor/post/{id}' , [PostController::class , 'getPostSharedByDoctor']); 
//on the test 
Route::post('/add/post/dlike/{post_id}/{patient_id}' , [DlikeController::class , 'addPostDlike']); 
//on the test 
Route::get('/get/post/dlike/{post_id}' , [DlikeController::class , 'showPostDlikes']); 
//on the test 
Route::get('/get/post/by/category/{category}' , [PostController::class , 'getPostsBySameCategory']); 



//this section for the LikeController 
Route::post('/best/doctor' , [LikeController::class ,'BestThreeDoctor']);
// it's work
Route::post('/show/likes/{doctor_id}', [LikeController::class, 'showLikes']);
// it's work 
Route::post('/add/like/{doctor_id}/{patient_id}', [LikeController::class ,'AddLike']);






//this functions for the DisLike Controller 
//it's work 
Route::post('/add/dislike/{doctor_id}/{patient_id}' , [DislikeController::class , 'AddDislike']);
//it's work 
Route::post('/show/dislike/{doctor_id}', [DislikeController::class ,'showDislikes']);





//this funcitons for Doctor verfiy controller 
Route::post('/verfiy/{doctor_id}' , [DoctorVerfiyController::class , 'uploadFile']); 


//this section for DoctorController 
Route::post('/isVerfiy/{id}', [DoctorController::class , 'isVerfiyDoctor']);