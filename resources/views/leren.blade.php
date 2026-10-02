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
                @foreach ($topics as $topic)
                    <a href="{{ route('leren.topic', $topic->slug) }}" class="topic-card {{ $topic->color_class }}">
                        <span class="topic-icon" aria-hidden="true">{{ $topic->icon }}</span>
                        <strong>{{ $topic->title }}</strong>
                        <span>Lees meer →</span>
                    </a>
                @endforeach
            </div>
        </main>
    </div>
@endsection