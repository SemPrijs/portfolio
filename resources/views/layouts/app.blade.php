<!DOCTYPE html>
<html lang="nl">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>@yield('title', 'KliMaten')</title>
        @vite(['resources/css/app.css', 'resources/js/app.js'])
    </head>
    <body>
        <div class="app-shell">
            <div class="status-bar top-gradient">
                <span class="status-app-name">KliMaten</span>
            </div>

            @yield('layout')

            <nav class="bottom-nav top-gradient" aria-label="Hoofdnavigatie">
                <a href="{{ route('home') }}" class="nav-item {{ request()->routeIs('home') ? 'active' : '' }}">
                    <span class="nav-pill"><span class="nav-icon">🏠</span></span>
                    <span class="nav-label">Home</span>
                </a>
                <a href="{{ route('speluitleg') }}" class="nav-item {{ request()->routeIs('speluitleg') ? 'active' : '' }}">
                    <span class="nav-pill"><span class="nav-icon">🎮</span></span>
                    <span class="nav-label">Spel</span>
                </a>
                <a href="{{ route('leren') }}" class="nav-item {{ request()->routeIs('leren') ? 'active' : '' }}">
                    <span class="nav-pill"><span class="nav-icon">📚</span></span>
                    <span class="nav-label">Leren</span>
                </a>
                <a href="{{ route('home') }}" class="nav-item">
                    <span class="nav-pill"><span class="nav-icon">🧭</span></span>
                    <span class="nav-label">Kompas</span>
                </a>
            </nav>
        </div>
    </body>
</html>
