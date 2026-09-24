@extends('layouts.app')

@section('title', 'KliMaten - Start het spel')

@section('layout')

<div class="game-start-page">

    <div class="game-start-card">

        <div class="game-start-icon">
            🎮
        </div>

        <h1>
            Klaar om te spelen?
        </h1>

        <p>
            Wil je een account maken voordat je begint?
        </p>

        <p class="game-start-info">
            Met een account kunnen we jouw resultaten bewaren.
        </p>


        <div class="game-start-actions">

            <a
                href="{{ route('register') }}"
                class="game-start-button primary"
            >
                Account maken
            </a>


            <a
                href="{{ route('game') }}"
                class="game-start-button secondary"
            >
                Geen account, direct spelen
            </a>

        </div>

    </div>

</div>

@endsection