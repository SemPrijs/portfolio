<?php

use Illuminate\Support\Facades\Route;

Route::view('/', 'home')->name('home');
Route::view('/speluitleg', 'speluitleg')->name('speluitleg');
Route::view('/admin', 'admin')->name('admin');
Route::view('/over-ons', 'over_ons')->name('over_ons');
Route::view('/game', 'game')->name('game');

