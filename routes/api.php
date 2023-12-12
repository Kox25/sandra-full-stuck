<?php


use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\CategoriesController;
use App\Http\Controllers\ArticlesController;
use App\Http\Controllers\SettingsController;
use App\Http\Controllers\PendingArticlesController;
use App\Http\Controllers\AdminController;
use App\Http\Controllers\ChatController;
use App\Http\Controllers\DoctorController;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\DislikeController;
use App\Http\Controllers\LikeController;

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


//this section for auth

Route::post('/signup/user' , [AuthController::class , 'signup']); 
Route::post('/signup/doctor',[AuthController::class , 'signupDoctor']);


//this api for verify doctor email before login 
Route::get('/verify-email/{token}', 
[AuthController::class, 'verifyEmail'])
->name('verify.email');
Route::post('/login',[AuthController::class,'login']);

//Admin api 
//for me 
Route::post('firstAdmin' , [AdminController::class , 'AddFirstAdmin']);
//for sireen  
Route::post('secondAdmin' , [AdminController::class , 'AddSecondAdmin']); 


//this section for the ChatController 
//first function openChat 
//it's work
Route::post('/open-chat/{patient_id}/{doctor_id}' , [ChatController::class , 'openChat']);
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
Route::get('/get/doctors' , [DoctorController::class ,'getAllDoctor']);


//this section for the LikeController 
Route::post('/best/doctor' , [LikeController::class ,'BestThreeDoctor']);
// it's work
Route::post('/show/likes/{doctor_id}', [LikeController::class, 'showLikes']);
// it's work 
Route::post('/add/like/{doctor_id}/{patient_id}', [LikeController::class ,'AddLike']);


//this function for the DisLike Controller 
//it's work 
Route::post('/add/dislike/{doctor_id}/{patient_id}' , [DislikeController::class , 'AddDislike']);
//it's work 
Route::post('/show/dislike/{doctor_id}', [DislikeController::class ,'showDislikes']);


//articles section
//done
Route::get('Categories',[CategoriesController::class,'getAll']);
//done
Route::get('Categories/insert',[CategoriesController::class,'insert']);


//done
Route::post('Articles',[ArticlesController::class,'index']);
//done
Route::post('Articles/cat/{catID}',[ArticlesController::class,'showCategory']);
//done
Route::post('Articles/upload',[ArticlesController::class,'store']);
//done
Route::post('Articles/content/{ArticleID}',[ArticlesController::class,'show']);
//done
Route::post('Articles/update/{ArticleID}',[ArticlesController::class,'update']);
//done
Route::post('Articles/update/content/{ArticleID}',[ArticlesController::class,'updateContent']);
//done
Route::post('/Articles/{ArticleID}/like',[ArticlesController::class,'like']);
//done
Route::post('/Articles/{ArticleID}/dislike',[ArticlesController::class,'dislike'] );
//done
Route::post('/Articles/cat/{ArticleID}/report',[ArticlesController::class,'report']);
//done
Route::post('Articles/delete/{ArticleID}',[ArticlesController::class,'destroy']);


//pending articles section
Route::post('Articles/pending',[PendingArticlesController::class,'showPending']);
Route::post('Articles/pending/{ArticleID}',[PendingArticlesController::class,'pendingContent']);
Route::post('Articles/pending/{ArticleID}/accept',[PendingArticlesController::class,'articleAccept']);
Route::post('Articles/pending/{ArticleID}/reject',[PendingArticlesController::class,'articleReject']);
Route::post('Articles/myPending',[PendingArticlesController::class,'showDoctorArticles']);


//settings section
//done
Route::post('Settings/delete',[SettingsController::class,'destroy']);
//done
Route::post('Settings/ChangePassword',[SettingsController::class,'ChangePassword']);
//done
Route::post('Settings/info',[SettingsController::class,'show']);
Route::post('Settings/AccountInfo',[SettingsController::class,'updateAccount']);