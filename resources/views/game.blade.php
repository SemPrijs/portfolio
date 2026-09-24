@extends('layouts.app')

@section('title', 'KliMaten - Spel')

@section('layout')

<div class="game-page">

```
<header class="game-header">
    <h1>KliMaten</h1>
    <p>Wat vind jij?</p>
</header>

<main class="game-content">

    <div class="game-board">

        {{-- Stapel met eens --}}
        <div class="agree-stack">
            <div class="stack-paper stack-paper-3"></div>
            <div class="stack-paper stack-paper-2"></div>
            <div class="stack-paper stack-paper-1"></div>

            <div class="stack-label">
                <span>✓</span>
                <span>EENS ↑</span>
            </div>
        </div>

        {{-- De huidige stelling / quizvraag --}}
        <div class="swipe-area">

            <div id="statement-card" class="statement-card">

                <div class="statement-label">
                    STELLING
                </div>

                <p id="statement-text"></p>

            </div>

        </div>

        {{-- Quiz antwoorden komen BUITEN de card --}}
        <div
            id="quiz-answers-container"
            class="quiz-answers-container"
        ></div>

        {{-- Quiz Verder knop komt BUITEN de card --}}
        <div
            id="quiz-next-container"
            class="quiz-next-container"
        ></div>

        {{-- Prullenbak --}}
        <div id="trash-bin" class="trash-bin">

            <div class="trash-lid"></div>

            <div class="trash-body">
                <div class="trash-lines"></div>
                <span>🗑️</span>
            </div>

            <div class="trash-label">
                ↓ ONEENS
            </div>

        </div>

    </div>

    {{-- Normale Eens / Oneens knoppen --}}
    <div class="game-actions">

        <button
            type="button"
            id="agree-button"
            class="game-button agree"
        >
            👍 Eens
        </button>

        <button
            type="button"
            id="disagree-button"
            class="game-button disagree"
        >
            👎 Oneens
        </button>

    </div>

    <div id="progress" class="progress">
        1 / 15
    </div>

</main>
```

</div>

@endsection
