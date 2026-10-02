<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Statement extends Model
{
    protected $table = 'statements';

    protected $fillable = [
        'text',
        'category',
        'aantal_eens',
        'aantal_oneens',
    ];

    public static function selectOrdered()
    {
        return self::select([
            'id',
            'text',
            'category',
            'aantal_eens',
            'aantal_oneens',
        ]);
    }

    public static function allOrdered()
    {
        return self::selectOrdered()->get();
    }
}
