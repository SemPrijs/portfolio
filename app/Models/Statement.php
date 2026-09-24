<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Statement extends Model
{
    /**
     * The table associated with the model.
     *
     * @var string
     */
    protected $table = 'statements';

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'text',
        'aantal_eens',
        'aantal_oneens',
    ];

    /**
     * Return a query that selects the columns in the required order.
     * Use `Statement::selectOrdered()->get()` or `Statement::selectOrdered()->first()`.
     *
     * @return \Illuminate\Database\Eloquent\Builder
     */
    public static function selectOrdered()
    {
        return self::select(['id', 'text', 'aantal_eens', 'aantal_oneens']);
    }

    /**
     * Convenience method to get all rows with columns in the required order.
     *
     * @return \Illuminate\Database\Eloquent\Collection
     */
    public static function allOrdered()
    {
        return self::selectOrdered()->get();
    }
}
