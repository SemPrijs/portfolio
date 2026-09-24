@extends('layouts.app')

@section('title', 'Admin')

@section('layout')
    <main class="admin-page">
        <section class="admin-card">
            <span class="chip">Dashboard</span>
            <h2 class="page-title">Database overview</h2>
            <p class="subtitle">Bekijk de geregistreerde data in één overzicht.</p>

            <button class="btn-cta" type="button">+ Nieuwe data</button>
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
                    @forelse($users ?? [] as $user)
                        <tr>
                            <td>{{ $user->id }}</td>
                            <td>{{ $user->name }}</td>
                            <td>{{ $user->email }}</td>
                            <td><span class="status-badge">Actief</span></td>
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