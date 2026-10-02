<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::table('game_scores', function (Blueprint $table) {
            $table->integer('quiz_correct')->default(0)->after('priority_score');
            $table->integer('quiz_total')->default(0)->after('quiz_correct');
        });
    }

    public function down(): void
    {
        Schema::table('game_scores', function (Blueprint $table) {
            $table->dropColumn([
                'quiz_correct',
                'quiz_total',
            ]);
        });
    }
};