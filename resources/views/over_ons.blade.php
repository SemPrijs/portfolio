@php
    $team = [
        ['name' => 'Mila', 'role' => 'Projectleider', 'bio' => 'Zorgt voor een duidelijke visie en de voortgang van het project.'],
        ['name' => 'Sam', 'role' => 'UX Designer', 'bio' => 'Ontwerpt de ervaring en houdt de gebruiksvriendelijkheid scherp.'],
        ['name' => 'Noah', 'role' => 'Developer', 'bio' => 'Bouwt de functionaliteit en zorgt voor een stabiele ervaring.'],
    ];
@endphp

<!DOCTYPE html>
<html lang="nl">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Over ons</title>
    <style>
        @import url('https://fonts.googleapis.com/css2?family=Nunito:wght@400;600;700;800;900&family=DM+Mono:wght@400;500&display=swap');

        html, body {
            height: 100%;
            margin: 0;
            padding: 0;
        }

        * { box-sizing: border-box; }

        body {
            background: #0f172a;
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
            background: #f0fdf4;
            border: 3px solid #166534;
            border-radius: 44px;
            overflow: hidden;
            position: relative;
            display: flex;
            flex-direction: column;
            box-shadow:
                0 0 0 7px #0f172a,
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
            text-decoration: none;
        }

        .admin-content {
            flex: 1;
            padding: 18px 16px 26px;
            overflow-y: auto;
            overflow-x: hidden;
            -webkit-overflow-scrolling: touch;
            background: linear-gradient(180deg, #ecfdf5, #f0fdf4);
        }

        .card {
            background: #fff;
            border: 2px solid #bbf7d0;
            border-radius: 20px;
            padding: 18px;
            box-shadow: 0 2px 12px rgba(0,0,0,0.06);
            margin-bottom: 18px;
        }

        .chip {
            display: inline-flex;
            align-items: center;
            gap: 4px;
            background: rgba(22, 101, 52, 0.1);
            border: 1px solid rgba(22, 101, 52, 0.25);
            border-radius: 100px;
            padding: 6px 12px;
            font-size: 10px;
            font-weight: 800;
            letter-spacing: 0.05em;
            text-transform: uppercase;
            color: #166534;
            margin-bottom: 12px;
        }

        .page-title {
            margin: 0 0 12px;
            font-size: 28px;
            font-weight: 900;
            color: #14532d;
            line-height: 1.1;
        }

        .subtitle {
            margin: 0;
            font-size: 14px;
            line-height: 1.7;
            color: #166534;
        }

        .feature-box {
            background: linear-gradient(135deg, #ecfdf5, #d1fae5);
            border: 2px solid #6ee7b7;
            border-left: 5px solid #10b981;
            border-radius: 16px;
            padding: 14px 16px;
            margin-top: 16px;
        }

        .feature-box h3 {
            margin: 0 0 8px;
            font-size: 16px;
            color: #14532d;
        }

        .feature-box p {
            margin: 0;
            font-size: 13px;
            line-height: 1.6;
            color: #166534;
        }

        .team-grid {
            display: grid;
            gap: 12px;
            margin-top: 18px;
        }

        .team-member {
            background: #fff;
            border: 2px solid #bbf7d0;
            border-radius: 18px;
            padding: 14px;
            box-shadow: 0 2px 12px rgba(0,0,0,0.05);
        }

        .team-member .avatar {
            width: 42px;
            height: 42px;
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            background: linear-gradient(135deg, #bbf7d0, #86efac);
            color: #14532d;
            font-weight: 900;
            margin-bottom: 10px;
        }

        .team-member h4 {
            margin: 0 0 4px;
            font-size: 16px;
            color: #14532d;
        }

        .team-member .role {
            margin: 0 0 8px;
            font-size: 11px;
            font-weight: 800;
            letter-spacing: 0.06em;
            text-transform: uppercase;
            color: #15803d;
        }

        .team-member p {
            margin: 0;
            font-size: 13px;
            line-height: 1.6;
            color: #166534;
        }

        .cta-row {
            margin-top: 18px;
            display: flex;
            gap: 10px;
            flex-direction: column;
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
            text-decoration: none;
        }

        .btn-outline {
            width: 100%;
            padding: 13px;
            background: rgba(255,255,255,0.7);
            color: #166534;
            border: 2px solid #86efac;
            border-radius: 100px;
            font-family: 'Nunito', sans-serif;
            font-size: 14px;
            font-weight: 800;
            cursor: pointer;
            display: flex;
            align-items: center;
            justify-content: center;
            gap: 6px;
            transition: all 0.15s;
            text-decoration: none;
            backdrop-filter: blur(4px);
        }
    </style>
</head>
<body>
    <div class="wireframe-phone">
        <div class="status-bar">
            <span>9:41</span>
            <span>▣ ▣ ▣</span>
        </div>

        <div class="screen-header">
            <a class="back-btn" href="{{ route('home') }}" aria-label="Terug naar home">←</a>
            <h1 style="margin:0; font-size:1.1rem; font-weight:900;">Over ons</h1>
        </div>

        <main class="admin-content">
            <section class="card">
                <span class="chip">Ons verhaal</span>
                <h2 class="page-title">Wij bouwen aan een duurzamere toekomst.</h2>
                <p class="subtitle">
                    We geloven dat kleine stappen samen grote impact kunnen maken. Daarom helpen we mensen om beter te begrijpen hoe hun keuzes invloed hebben op klimaat, natuur en samenleving.
                </p>

                <div class="feature-box">
                    <h3>Onze missie</h3>
                    <p>We willen kennis toegankelijk, duidelijk en inspirerend maken zodat iedereen met vertrouwen kan handelen.</p>
                </div>
            </section>

            <section class="card">
                <span class="chip">Team</span>
                <div class="team-grid">
                    @foreach ($team as $member)
                        <article class="team-member">
                            <div class="avatar">{{ strtoupper(substr($member['name'], 0, 1)) }}</div>
                            <h4>{{ $member['name'] }}</h4>
                            <p class="role">{{ $member['role'] }}</p>
                            <p>{{ $member['bio'] }}</p>
                        </article>
                    @endforeach
                </div>
            </section>

            <section class="card">
                <span class="chip">Contact</span>
                <p class="subtitle">
                    Heb je vragen, ideeën of wil je samenwerken? Neem contact met ons op en laten we samen iets betekenen.
                </p>

                <div class="cta-row">
                    <a class="btn-cta" href="mailto:info@klimaten.nl">✉️ Contact opnemen</a>
                    <a class="btn-outline" href="{{ route('home') }}">🏠 Terug naar home</a>
                </div>
            </section>
        </main>
    </div>
</body>
</html>
