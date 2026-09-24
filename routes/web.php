<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Auth\RegisterController;

Route::view('/', 'home')->name('home');

Route::view('/speluitleg', 'speluitleg')->name('speluitleg');

Route::view('/admin', 'admin')->name('admin');

Route::view('/over-ons', 'over_ons')->name('over_ons');

Route::view('/game-start', 'game-start')->name('game.start');

Route::get('/register', [RegisterController::class, 'show'])
    ->name('register');

Route::post('/register', [RegisterController::class, 'register'])
    ->name('register.store');

Route::view('/game', 'game')->name('game');