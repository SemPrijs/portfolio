@extends('layouts.app')

@section('title', 'KlimaatKompas')

@section('layout')
<div class="hm-shell">
    <header class="hm-header">
        <div class="hm-header-top">
            <div class="chip">🧭 KlimaatKompas</div>
            <div class="menu-dots">⋯</div>
        </div>

        <div class="hm-title">
            <h1>KlimaatKompas</h1>
            <div class="kli-globe" aria-label="kompas icon">🧭</div>
        </div>

        <p class="hm-copy">
            Ontdek jouw klimaatpositie.<br>
            Hoe belangrijk vind jij het klimaat en hoe actief ben je?
        </p>
    </header>

    <main class="hm-body">

        {{-- Tijdelijke aanpasbare testdata --}}
        @php
            $priority = -40;
            $activity = -70;
        @endphp

        <div class="climate-compass">

            <div class="compass-title top">
                Hoge activiteit
            </div>

            <div class="compass-grid">

                <div class="quadrant quadrant-tl">
                    <span>Hoge prioriteit</span>
                    <small>Weinig activiteit</small>
                </div>

                <div class="quadrant quadrant-tr">
                    <span>Hoge prioriteit</span>
                    <small>Veel activiteit</small>
                </div>

                <div class="quadrant quadrant-bl">
                    <span>Lage prioriteit</span>
                    <small>Weinig activiteit</small>
                </div>

                <div class="quadrant quadrant-br">
                    <span>Lage prioriteit</span>
                    <small>Veel activiteit</small>
                </div>

                <div
                    class="compass-result"
                    style="
                        left: {{ ($priority + 100) / 2 }}%;
                        top: {{ 100 - (($activity + 100) / 2) }}%;
                    "
                    title="Klimaatprioriteit: {{ $priority }}, activiteit: {{ $activity }}">
                </div>

            </div>

            <div class="compass-axis-labels">
                <span>← Lage klimaatprioriteit</span>
                <span>Hoge klimaatprioriteit →</span>
            </div>

            <p class="compass-note">
                Klimaatprioriteit: {{ $priority }}
                &nbsp; | &nbsp;
                Activiteit: {{ $activity }}
            </p>

        </div>

        <div class="action-stack">

            <div class="action-row secondary">
                <span class="action-icon">🌱</span>
                <span>
                    Klimaatprioriteit:
                    <strong>
                        {{ $priority >= 0 ? 'Hoog' : 'Laag' }}
                    </strong>
                </span>
            </div>

            <div class="action-row secondary">
                <span class="action-icon">⚡</span>
                <span>
                    Activiteit:
                    <strong>
                        {{ $activity >= 0 ? 'Hoog' : 'Laag' }}
                    </strong>
                </span>
            </div>

            <div class="action-row primary">
                <span class="action-icon">🧭</span>
                <span>
                    @if ($priority >= 0 && $activity >= 0)
                        Actief &amp; klimaatgericht
                    @elseif ($priority >= 0 && $activity < 0)
                        Klimaatgericht &amp; weinig actief
                    @elseif ($priority < 0 && $activity >= 0)
                        Actief &amp; lage klimaatprioriteit
                    @else
                        Weinig actief &amp; lage klimaatprioriteit
                    @endif
                </span>
            </div>

        </div>

        <div class="login-strip">
            <span class="spark">✦</span>
            <span>Je positie wordt later berekend aan de hand van de echte vragen.</span>
        </div>

    </main>
</div>

<style>
    .climate-compass {
        width: 100%;
        max-width: 520px;
        margin: 0 auto;
        text-align: center;
    }

    .compass-title {
        font-weight: 700;
        margin-bottom: 10px;
    }

    .compass-grid {
        position: relative;
        width: 100%;
        aspect-ratio: 1 / 1;
        display: grid;
        grid-template-columns: 1fr 1fr;
        grid-template-rows: 1fr 1fr;
        border: 3px solid #222;
        border-radius: 8px;
        overflow: hidden;
        background: #fff;
    }

    .quadrant {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        padding: 15px;
        border: 1px solid rgba(0, 0, 0, 0.2);
        font-weight: 700;
        font-size: 15px;
    }

    .quadrant small {
        margin-top: 6px;
        font-size: 12px;
        font-weight: 400;
    }

    .quadrant-tl {
        background: #dff3df;
    }

    .quadrant-tr {
        background: #c7e8c7;
    }

    .quadrant-bl {
        background: #f2f2f2;
    }

    .quadrant-br {
        background: #e8eeee;
    }

    .compass-result {
        position: absolute;
        width: 26px;
        height: 26px;
        transform: translate(-50%, -50%);
        border-radius: 50%;
        background: #111;
        border: 5px solid white;
        box-shadow: 0 2px 8px rgba(0, 0, 0, 0.35);
        z-index: 5;
    }

    .compass-result::after {
        content: '';
        position: absolute;
        width: 8px;
        height: 8px;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        background: #fff;
        border-radius: 50%;
    }

    .compass-axis-labels {
        display: flex;
        justify-content: space-between;
        margin-top: 10px;
        font-size: 12px;
        font-weight: 600;
    }

    .compass-note {
        margin-top: 8px;
        font-size: 12px;
        opacity: 0.65;
    }
</style>
@endsection
