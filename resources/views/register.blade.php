@extends('layouts.app')

@section('title', 'KliMaten - Account maken')

@section('layout')

<div class="register-page">

    <div class="register-card">

        <div class="register-icon">
            👤
        </div>

        <h1>Account maken</h1>

        <p class="register-intro">
            Maak een account om je KliMaten-resultaten te bewaren.
        </p>

        <form method="POST" action="{{ route('register.store') }}">
            @csrf

            <div class="form-group">
                <label for="name">Naam</label>

                <input
                    type="text"
                    id="name"
                    name="name"
                    value="{{ old('name') }}"
                    required
                >

                @error('name')
                    <span class="form-error">{{ $message }}</span>
                @enderror
            </div>

            <div class="form-group">
                <label for="email">E-mailadres</label>

                <input
                    type="email"
                    id="email"
                    name="email"
                    value="{{ old('email') }}"
                    required
                >

                @error('email')
                    <span class="form-error">{{ $message }}</span>
                @enderror
            </div>

            <div class="form-group">
                <label for="password">Wachtwoord</label>

                <input
                    type="password"
                    id="password"
                    name="password"
                    required
                >

                @error('password')
                    <span class="form-error">{{ $message }}</span>
                @enderror
            </div>

            <div class="form-group">
                <label for="password_confirmation">
                    Wachtwoord bevestigen
                </label>

                <input
                    type="password"
                    id="password_confirmation"
                    name="password_confirmation"
                    required
                >
            </div>

            <button type="submit" class="register-button">
                Account maken
            </button>

        </form>

    </div>

</div>

@endsection