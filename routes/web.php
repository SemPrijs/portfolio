<?php

use Illuminate\Support\Facades\Route;

Route::view('/home', 'home')->name('home');
Route::view('/admin', 'admin')->name('admin');
Route::view('/over-ons', 'over_ons')->name('over_ons');
