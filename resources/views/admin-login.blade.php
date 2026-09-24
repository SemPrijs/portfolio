@extends('layouts.app')

@section('title', 'Adminlogin | KliMaten')

@section('layout')
    <main class="admin-login-page">
        <a href="{{ route('home') }}" class="back-btn" aria-label="Terug naar home">←</a>
        <div class="admin-login-card">
            <span class="chip">Beheer</span>
            <h1>Adminlogin</h1>
            <p>Log in om het dashboard te openen.</p>

            @if ($errors->any())
                <div class="admin-login-error">{{ $errors->first() }}</div>
            @endif

            <form method="POST" action="{{ route('admin.login.submit') }}">
                @csrf
                <label for="email">E-mailadres</label>
                <input id="email" name="email" type="email" value="{{ old('email') }}" required autofocus>

                <label for="password">Wachtwoord</label>
                <input id="password" name="password" type="password" required>

                <button class="admin-login-submit" type="submit">Inloggen</button>
            </form>
        </div>
    </main>
@endsection