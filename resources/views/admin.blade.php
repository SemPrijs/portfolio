@extends('layouts.app')

@section('title', 'Admin')

@section('layout')
    <main class="admin-page">
        <section class="admin-card">
            <span class="chip">Dashboard</span>
            <h2 class="page-title">Database overview</h2>
            <p class="subtitle">Bekijk de geregistreerde data in één overzicht.</p>

            @if(session('success'))
                <div class="status-badge" style="background:#d1fae5;color:#166534;margin-bottom:8px">{{ session('success') }}</div>
            @endif

            <form action="{{ route('admin.statements.store') }}" method="POST" style="margin-top:12px">
                @csrf
                <div style="display:flex;gap:8px;flex-wrap:wrap;align-items:center">
                    <input type="text" name="text" placeholder="Stelling tekst" value="{{ old('text') }}" required style="flex:1;padding:8px;border-radius:8px;border:1px solid #e5e7eb">
                    <select name="category" required style="padding:8px;border-radius:8px;border:1px solid #e5e7eb">
                        <option value="">Kies categorie</option>
                        <option value="activity" @selected(old('category') === 'activity')>Activiteit</option>
                        <option value="priority" @selected(old('category') === 'priority')>Prioriteit</option>
                    </select>
                    <button class="btn-cta" type="submit">+ Toevoegen</button>
                </div>
                @error('text')
                    <div class="empty-state" style="margin-top:6px;color:#dc2626">{{ $message }}</div>
                @enderror
                @error('category')
                    <div class="empty-state" style="margin-top:6px;color:#dc2626">{{ $message }}</div>
                @enderror
            </form>
        </section>

        <section class="admin-table-wrap">
            <table class="admin-table">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Stelling</th>
                        <th>Categorie</th>
                        <th>Aantal Eens</th>
                        <th>Aantal Oneens</th>
                    </tr>
                </thead>
                <tbody>
                    @forelse($statements ?? [] as $statement)
                        <tr>
                            <td>{{ $statement->id }}</td>
                            <td>{{ $statement->text }}</td>
                            <td>{{ $statement->category === 'activity' ? 'Activiteit' : ($statement->category === 'priority' ? 'Prioriteit' : 'Ongecategoriseerd') }}</td>
                            <td>{{ $statement->aantal_eens }}</td>
                            <td>{{ $statement->aantal_oneens }}</td>
                        </tr>
                    @empty
                        <tr>
                            <td colspan="5" class="empty-state">Geen data gevonden</td>
                        </tr>
                    @endforelse
                </tbody>
            </table>
            @if ($statements->hasPages())
                <nav class="admin-pagination" aria-label="Paginering stellingen">
                    @if ($statements->onFirstPage())
                        <span class="disabled">Vorige</span>
                    @else
                        <a href="{{ $statements->previousPageUrl() }}">Vorige</a>
                    @endif

                    <span>Pagina {{ $statements->currentPage() }} van {{ $statements->lastPage() }}</span>

                    @if ($statements->hasMorePages())
                        <a href="{{ $statements->nextPageUrl() }}">Volgende</a>
                    @else
                        <span class="disabled">Volgende</span>
                    @endif
                </nav>
            @endif
        </section>
    </main>
@endsection