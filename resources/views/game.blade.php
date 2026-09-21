@extends('layouts.app')

@section('title', 'KliMaten - Spel')

@section('layout')

<div class="game-page">

    <header class="game-header">
        <h1>KliMaten</h1>
        <p>Wat vind jij?</p>
    </header>

    <main class="game-content">

        <div class="swipe-area">

            <div id="statement-card" class="statement-card">

                <div class="statement-label">
                    STELLING
                </div>

                <p id="statement-text"></p>

            </div>

            <div class="swipe-hint">
                <span>↓ Oneens</span>
                <span>Omhoog = eens ↑</span>
            </div>

        </div>

        <div class="game-actions">

            <button
                type="button"
                id="disagree-button"
                class="game-button disagree"
            >
                👎 Oneens
            </button>

            <button
                type="button"
                id="agree-button"
                class="game-button agree"
            >
                👍 Eens
            </button>

        </div>

        <div id="progress" class="progress">
            1 / 10
        </div>

    </main>

</div>

@endsection