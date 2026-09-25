@extends('layouts.app')

@section('title', 'Leer over klimaat | KliMaten')

@section('layout')
    <div class="topics-shell">
        <header class="topics-header">
            <a href="{{ route('home') }}" class="topics-back" aria-label="Terug naar home">←</a>
            <h1>📚 Leer over klimaat</h1>
            <span aria-hidden="true"></span>
        </header>

        <main class="topics-content">

            <p class="topics-prompt">Kies een onderwerp om meer over te leren 👇</p>

            <div class="topics-grid">
                <a href="{{ route('leren.topic', 'klimaatverandering') }}" class="topic-card topic-orange">
                    <span class="topic-icon" aria-hidden="true">🌡️</span>
                    <strong>Klimaatverandering</strong>
                    <span>Lees meer →</span>
                </a>
                <a href="{{ route('leren.topic', 'energie') }}" class="topic-card topic-yellow">
                    <span class="topic-icon" aria-hidden="true">⚡</span>
                    <strong>Energie</strong>
                    <span>Lees meer →</span>
                </a>
                <a href="{{ route('leren.topic', 'voeding') }}" class="topic-card topic-green">
                    <span class="topic-icon" aria-hidden="true">🍃</span>
                    <strong>Voeding</strong>
                    <span>Lees meer →</span>
                </a>
                <a href="{{ route('leren.topic', 'afval-recycling') }}" class="topic-card topic-blue">
                    <span class="topic-icon" aria-hidden="true">♻️</span>
                    <strong>Afval &amp; recycling</strong>
                    <span>Lees meer →</span>
                </a>
                <a href="{{ route('leren.topic', 'vervoer') }}" class="topic-card topic-purple">
                    <span class="topic-icon" aria-hidden="true">🚲</span>
                    <strong>Vervoer</strong>
                    <span>Lees meer →</span>
                </a>
                <a href="{{ route('leren.topic', 'duurzaamheid') }}" class="topic-card topic-mint">
                    <span class="topic-icon" aria-hidden="true">🌍</span>
                    <strong>Duurzaamheid</strong>
                    <span>Lees meer →</span>
                </a>
            </div>
        </main>
    </div>
@endsection