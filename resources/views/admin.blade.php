<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Admin Page</title>
    <style>
        @import url('https://fonts.googleapis.com/css2?family=Nunito:wght@400;600;700;800;900&family=DM+Mono:wght@400;500&display=swap');

        html, body {
            height: 100%;
            margin: 0;
            padding: 0;
        }

        * { box-sizing: border-box; }

        body {
            background: #020817;
            display: flex;
            align-items: center;
            justify-content: center;
            font-family: 'Nunito', sans-serif;
            padding: 12px;
        }

        .wireframe-phone {
            width: min(390px, calc(100vw - 26px));
            height: clamp(560px, 78vh, 740px);
            max-height: calc(100vh - 24px);
            background: linear-gradient(180deg, #0f172a, #111827);
            border: 3px solid #22c55e;
            border-radius: 44px;
            overflow: hidden;
            position: relative;
            display: flex;
            flex-direction: column;
            box-shadow:
                0 0 0 7px #020817,
                0 0 0 9px #1e3a5f,
                0 32px 80px rgba(0,0,0,0.7);
        }

        .status-bar {
            height: 44px;
            display: flex;
            align-items: center;
            justify-content: space-between;
            padding: 0 22px;
            font-family: 'DM Mono', monospace;
            font-size: 11px;
            flex-shrink: 0;
            background: #0f172a;
            color: #fff;
        }

        .screen-header {
            display: flex;
            align-items: center;
            gap: 10px;
            padding: 0 16px;
            flex-shrink: 0;
            background: linear-gradient(135deg, #14532d, #166534);
            color: #fff;
            min-height: 60px;
        }

        .back-btn {
            background: rgba(255,255,255,0.2);
            border: 1.5px solid rgba(255,255,255,0.35);
            border-radius: 50%;
            width: 30px;
            height: 30px;
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 15px;
            color: #fff;
        }

        .admin-content {
            flex: 1;
            padding: 18px 16px 24px;
            overflow-y: auto;
            overflow-x: hidden;
            -webkit-overflow-scrolling: touch;
            background: linear-gradient(180deg, #0f172a, #111827);
        }

        .card {
            background: #111827;
            border: 2px solid #22c55e;
            border-radius: 20px;
            padding: 18px;
            box-shadow: 0 2px 12px rgba(0,0,0,0.2);
        }

        .page-title {
            margin: 0 0 12px;
            font-size: 28px;
            font-weight: 900;
            color: #dcfce7;
        }

        .subtitle {
            margin: 0 0 18px;
            font-size: 14px;
            font-weight: 700;
            color: #bbf7d0;
        }

        .chip {
            display: inline-flex;
            align-items: center;
            gap: 4px;
            background: rgba(34, 197, 94, 0.12);
            border: 1px solid rgba(34, 197, 94, 0.4);
            border-radius: 100px;
            padding: 6px 12px;
            font-size: 10px;
            font-weight: 800;
            letter-spacing: 0.05em;
            text-transform: uppercase;
            color: #dcfce7;
            margin-bottom: 12px;
        }

        .admin-table-wrap {
            margin-top: 18px;
            overflow: hidden;
            border-radius: 18px;
            border: 2px solid #22c55e;
            background: #0b1220;
            box-shadow: 0 2px 12px rgba(0,0,0,0.2);
        }

        .admin-table {
            width: 100%;
            border-collapse: collapse;
            font-size: 12px;
            color: #e2e8f0;
        }

        .admin-table th,
        .admin-table td {
            padding: 12px 10px;
            text-align: left;
            border-bottom: 1px solid rgba(34, 197, 94, 0.2);
        }

        .admin-table thead th {
            background: #14532d;
            color: #f0fdf4;
            font-size: 11px;
            text-transform: uppercase;
            letter-spacing: 0.05em;
        }

        .admin-table tbody tr:nth-child(even) {
            background: rgba(15, 23, 42, 0.9);
        }

        .admin-table tbody tr:hover {
            background: rgba(34, 197, 94, 0.12);
        }

        .status-badge {
            display: inline-block;
            padding: 5px 10px;
            border-radius: 999px;
            background: rgba(34, 197, 94, 0.18);
            color: #dcfce7;
            font-weight: 800;
        }

        .btn-cta {
            width: 100%;
            padding: 15px;
            background: linear-gradient(135deg, #f59e0b, #ef4444);
            color: #fff;
            border: none;
            border-radius: 100px;
            font-family: 'Nunito', sans-serif;
            font-size: 16px;
            font-weight: 900;
            cursor: pointer;
            display: flex;
            align-items: center;
            justify-content: center;
            gap: 8px;
            transition: transform 0.15s, box-shadow 0.15s;
            box-shadow: 0 4px 16px rgba(239,68,68,0.35), 0 2px 0 #b45309;
            letter-spacing: 0.02em;
            margin-top: 14px;
        }

        .btn-cta:hover { transform: translateY(-1px); }
    </style>
</head>
<body>
    <div class="wireframe-phone">
        <div class="status-bar">
            <span>▣ ▣ ▣</span>
        </div>

        <div class="screen-header">
            <div class="back-btn">←</div>
            <h1 style="margin:0; font-size: 1.1rem; font-weight: 900;">Admin</h1>
        </div>

        <main class="admin-content">
            <div class="card">
                <span class="chip">Dashboard</span>
                <h2 class="page-title">Database overview</h2>
                <p class="subtitle">Bekijk de geregistreerde data in één overzicht.</p>

                <button class="btn-cta" type="button">+ Nieuwe data</button>
            </div>

            <div class="admin-table-wrap">
                <table class="admin-table">
                    <thead>
                        <tr>
                            <th>Naam</th>
                            <th>E-mail</th>
                            <th>Status</th>
                            <th>Laatste login</th>
                        </tr>
                    </thead>
                    <tbody>
                        @forelse($adminAccounts ?? [] as $admin)
                            <tr>
                                <td>{{ $admin->name }}</td>
                                <td>{{ $admin->email }}</td>
                                <td>
                                    <span class="status-badge">
                                        {{ $admin->is_active ? 'Actief' : 'Inactief' }}
                                    </span>
                                </td>
                                <td>{{ $admin->last_login_at?->format('d-m-Y H:i') ?? 'Nog niet' }}</td>
                            </tr>
                        @empty
                            <tr>
                                <td colspan="4" style="text-align:center; padding: 18px; color:#166534; font-weight:700;">
                                    Geen data gevonden
                                </td>
                            </tr>
                        @endforelse
                    </tbody>
                </table>
            </div>
        </main>
    </div>
</body>
</html>