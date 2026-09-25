<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::table('statements', function (Blueprint $table) {
            $table->integer('aantal_eens')->default(0);
            $table->integer('aantal_oneens')->default(0);
        });
    }

    public function down(): void
    {
        Schema::table('statements', function (Blueprint $table) {
            $table->dropColumn(['aantal_eens', 'aantal_oneens']);
        });
    }
};