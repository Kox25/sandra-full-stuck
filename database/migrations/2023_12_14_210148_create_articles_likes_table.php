<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('Articleslikes', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('patientID');
            $table->unsignedBigInteger('articleID');
            $table->foreign('patientID')->references('id')->on('patients')->onDelete('cascade');
            $table->foreign('articleID')->references('id')->on('articles')->onDelete('cascade');
            $table->timestamps();    
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('Articleslikes');
    }
};