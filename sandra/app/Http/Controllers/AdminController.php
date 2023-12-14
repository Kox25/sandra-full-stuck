<?php

namespace App\Http\Controllers;

use App\Models\Admin;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use App\Models\DoctorVerfiy;
use App\Models\Doctor;

class AdminController extends Controller
{
    public function AddFirstAdmin()
    {
        $Admin = new Admin();
        $Admin->id = 1;
        $Admin->user_name = 'khaled';
        $Admin->email = 'klora756@gmail.com';
        $Admin->password = Hash::make('klora1234');
        $Admin->save();
        return $Admin;
    }
    public function AddSecondAdmin()
    {
        $Admin = new Admin();
        $Admin->id = 2;
        $Admin->user_name = 'Sireen';
        $Admin->email = 'siro1234@gmail.com';
        $Admin->password = Hash::make('siro1234');
        $Admin->save();
        return $Admin;
    }


    public function acceptOrRejectDoctor(Request $request, $doctorId)
    {
        $request->validate([
            'action' => 'required|string|in:accept,reject',
        ]);
        $action = $request->input('action');
        $fileModel = DoctorVerfiy::where('doctor_id', $doctorId)->first();
        if (!$fileModel) {
            return response()->json(['message' => 'File not found for the specified doctor'], 404);
        }
        if ($action === 'accept') {
            $fileModel->isVerfiy = 1;
        } else {
            $fileModel->isVerfiy = 0;
        }
        $fileModel->save();
        return response()->json([
            'message' => 'Doctor verification status updated successfully'
            , 'DocumentInfo' => $fileModel
        ]);
    }

    public function getAllDoctors()
    {
        $doctors = Doctor::all();

        return response()->json(['doctors' => $doctors]);
    }

    public function deleteDoctor($doctorId)
    {
        $doctor = Doctor::find($doctorId);

        if (!$doctor) {
            return response()->json(['message' => 'Doctor not found'], 404);
        }

        // Delete associated likes first 
        $doctor->likes()->delete();

        //then i have to delete the doctor
        $doctor->delete();

        return response()->json(['message' => 'Doctor deleted successfully']);
    }


// this function will updated from sireen 

    //     public function calculateArticlePercentage($articleId)
// {
//     $article = Article::find($articleId);

    //     if (!$article) {
//         return response()->json(['message' => 'Article not found'], 404);
//     }

    //     $likesCount = $article->likes()->count();
//     $dislikesCount = $article->dislikes()->count();

    //     $totalVotes = $likesCount + $dislikesCount;

    //     if ($totalVotes === 0) {
//         return response()->json(['message' => 'No votes found for the article'], 200);
//     }

    //     $likePercentage = ($likesCount / $totalVotes) * 100;
//     $dislikePercentage = ($dislikesCount / $totalVotes) * 100;

    //     return response()->json([
//         'like_percentage' => $likePercentage,
//         'dislike_percentage' => $dislikePercentage,
//     ]);
// }




}
