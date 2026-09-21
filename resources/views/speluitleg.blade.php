@extends('layouts.app')

@section('title', 'Hoe werkt het spel? | KliMaten')

@section('layout')
    <div class="screen-shell">
        <header class="screen-header speluitleg-header">
            <a href="{{ route('home') }}" class="back-btn" aria-label="Terug naar home">←</a>
            <h1>🎮 Hoe werkt het spel?</h1>
        </header>

        <main class="screen-content speluitleg-content" aria-label="Speluitleg">
        </main>
    </div>
@endsection
