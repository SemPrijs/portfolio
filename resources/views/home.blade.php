@extends('layouts.app')

@section('title', 'KliMaten')

@section('layout')
    <div class="hm-shell">
        <header class="hm-header">
            <div class="hm-header-top">
                <div class="chip">🌱 Klimaat &amp; Duurzaamheid</div>
                <details class="home-menu">
                    <summary class="menu-dots" aria-label="Open menu">⋯</summary>
                    <div class="home-menu-dropdown">
                        <a href="{{ route('admin.login') }}">Adminlogin</a>
                    </div>
                </details>
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
            <img src="{{ asset('Homepage.png') }}" alt="Homepage illustratie">
        </div>

        <div class="action-stack">
            <a href="{{ route('register') }}" class="action-row primary">
                <span class="action-icon">🎮</span>
                <span>Start het spel!</span>
            </a>

            <a href="{{ route('speluitleg') }}" class="action-row secondary">
                <span class="action-icon">?</span>
                <span>Hoe werkt het?</span>
            </a>

            <a href="{{ route('leren') }}" class="action-row secondary">
                <span class="action-icon">📚</span>
                <span>Leer over klimaat</span>
            </a>

            <a href="{{ url('/klimaatkompas') }}" class="action-row secondary">
                <span class="action-icon">🧭</span>
                <span>KlimaatKompas</span>
            </a>

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
