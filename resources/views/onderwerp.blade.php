@extends('layouts.app')

@section('title', $topic->title . ' | KliMaten')

@section('layout')
    <div class="learn-shell">
        <header class="learn-header">
            <a href="{{ route('leren') }}" class="learn-back" aria-label="Terug naar onderwerpen">←</a>
            <h1>📚 Leer over klimaat</h1>
            <span class="learn-header-space" aria-hidden="true"></span>
        </header>

        <main class="learn-content">
            <div class="learn-illustration" role="img" aria-label="Illustratie van {{ $topic->title }}">
                <span>{{ $topic->icon }}</span>
                <span>Afbeelding: {{ $topic->title }}</span>
            </div>

            <section class="learn-intro" aria-labelledby="learn-title">
                <h2 id="learn-title">{{ $topic->title }}</h2>
                <p>{{ $topic->intro }}</p>
            </section>

            <div class="learn-facts">
                <article class="learn-card learn-card-green">
                    <h3><span aria-hidden="true">🔍</span> Wat is het?</h3>
                    <p>{{ $topic->what }}</p>
                </article>
                <article class="learn-card learn-card-yellow">
                    <h3><span aria-hidden="true">❗</span> Waarom belangrijk?</h3>
                    <p>{{ $topic->why }}</p>
                </article>
                <article class="learn-card learn-card-purple">
                    <h3><span aria-hidden="true">🌟</span> Wat kun jij doen?</h3>
                    <p>{{ $topic->action }}</p>
                </article>
            </div>

            <aside class="learn-quiz-teaser">
                <div class="learn-quiz-label">💡 WIST JE DAT?</div>
                <strong>{{ $topic->fact }}</strong>
            </aside>

            <a href="{{ route('leren') }}" class="learn-home-link">← Terug naar overzicht</a>
        </main>
    </div>
@endsection