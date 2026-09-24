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
                    <button class="btn-cta" type="submit">+ Toevoegen</button>
                </div>
                @error('text')
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
                        <th>Aantal Eens</th>
                        <th>Aantal Oneens</th>
                    </tr>
                </thead>
                <tbody>
                    @forelse($statements ?? [] as $statement)
                        <tr>
                            <td>{{ $statement->id }}</td>
                            <td>{{ $statement->text }}</td>
                            <td>{{ $statement->aantal_eens }}</td>
                            <td>{{ $statement->aantal_oneens }}</td>
                        </tr>
                    @empty
                        <tr>
                            <td colspan="4" class="empty-state">Geen data gevonden</td>
                        </tr>
                    @endforelse
                </tbody>
            </table>
        </section>
    </main>
@endsection