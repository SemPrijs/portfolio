<?php

use App\Models\AdminAccount;
use App\Models\LearningTopic;
use App\Models\Statement;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Auth\RegisterController;
use App\Http\Controllers\GameController;

Route::view('/', 'home')->name('home');
Route::get('/klimaatkompas', function (Request $request) {
	return view('klimaatkompas', [
		'priority' => $request->session()->get('priority_score', 0),
		'activity' => $request->session()->get('activity_score', 0),
	]);
})->name('klimaatkompas');
Route::view('/speluitleg', 'speluitleg')->name('speluitleg');
Route::get('/leren', function () {
	LearningTopic::seedDefaults();

	return view('leren', [
		'topics' => LearningTopic::ordered()->get(),
	]);
})->name('leren');
Route::get('/leren/{slug}', function (string $slug) {
	LearningTopic::seedDefaults();

	$topic = LearningTopic::ordered()
		->where('slug', $slug)
		->firstOrFail();

	return view('onderwerp', ['topic' => $topic]);
})->name('leren.topic');

Route::get('/admin/login', function () {
	return view('admin-login');
})->name('admin.login');

Route::post('/admin/login', function (Request $request) {
	$credentials = $request->validate([
		'email' => ['required', 'email'],
		'password' => ['required', 'string'],
	]);

	$admin = AdminAccount::where('email', $credentials['email'])
		->where('is_active', true)
		->first();

	if ($admin && Hash::check($credentials['password'], $admin->password)) {
		$request->session()->regenerate();
		$request->session()->put('is_admin', true);
		$admin->forceFill(['last_login_at' => now()])->save();

		return redirect()->route('admin');
	}

	return back()->withErrors(['email' => 'De ingevulde admingegevens zijn niet juist.']);
})->name('admin.login.submit');

Route::get('/admin', function (Request $request) {
	abort_unless($request->session()->get('is_admin'), 403);

	return view('admin', [
		'adminAccounts' => AdminAccount::orderBy('name')->get(),
		'statements' => Statement::allOrdered(),
	]);
})->name('admin');

Route::post('/admin/statements', function (Request $request) {
    abort_unless($request->session()->get('is_admin'), 403);

    $validated = $request->validate([
        'text' => ['required', 'string', 'max:1000'],
        'category' => ['required', 'in:activity,priority'],
    ]);

    Statement::create([
        'text' => $validated['text'],
        'category' => $validated['category'],
        'aantal_eens' => 0,
        'aantal_oneens' => 0,
    ]);

    return redirect()->route('admin')->with('success', 'Stelling toegevoegd.');
})->name('admin.statements.store');

Route::view('/over-ons', 'over_ons')->name('over_ons');

Route::view('/game-start', 'game-start')->name('game.start');

Route::get('/register', [RegisterController::class, 'show'])
    ->name('register');

Route::post('/register', [RegisterController::class, 'register'])
    ->name('register.store');

Route::get('/game', [GameController::class, 'index'])
    ->name('game');

Route::post('/game/save-score', [GameController::class, 'saveScore'])
    ->name('game.save-score');

Route::post('/game/statement', [GameController::class, 'statement'])
    ->name('game.statement');