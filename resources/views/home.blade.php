@extends('layouts.app')

@section('title', 'KliMaten')

@section('layout')
    <div class="hm-shell">
        <header class="hm-header">
            <div class="hm-header-top">
                <div class="chip">🌱 Klimaat &amp; Duurzaamheid</div>
                <div class="menu-dots">⋯</div>
            </div>

            <div class="hm-title">
                <h1>KliMaten</h1>
                <div class="kli-globe" aria-label="globe icon">🌍</div>
            </div>

            <p class="hm-copy">
                Ontdek jouw klimaatpositie.<br>
                Beantwoord stellingen en leer meer!
            </p>
        </header>

        <main class="hm-body">
            <div class="mock-illustration">
                <span class="illustration-icon">🌿</span>
                <span>Illustratie klimaat &amp; natuur</span>
            </div>

            <div class="action-stack">
                <a href="{{ route('game') }}" class="action-row primary">
                    <span class="action-icon">🎮</span>
                    <span>Start het spel!</span>
                </button>
                <a href="{{ route('speluitleg') }}" class="action-row secondary">
                </a>
                <button type="button" class="action-row secondary">
                    <span class="action-icon">?</span>
                    <span>Hoe werkt het?</span>
                </a>
                <button type="button" class="action-row secondary">
                    <span class="action-icon">📚</span>
                    <span>Leer over klimaat</span>
                </button>
                <button type="button" class="action-row secondary">
                    <span class="action-icon">🧭</span>
                    <span>Wat is het klimaatkampas?</span>
                </button>
                <a href="{{ route('over_ons') }}" class="action-row secondary">
                    <span class="action-icon">🏢</span>
                    <span>Over ons</span>
                </a>
            </div>

            <div class="login-strip">
                <span class="spark">✦</span>
                <span>Geen account nodig • Gratis • Voor iedereen</span>
            </div>
        </main>
    </div>
@endsection