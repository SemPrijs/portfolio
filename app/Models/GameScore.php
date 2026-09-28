<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class GameScore extends Model
{
    protected $fillable = [
        'user_id',
        'guest_id',
        'activity_score',
        'priority_score',
        'quiz_correct',
        'quiz_total',
    ];
}