<?php

namespace App\Http\Controllers;

use App\Models\DoctorVerfiy;
use App\Models\Doctor;
use Illuminate\Http\Request;

class DoctorVerfiyController extends Controller
{

    //this function for verfiy the doctor by his or her document or photo it's work
    // in the front i have to send the doctor id with the document or photp 
    public function uploadFile(Request $request, $doctorId)
    {
        // Validate the uploaded file
        $request->validate([
            'file' => 'required|file|mimes:jpeg,jpg,png,pdf|max:2048', // Adjust the allowed file types and maximum size as needed
        ]);

        // Get the file from the request
        $file = $request->file('file');

        // Generate a unique file name
        $fileName = uniqid() . '.' . $file->getClientOriginalExtension();

        // Save the file to a designated storage location
        $file->storeAs('app/uploads', $fileName); 

        // Save the file information in the database
        $fileModel = new DoctorVerfiy();
        $fileModel->filename = $fileName;
        $fileModel->original_filename = $file->getClientOriginalName();
        $fileModel->doctor_id = $doctorId; // Associate the file with the doctor
        $fileModel->isVerfiy = 0 ; 
        $fileModel->save();

        // Optionally, you can return a response or redirect to another page
        return response()->json(['message' => 'File uploaded successfully'
        , 'document' => $fileModel]);
    }
}
