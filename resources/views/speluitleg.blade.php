@extends('layouts.app')

@section('title', 'Hoe werkt het spel? | KliMaten')

@section('layout')
    <div class="screen-shell">
        <header class="screen-header speluitleg-header">
            <a href="{{ route('home') }}" class="back-btn" aria-label="Terug naar home">←</a>
            <h1>🎮 Hoe werkt het spel?</h1>
        </header>

        <main class="screen-content speluitleg-content" aria-label="Speluitleg">
            <div class="how-to-content">
                <section class="how-to-intro">
                    <span class="how-to-icon" aria-hidden="true">🌍</span>
                    <div>
                        <h2>Ontdek wat jij vindt</h2>
                        <p>Beantwoord stellingen over het klimaat en ontdek hoe jij naar belangrijke onderwerpen kijkt.</p>
                    </div>
                </section>

                <ol class="how-to-steps">
                    <li class="how-to-step">
                        <span class="how-to-number">1</span>
                        <div>
                            <h3>Lees de stelling</h3>
                            <p>Lees rustig wat er op de kaart staat. Er is geen goed of fout antwoord.</p>
                        </div>
                    </li>
                    <li class="how-to-step">
                        <span class="how-to-number">2</span>
                        <div>
                            <h3>Kies jouw antwoord</h3>
                            <p>Ben je het eens of oneens? Tik op de knop die bij jouw mening past.</p>
                        </div>
                    </li>
                    <li class="how-to-step">
                        <span class="how-to-number">3</span>
                        <div>
                            <h3>Swipe op je telefoon</h3>
                            <p>Je kunt ook omhoog swipen voor <strong>Eens</strong> en omlaag voor <strong>Oneens</strong>.</p>
                        </div>
                    </li>
                </ol>

                <aside class="how-to-note">
                    <span aria-hidden="true">💡</span>
                    <p>Na elke keuze krijg je een nieuwe stelling. Aan het einde heb je alle 10 stellingen beantwoord.</p>
                </aside>

                <a href="{{ route('game') }}" class="how-to-start">🎮 Start het spel</a>
            </div>
        </main>
    </div>
@endsection
