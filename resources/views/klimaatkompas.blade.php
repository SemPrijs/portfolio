@extends('layouts.app')

@section('title', 'KlimaatKompas')

@section('layout')
<div class="hm-shell">
    <header class="hm-header">
        <div class="hm-header-top">
            <a href="{{ route('home') }}" class="topics-back" aria-label="Terug naar home">←</a>
            <div class="chip">🧭 KlimaatKompas</div>
            <button
                type="button"
                class="menu-dots"
                id="score-controls-toggle"
                aria-expanded="false"
                aria-controls="score-controls"
                aria-label="Punten aanpassen tonen">
                ⌞ ⌝
            </button>
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

        <div class="climate-compass">

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
                    id="compass-result"
                    style="
                        left: {{ ($activity + 100) / 2 }}%;
                        top: {{ 100 - (($priority + 100) / 2) }}%;
                    "
                    title="Klimaatprioriteit: {{ $priority }}, activiteit: {{ $activity }}">
                </div>

            </div>

            <p class="compass-note" id="compass-note">
                Klimaatprioriteit: {{ $priority }} | Activiteit: {{ $activity }}
            </p>

            <div class="score-controls" id="score-controls" aria-label="Punten aanpassen voor presentatie" hidden>
                <div class="score-control">
                    <span>Prioriteit</span>
                    <strong id="priority-score">{{ $priority }}</strong>
                    <div class="score-buttons">
                        <button type="button" data-score-axis="priority" data-score-step="-10" aria-label="Prioriteit 10 punten lager">−10</button>
                        <button type="button" data-score-axis="priority" data-score-step="-1" aria-label="Prioriteit 1 punt lager">−1</button>
                        <button type="button" data-score-axis="priority" data-score-step="1" aria-label="Prioriteit 1 punt hoger">+1</button>
                        <button type="button" data-score-axis="priority" data-score-step="10" aria-label="Prioriteit 10 punten hoger">+10</button>
                    </div>
                </div>
                <div class="score-control">
                    <span>Activiteit</span>
                    <strong id="activity-score">{{ $activity }}</strong>
                    <div class="score-buttons">
                        <button type="button" data-score-axis="activity" data-score-step="-10" aria-label="Activiteit 10 punten lager">−10</button>
                        <button type="button" data-score-axis="activity" data-score-step="-1" aria-label="Activiteit 1 punt lager">−1</button>
                        <button type="button" data-score-axis="activity" data-score-step="1" aria-label="Activiteit 1 punt hoger">+1</button>
                        <button type="button" data-score-axis="activity" data-score-step="10" aria-label="Activiteit 10 punten hoger">+10</button>
                    </div>
                </div>
            </div>

        </div>

        <div class="action-stack">

            <div class="action-row secondary">
                <span class="action-icon">🌱</span>
                <span>
                    Klimaatprioriteit:
                    <strong id="priority-value">
                        {{ $priority >= 0 ? 'Hoog' : 'Laag' }}
                    </strong>
                </span>
            </div>

            <div class="action-row secondary">
                <span class="action-icon">⚡</span>
                <span>
                    Activiteit:
                    <strong id="activity-value">
                        {{ $activity >= 0 ? 'Hoog' : 'Laag' }}
                    </strong>
                </span>
            </div>

            <button type="button" class="action-row save-result-button" id="save-result-button">
                <span class="action-icon">💾</span>
                <span>Huidige uitslag opslaan</span>
            </button>

            <button type="button" class="action-row secondary saved-results-toggle" id="saved-results-toggle" aria-expanded="false" aria-controls="saved-results">
                <span class="action-icon">🗂️</span>
                <span>Opgeslagen uitslagen bekijken</span>
            </button>

            <div class="saved-results" id="saved-results" hidden>
                <div class="saved-results-heading">
                    <strong>Jouw opgeslagen uitslagen</strong>
                    <button type="button" class="clear-saved-results" id="clear-saved-results">Alles wissen</button>
                </div>
                <div id="saved-results-list" class="saved-results-list"></div>
            </div>

        </div>

        <div class="login-strip">
            <span class="spark">✦</span>
            <span>Deze uitslagen worden 30 dagen in deze browser bewaard. Ze zijn niet permanent; met een account kun je ze later bewaren.</span>
        </div>

    </main>
</div>

<style>
    .app-shell:has(.hm-shell) {
        height: 100dvh;
        min-height: 0;
    }

    .app-shell:has(.hm-shell) .status-bar {
        height: 36px;
        min-height: 36px;
    }

    .app-shell:has(.hm-shell) .bottom-nav {
        min-height: 58px;
    }

    .hm-shell {
        height: calc(100dvh - 94px);
        min-height: 0;
    }

    .hm-body {
        overflow-y: auto;
        -webkit-overflow-scrolling: touch;
    }

    .hm-header {
        padding: 12px clamp(14px, 4vw, 22px) 14px;
    }

    .hm-header-top {
        margin-bottom: 4px;
    }

    .hm-title h1 {
        font-size: clamp(28px, 8vw, 36px);
    }

    .hm-copy {
        margin-top: 4px;
        font-size: 0.875rem;
        line-height: 1.3;
    }

    .hm-body {
        padding: 10px clamp(14px, 4vw, 22px) 8px;
    }

    .action-stack {
        gap: 5px;
        margin-top: 6px;
    }

    .action-row {
        min-height: 40px;
        padding-inline: 12px;
        font-size: 0.875rem;
    }

    .action-icon {
        font-size: 14px;
    }

    .login-strip {
        margin-top: 6px;
        padding-top: 2px;
        font-size: 0.7rem;
        line-height: 1.25;
    }

    .climate-compass {
        width: 100%;
        max-width: min(360px, 46dvh);
        margin: 0 auto;
        text-align: center;
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
        padding: 8px;
        border: 1px solid rgba(0, 0, 0, 0.2);
        font-weight: 700;
        font-size: 12px;
    }

    .quadrant small {
        margin-top: 3px;
        font-size: 10px;
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

    .compass-note {
        margin: 4px 0 0;
        font-size: 10px;
        opacity: 0.65;
    }

    .score-controls {
        display: grid;
        grid-template-columns: 1fr 1fr;
        gap: 6px;
        margin-top: 6px;
        text-align: left;
    }

    .score-controls[hidden] {
        display: none;
    }

    .score-control {
        padding: 6px 8px;
        border: 1px solid rgba(22, 101, 52, 0.2);
        border-radius: 10px;
        background: rgba(255, 255, 255, 0.72);
        color: #14532d;
        font-size: 10px;
    }

    .score-control > span {
        margin-right: 4px;
    }

    .score-control strong {
        font-size: 12px;
    }

    .score-buttons {
        display: grid;
        grid-template-columns: repeat(4, 1fr);
        gap: 3px;
        margin-top: 5px;
    }

    .score-buttons button {
        min-width: 0;
        padding: 4px 2px;
        border: 1px solid rgba(22, 101, 52, 0.25);
        border-radius: 6px;
        background: #f0fdf4;
        color: #14532d;
        font: inherit;
        font-weight: 800;
        cursor: pointer;
    }

    .score-buttons button:hover,
    .score-buttons button:focus-visible {
        background: #dcfce7;
        outline: 2px solid #22c55e;
        outline-offset: 1px;
    }

    .save-result-button {
        border-color: #166534;
        background: #166534;
        color: #fff;
    }

    .save-result-button:hover {
        background: #14532d;
        border-color: #14532d;
    }

    .saved-results {
        display: flex;
        flex-direction: column;
        min-height: 0;
        padding: 10px;
        border: 2px solid rgba(22, 101, 52, 0.2);
        border-radius: 16px;
        background: rgba(255, 255, 255, 0.72);
    }

    .saved-results[hidden] {
        display: none;
    }

    .saved-results-heading,
    .saved-result-meta {
        display: flex;
        align-items: center;
        justify-content: space-between;
        gap: 12px;
    }

    .saved-results-heading {
        margin-bottom: 10px;
        color: #14532d;
    }

    .saved-results-list {
        display: flex;
        flex-direction: column;
        gap: 8px;
        padding: 2px;
    }

    .saved-result {
        width: 100%;
        padding: 10px 12px;
        border: 0;
        border-radius: 10px;
        background: #f0fdf4;
        color: #14532d;
        font-size: 13px;
        font-family: inherit;
        text-align: left;
        cursor: pointer;
    }

    .saved-result:hover,
    .saved-result:focus-visible {
        background: #dcfce7;
        outline: 2px solid #22c55e;
        outline-offset: 2px;
    }

    .saved-result-meta {
        margin-top: 4px;
        font-size: 12px;
        opacity: 0.75;
    }

    .clear-saved-results {
        border: 0;
        padding: 0;
        background: transparent;
        color: #166534;
        font: inherit;
        font-size: 12px;
        font-weight: 700;
        cursor: pointer;
    }

    .saved-results-empty {
        margin: 0;
        font-size: 13px;
        opacity: 0.75;
    }

    @media (min-width: 700px) {
        .hm-shell {
            height: calc(100dvh - 76px);
        }

        .app-shell:has(.hm-shell) .bottom-nav {
            min-height: 64px;
        }

        .climate-compass {
            max-width: min(360px, 58dvh);
        }
    }
</style>

<script>
    (() => {
        const cookieName = 'klimaatkompas_uitslagen';
        const cookieMaxAge = 60 * 60 * 24 * 30;
        const priority = {{ $priority }};
        const activity = {{ $activity }};
        let currentResult = { priority, activity };
        const saveButton = document.getElementById('save-result-button');
        const toggleButton = document.getElementById('saved-results-toggle');
        const savedResults = document.getElementById('saved-results');
        const resultsList = document.getElementById('saved-results-list');
        const clearButton = document.getElementById('clear-saved-results');
        const scoreControls = document.getElementById('score-controls');
        const scoreControlsToggle = document.getElementById('score-controls-toggle');

        function readResults() {
            const cookie = document.cookie
                .split('; ')
                .find((entry) => entry.startsWith(`${cookieName}=`));

            if (!cookie) {
                return [];
            }

            try {
                const results = JSON.parse(decodeURIComponent(cookie.split('=').slice(1).join('=')));
                return Array.isArray(results) ? results : [];
            } catch {
                return [];
            }
        }

        function writeResults(results) {
            document.cookie = `${cookieName}=${encodeURIComponent(JSON.stringify(results))}; max-age=${cookieMaxAge}; path=/; samesite=lax`;
        }

        function resultLabel(result) {
            if (result.priority >= 0 && result.activity >= 0) return 'Actief & klimaatgericht';
            if (result.priority >= 0 && result.activity < 0) return 'Klimaatgericht & weinig actief';
            if (result.priority < 0 && result.activity >= 0) return 'Actief & lage klimaatprioriteit';
            return 'Weinig actief & lage klimaatprioriteit';
        }

        function renderResults() {
            const results = readResults();
            resultsList.replaceChildren();

            if (results.length === 0) {
                const emptyMessage = document.createElement('p');
                emptyMessage.className = 'saved-results-empty';
                emptyMessage.textContent = 'Je hebt nog geen uitslagen opgeslagen.';
                resultsList.appendChild(emptyMessage);
                return;
            }

            results.forEach((result) => {
                const item = document.createElement('button');
                item.type = 'button';
                item.className = 'saved-result';

                const label = document.createElement('strong');
                label.textContent = resultLabel(result);

                const meta = document.createElement('div');
                meta.className = 'saved-result-meta';
                meta.textContent = `Prioriteit ${result.priority} | Activiteit ${result.activity}`;

                const date = document.createElement('div');
                date.textContent = new Date(result.savedAt).toLocaleString('nl-NL');

                meta.appendChild(date);
                item.append(label, meta);
                item.addEventListener('click', () => updateCompass(result));
                resultsList.appendChild(item);
            });
        }

        function updateCompass(result) {
            const compassResult = document.getElementById('compass-result');
            const compassNote = document.getElementById('compass-note');
            const priorityValue = document.getElementById('priority-value');
            const activityValue = document.getElementById('activity-value');

            currentResult = {
                priority: Math.max(-100, Math.min(100, Number(result.priority))),
                activity: Math.max(-100, Math.min(100, Number(result.activity))),
            };

            compassResult.style.left = `${(currentResult.activity + 100) / 2}%`;
            compassResult.style.top = `${100 - ((currentResult.priority + 100) / 2)}%`;
            compassResult.title = `Klimaatprioriteit: ${currentResult.priority}, activiteit: ${currentResult.activity}`;
            compassNote.textContent = `Klimaatprioriteit: ${currentResult.priority} | Activiteit: ${currentResult.activity}`;
            document.getElementById('priority-score').textContent = currentResult.priority;
            document.getElementById('activity-score').textContent = currentResult.activity;
            priorityValue.textContent = currentResult.priority >= 0 ? 'Hoog' : 'Laag';
            activityValue.textContent = currentResult.activity >= 0 ? 'Hoog' : 'Laag';
        }

        document.querySelectorAll('[data-score-axis]').forEach((button) => {
            button.addEventListener('click', () => {
                const axis = button.dataset.scoreAxis;
                const step = Number(button.dataset.scoreStep);
                updateCompass({ ...currentResult, [axis]: currentResult[axis] + step });
            });
        });

        scoreControlsToggle.addEventListener('click', () => {
            const isHidden = scoreControls.hidden;
            scoreControls.hidden = !isHidden;
            scoreControlsToggle.setAttribute('aria-expanded', String(isHidden));
            scoreControlsToggle.setAttribute(
                'aria-label',
                isHidden ? 'Punten aanpassen verbergen' : 'Punten aanpassen tonen',
            );
        });

        saveButton.addEventListener('click', () => {
            const results = readResults();
            results.unshift({ ...currentResult, savedAt: new Date().toISOString() });
            writeResults(results.slice(0, 10));
            saveButton.querySelector('span:last-child').textContent = 'Uitslag opgeslagen';
            renderResults();
        });

        toggleButton.addEventListener('click', () => {
            const isHidden = savedResults.hidden;
            savedResults.hidden = !isHidden;
            toggleButton.setAttribute('aria-expanded', String(isHidden));
            if (isHidden) renderResults();
        });

        clearButton.addEventListener('click', () => {
            document.cookie = `${cookieName}=; max-age=0; path=/`;
            renderResults();
        });

        renderResults();
    })();
</script>
@endsection
