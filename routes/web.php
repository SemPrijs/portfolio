<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Auth\RegisterController;
use App\Http\Controllers\GameController;

Route::view('/', 'home')->name('home');
Route::view('/klimaatkompas', 'klimaatkompas');
Route::view('/speluitleg', 'speluitleg')->name('speluitleg');
Route::get('/admin', function () {
	$statements = \App\Models\Statement::allOrdered();
	return view('admin', compact('statements'));
})->name('admin');

Route::post('/admin/statements', function (\Illuminate\Http\Request $request) {
	$validated = $request->validate([
		'text' => 'required|string',
	]);

	// counts are not editable via the admin form; default to 0
	$validated['aantal_eens'] = 0;
	$validated['aantal_oneens'] = 0;

	\App\Models\Statement::create($validated);

	return redirect()->route('admin')->with('success', 'Statement toegevoegd.');
})->name('admin.statements.store');
Route::view('/over-ons', 'over_ons')->name('over_ons');

Route::view('/game-start', 'game-start')->name('game.start');

Route::get('/register', [RegisterController::class, 'show'])
    ->name('register');

Route::post('/register', [RegisterController::class, 'register'])
    ->name('register.store');

Route::view('/game', 'game')->name('game');

Route::post('/game/save-score', [GameController::class, 'saveScore'])
    ->middleware('auth')
    ->name('game.save-score');