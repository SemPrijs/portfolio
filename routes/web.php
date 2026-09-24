<?php

use App\Models\AdminAccount;
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
Route::view('/leren', 'leren')->name('leren');
Route::get('/leren/{topic}', function (string $topic) {
	$topics = [
		'klimaatverandering' => [
			'title' => 'Klimaatverandering',
			'icon' => '🌡️',
			'intro' => 'Introductietekst over klimaatverandering. Dit onderwerp raakt aan ons dagelijks leven en de toekomst!',
			'what' => 'Een korte uitleg in begrijpelijke taal voor jongeren en gezinnen.',
			'why' => 'Dit onderwerp heeft grote invloed op onze toekomst en het klimaat.',
			'action' => 'Kleine stappen die jij en je gezin kunnen zetten.',
			'fact' => '[ Statistiek of feit over klimaatverandering ]',
		],
		'energie' => [
			'title' => 'Energie',
			'icon' => '⚡',
			'intro' => 'Energie gebruiken we elke dag. Ontdek waar het vandaan komt en hoe we ermee omgaan.',
			'what' => 'Energie is wat nodig is om iets te laten werken, bewegen of veranderen.',
			'why' => 'De manier waarop we energie opwekken heeft invloed op het klimaat.',
			'action' => 'Bespaar energie door lichten uit te doen en apparaten bewust te gebruiken.',
			'fact' => '[ Wist je dat energie besparen vaak heel eenvoudig begint? ]',
		],
		'voeding' => [
			'title' => 'Voeding',
			'icon' => '🍃',
			'intro' => 'Wat we eten heeft invloed op de aarde, dieren en mensen over de hele wereld.',
			'what' => 'Voeding is alles wat we eten en drinken om ons lichaam energie te geven.',
			'why' => 'Voedsel maken, vervoeren en weggooien kost grondstoffen en energie.',
			'action' => 'Kies vaker voor seizoensproducten en gooi zo min mogelijk eten weg.',
			'fact' => '[ Een groot deel van voedselverspilling gebeurt gewoon thuis. ]',
		],
		'afval-recycling' => [
			'title' => 'Afval & recycling',
			'icon' => '♻️',
			'intro' => 'Minder afval maken en goed scheiden helpt om grondstoffen en de natuur te beschermen.',
			'what' => 'Afval is iets wat we niet meer gebruiken. Recycling geeft materialen een nieuw leven.',
			'why' => 'Nieuwe spullen maken kost grondstoffen, water en energie.',
			'action' => 'Gebruik spullen langer, repareer ze en scheid je afval goed.',
			'fact' => '[ Veel materialen kunnen opnieuw worden gebruikt. ]',
		],
		'vervoer' => [
			'title' => 'Vervoer',
			'icon' => '🚲',
			'intro' => 'We verplaatsen ons elke dag. Dat kan op manieren die beter zijn voor het klimaat.',
			'what' => 'Vervoer brengt mensen en spullen van de ene naar de andere plek.',
			'why' => 'Auto’s, vliegtuigen en vrachtwagens gebruiken brandstof en stoten broeikasgassen uit.',
			'action' => 'Pak vaker de fiets, loop of kies het openbaar vervoer.',
			'fact' => '[ Fietsen is gezond voor jou en goed voor de lucht. ]',
		],
		'duurzaamheid' => [
			'title' => 'Duurzaamheid',
			'icon' => '🌍',
			'intro' => 'Duurzaamheid betekent goed zorgen voor de aarde, nu en voor de mensen na ons.',
			'what' => 'Duurzaam leven houdt rekening met mens, milieu en de toekomst.',
			'why' => 'De aarde heeft grenzen. Samen kunnen we zorgen dat er genoeg blijft voor iedereen.',
			'action' => 'Maak bewuste keuzes en kijk steeds hoe je iets kunt hergebruiken.',
			'fact' => '[ Kleine keuzes van veel mensen maken samen een groot verschil. ]',
		],
	];

	abort_unless(array_key_exists($topic, $topics), 404);

	return view('onderwerp', ['topic' => $topics[$topic]]);
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

Route::post('/admin/logout', function (Request $request) {
	$request->session()->forget('is_admin');
	$request->session()->invalidate();
	$request->session()->regenerateToken();

	return redirect()->route('home');
})->name('admin.logout');

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
	]);

	Statement::create([
		'text' => $validated['text'],
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

Route::view('/game', 'game')->name('game');

Route::post('/game/save-score', [GameController::class, 'saveScore'])
    ->name('game.save-score');