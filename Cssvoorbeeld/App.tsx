import { useState } from "react";

type Screen =
  | "home"
  | "speluitleg"
  | "educatie"
  | "educatie-detail"
  | "klimaatkompas"
  | "game-transition"
  | "spel"
  | "resultaat"
  | "over-ons"
  | "admin";

const PHONE_W = 390;
const PHONE_H = 844;
const STATUS_H = 44;
const NAV_H = 68;
const HEADER_H = 52;

const TOPICS = [
  { id: "klimaat",      label: "Klimaatverandering", icon: "🌡️", color: "#f97316", bg: "#fff7ed", border: "#fed7aa" },
  { id: "energie",      label: "Energie",             icon: "⚡",  color: "#eab308", bg: "#fefce8", border: "#fde68a" },
  { id: "voeding",      label: "Voeding",             icon: "🥦",  color: "#22c55e", bg: "#f0fdf4", border: "#bbf7d0" },
  { id: "afval",        label: "Afval & recycling",   icon: "♻️",  color: "#3b82f6", bg: "#eff6ff", border: "#bfdbfe" },
  { id: "vervoer",      label: "Vervoer",             icon: "🚲",  color: "#8b5cf6", bg: "#f5f3ff", border: "#ddd6fe" },
  { id: "duurzaamheid", label: "Duurzaamheid",        icon: "🌍",  color: "#10b981", bg: "#ecfdf5", border: "#6ee7b7" },
];

const STELLINGEN = [
  { id: 1,  topic: "vervoer",      icon: "🚲", text: "Ik kies liever de fiets of het OV dan de auto.",                                           a: 1,  c: 0  },
  { id: 2,  topic: "vervoer",      icon: "🚗", text: "Elektrische auto's zouden fors gesubsidieerd moeten worden door de overheid.",               a: 0,  c: 1  },
  { id: 3,  topic: "voeding",      icon: "🥩", text: "Ik probeer bewust minder vlees te eten vanwege het klimaat.",                                a: 1,  c: 0  },
  { id: 4,  topic: "voeding",      icon: "🛒", text: "Supermarkten zouden minder vleesproducten mogen aanbieden.",                                 a: 0,  c: 1  },
  { id: 5,  topic: "energie",      icon: "☀️", text: "Ik zou zonnepanelen op mijn huis willen als dat mogelijk is.",                               a: 1,  c: 0  },
  { id: 6,  topic: "energie",      icon: "💨", text: "Windparken op zee zijn een goed idee, ook al kosten ze veel.",                               a: 0,  c: 1  },
  { id: 7,  topic: "afval",        icon: "🗑️", text: "Ik sorteer thuis mijn afval altijd nauwkeurig.",                                             a: 1,  c: 0  },
  { id: 8,  topic: "afval",        icon: "📦", text: "Bedrijven moeten wettelijk verantwoordelijk zijn voor het afval van hun producten.",          a: 0,  c: 1  },
  { id: 9,  topic: "klimaat",      icon: "🌡️", text: "Klimaatverandering is een van de grootste problemen van onze tijd.",                         a: 1,  c: 1  },
  { id: 10, topic: "klimaat",      icon: "🤔", text: "De mens heeft weinig invloed op het klimaat — het verandert van nature.",                    a: -1, c: -1 },
  { id: 11, topic: "duurzaamheid", icon: "💚", text: "Ik kijk bij aankopen bewust of een product duurzaam gemaakt is.",                            a: 1,  c: 0  },
  { id: 12, topic: "duurzaamheid", icon: "🏛️", text: "De overheid moet strengere regels opleggen aan bedrijven die slecht zijn voor het klimaat.", a: 0,  c: 1  },
];

// Mock admin vote data (eens %)
const ADMIN_VOTES: Record<number, { eens: number; total: number }> = {
  1:  { eens: 72, total: 1243 },
  2:  { eens: 58, total: 1198 },
  3:  { eens: 64, total: 1301 },
  4:  { eens: 41, total: 1189 },
  5:  { eens: 83, total: 1356 },
  6:  { eens: 67, total: 1211 },
  7:  { eens: 55, total: 1278 },
  8:  { eens: 76, total: 1334 },
  9:  { eens: 88, total: 1402 },
  10: { eens: 19, total: 1187 },
  11: { eens: 49, total: 1223 },
  12: { eens: 71, total: 1315 },
};

const TRANSITIONS: Record<string, { emoji: string; label: string; feit: string; sub: string }> = {
  vervoer:      { emoji: "🚲", label: "Vervoer",       feit: "Transport is verantwoordelijk voor 25% van alle CO₂-uitstoot in Europa.", sub: "Elke autorit die je niet maakt scheelt gemiddeld 150g CO₂ per kilometer." },
  voeding:      { emoji: "🥦", label: "Voeding",       feit: "De veeteelt produceert meer broeikasgassen dan alle vliegtuigen ter wereld samen.", sub: "Eén biefstuk kost de planeet 27 kg CO₂. Een vegaburger? Slechts 1 kg." },
  energie:      { emoji: "⚡", label: "Energie",       feit: "Zonnepanelen op alle Nederlandse daken kunnen 50% van ons stroomverbruik dekken.", sub: "Zon en wind zijn inmiddels goedkoper dan kolen- en gascentrales." },
  afval:        { emoji: "♻️", label: "Afval",         feit: "Slechts 9% van alle plastic dat ooit geproduceerd is, wordt gerecycled.", sub: "Een plastic flesje duurt 450 jaar om af te breken in de natuur." },
  klimaat:      { emoji: "🌡️", label: "Klimaat",      feit: "De afgelopen 10 jaar waren de warmste ooit gemeten op aarde.", sub: "Bij 1,5°C opwarming verdwijnen bijna alle koraalriffen op de wereld." },
  duurzaamheid: { emoji: "🌍", label: "Duurzaamheid", feit: "Als iedereen leeft zoals een gemiddelde Nederlander, hebben we 3,6 aardes nodig.", sub: "Kleine keuzes in je dagelijks leven hebben samen een enorm effect." },
};

const GRADIENTS = {
  home:       "linear-gradient(160deg, #166534 0%, #15803d 40%, #0d9488 100%)",
  speluitleg: "linear-gradient(160deg, #1d4ed8 0%, #0891b2 100%)",
  educatie:   "linear-gradient(160deg, #166534 0%, #15803d 100%)",
  detail:     "linear-gradient(160deg, #166534 0%, #0d9488 100%)",
  kompas:     "linear-gradient(160deg, #4f46e5 0%, #0891b2 100%)",
  transition: "linear-gradient(160deg, #d97706 0%, #dc2626 100%)",
  spel:       "linear-gradient(160deg, #1d4ed8 0%, #4f46e5 100%)",
  resultaat:  "linear-gradient(160deg, #166534 0%, #4f46e5 100%)",
  overOns:    "linear-gradient(160deg, #0f766e 0%, #0891b2 100%)",
  admin:      "linear-gradient(160deg, #1e293b 0%, #334155 100%)",
};

// ── Shared components ─────────────────────────────────────────────────────────
function StatusBar({ gradient }: { gradient: string }) {
  return (
    <div className="status-bar" style={{ height: STATUS_H, background: gradient, color: "rgba(255,255,255,0.85)" }}>
      <span style={{ fontWeight: 500 }}>9:41</span>
      <span style={{ fontWeight: 700, fontSize: 12, letterSpacing: "0.06em" }}>KliMaten</span>
      <span>▪▪▪</span>
    </div>
  );
}

function BottomNav({ active, gradient, navigate }: { active: Screen; gradient: string; navigate: (s: Screen) => void }) {
  const items: { label: string; screen: Screen; icon: string }[] = [
    { label: "Home",    screen: "home",          icon: "🏠" },
    { label: "Spel",    screen: "spel",          icon: "🎮" },
    { label: "Leren",   screen: "educatie",      icon: "📚" },
    { label: "Kompas",  screen: "klimaatkompas", icon: "🧭" },
    { label: "Admin",   screen: "admin",         icon: "⚙️" },
  ];
  return (
    <div className="bottom-nav" style={{ height: NAV_H, background: gradient }}>
      {items.map((item) => {
        const isActive =
          active === item.screen ||
          (active === "educatie-detail" && item.screen === "educatie") ||
          (active === "speluitleg" && item.screen === "spel") ||
          (active === "game-transition" && item.screen === "spel") ||
          (active === "resultaat" && item.screen === "spel") ||
          (active === "over-ons" && item.screen === "home");
        const isAdmin = item.screen === "admin";
        return (
          <button
            key={item.screen}
            className={`nav-item ${isActive ? "active" : ""}`}
            onClick={() => navigate(item.screen)}
            style={isAdmin ? { borderLeft: "1px solid rgba(255,255,255,0.15)" } : {}}
          >
            <div className="nav-pill">
              <div className="nav-icon" style={{ fontSize: isActive ? 20 : 17, transform: isActive ? "scale(1.15)" : "scale(1)", transition: "all 0.2s" }}>
                {item.icon}
              </div>
              <span className="nav-label" style={{ color: isAdmin && !isActive ? "rgba(255,255,255,0.4)" : isActive ? "#fff" : "rgba(255,255,255,0.6)" }}>
                {item.label}
              </span>
            </div>
          </button>
        );
      })}
    </div>
  );
}

function ScreenHeader({ title, gradient, onBack }: { title: string; gradient: string; onBack?: () => void }) {
  return (
    <div className="screen-header" style={{ height: HEADER_H, background: gradient }}>
      {onBack && <button className="back-btn" onClick={onBack}>←</button>}
      <span style={{ fontWeight: 900, fontSize: 15, color: "#fff" }}>{title}</span>
    </div>
  );
}

function ImgPh({ label, height = 90, emoji = "🖼️" }: { label: string; height?: number; emoji?: string }) {
  return (
    <div className="img-ph" style={{ height, borderRadius: 16, width: "100%", flexShrink: 0 }}>
      <span style={{ fontSize: 24 }}>{emoji}</span>
      <span>{label}</span>
    </div>
  );
}

// ── HOME ──────────────────────────────────────────────────────────────────────
function HomeScreen({ navigate }: { navigate: (s: Screen) => void }) {
  const contentH = PHONE_H - STATUS_H - NAV_H;
  return (
    <div style={{ height: contentH, display: "flex", flexDirection: "column", overflow: "hidden" }}>
      <div style={{ background: GRADIENTS.home, padding: "18px 20px 20px", flexShrink: 0, position: "relative" }}>
        <div style={{ position: "absolute", top: -20, right: -20, width: 100, height: 100, borderRadius: "50%", background: "rgba(255,255,255,0.07)" }} />
        <div className="chip" style={{ marginBottom: 10 }}>🌱 Klimaat &amp; Duurzaamheid</div>
        <div style={{ fontSize: 36, fontWeight: 900, color: "#fff", letterSpacing: "-0.03em", lineHeight: 1, marginBottom: 6 }}>KliMaten 🌍</div>
        <div style={{ fontSize: 13, color: "rgba(255,255,255,0.8)", lineHeight: 1.5 }}>Ontdek jouw klimaatpositie. Beantwoord stellingen en leer meer!</div>
      </div>
      <div style={{ padding: "10px 16px 0", flexShrink: 0 }}>
        <ImgPh label="Illustratie klimaat & natuur" height={78} emoji="🌿" />
      </div>
      <div style={{ padding: "10px 16px", display: "flex", flexDirection: "column", gap: 8, flex: 1 }}>
        <button className="btn-cta" onClick={() => navigate("game-transition")}>🎮 Start het spel!</button>
        <button className="btn-outline" onClick={() => navigate("speluitleg")}>❓ Hoe werkt het?</button>
        <button className="btn-outline" onClick={() => navigate("educatie")}>📚 Leer over klimaat</button>
        <button className="btn-outline" onClick={() => navigate("klimaatkompas")}>🧭 Wat is het klimaatkompas?</button>
        <button className="btn-outline" onClick={() => navigate("over-ons")}>🏢 Over ons</button>
      </div>
      <div style={{ padding: "6px 16px 10px", flexShrink: 0, textAlign: "center" }}>
        <span style={{ fontSize: 11, fontWeight: 700, color: "#15803d" }}>✨ Geen account nodig · Gratis · Voor iedereen</span>
      </div>
    </div>
  );
}

// ── OVER ONS ──────────────────────────────────────────────────────────────────
function OverOnsScreen({ navigate }: { navigate: (s: Screen) => void }) {
  const contentH = PHONE_H - STATUS_H - NAV_H - HEADER_H;
  const teamleden = [
    { naam: "Sarah de Vries",   rol: "Oprichter & CEO",         emoji: "👩‍💼" },
    { naam: "Thomas Bakker",    rol: "Klimaatexpert",            emoji: "👨‍🔬" },
    { naam: "Lena Müller",      rol: "UX & Educatie",           emoji: "👩‍🎨" },
    { naam: "Daan Jansen",      rol: "Data & Onderzoek",        emoji: "👨‍💻" },
  ];
  return (
    <>
      <ScreenHeader title="🏢 Over ons" gradient={GRADIENTS.overOns} onBack={() => navigate("home")} />
      <div style={{ height: contentH, display: "flex", flexDirection: "column", overflow: "hidden", padding: "10px 16px", gap: 10, background: "#f0fdfa" }}>
        {/* Mission */}
        <div style={{ background: "linear-gradient(135deg, #0f766e, #0891b2)", borderRadius: 18, padding: "16px", flexShrink: 0, position: "relative", overflow: "hidden" }}>
          <div style={{ position: "absolute", top: -16, right: -16, width: 80, height: 80, borderRadius: "50%", background: "rgba(255,255,255,0.08)" }} />
          <div style={{ fontFamily: "DM Mono, monospace", fontSize: 9, color: "#99f6e4", letterSpacing: "0.12em", textTransform: "uppercase", marginBottom: 6 }}>Onze missie</div>
          <div style={{ fontSize: 15, fontWeight: 900, color: "#fff", lineHeight: 1.4, marginBottom: 6 }}>
            Klimaatbewustzijn toegankelijk maken voor iedereen 🌱
          </div>
          <div style={{ fontSize: 12, color: "rgba(255,255,255,0.8)", lineHeight: 1.5 }}>
            KliMaten helpt jongeren en gezinnen om op een speelse manier meer te leren over klimaat en duurzaamheid.
          </div>
        </div>

        {/* Stats row */}
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 8, flexShrink: 0 }}>
          {[
            { num: "14.2K", label: "Spelers",    emoji: "👥" },
            { num: "98%",   label: "Positief",   emoji: "⭐" },
            { num: "2021",  label: "Opgericht",  emoji: "📅" },
          ].map((stat) => (
            <div key={stat.label} style={{ background: "#fff", border: "2px solid #99f6e4", borderRadius: 14, padding: "10px 8px", textAlign: "center" }}>
              <div style={{ fontSize: 16 }}>{stat.emoji}</div>
              <div style={{ fontSize: 15, fontWeight: 900, color: "#0f766e" }}>{stat.num}</div>
              <div style={{ fontSize: 9, color: "#0d9488", fontWeight: 700, fontFamily: "DM Mono, monospace", textTransform: "uppercase" }}>{stat.label}</div>
            </div>
          ))}
        </div>

        {/* About text */}
        <div className="card" style={{ borderColor: "#99f6e4", flexShrink: 0, padding: "11px 13px" }}>
          <div style={{ fontWeight: 900, fontSize: 13, color: "#0f766e", marginBottom: 6 }}>💡 Wie zijn wij?</div>
          <div style={{ fontSize: 12, color: "#374151", fontWeight: 600, lineHeight: 1.55 }}>
            KliMaten is een initiatief van een groep klimaatonderzoekers, educators en designers. We geloven dat klimaatbewustzijn begint met goede informatie — op een manier die iedereen begrijpt, van 10 tot 70 jaar.
          </div>
        </div>

        {/* Team */}
        <div style={{ flex: 1 }}>
          <div style={{ fontWeight: 900, fontSize: 13, color: "#0f766e", marginBottom: 8 }}>👋 Ons team</div>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8 }}>
            {teamleden.map((lid) => (
              <div key={lid.naam} style={{ background: "#fff", border: "2px solid #ccfbf1", borderRadius: 14, padding: "10px 10px", display: "flex", flexDirection: "column", gap: 4 }}>
                <div style={{ fontSize: 22 }}>{lid.emoji}</div>
                <div style={{ fontSize: 11, fontWeight: 900, color: "#134e4a", lineHeight: 1.2 }}>{lid.naam}</div>
                <div style={{ fontSize: 10, color: "#0d9488", fontWeight: 700 }}>{lid.rol}</div>
              </div>
            ))}
          </div>
        </div>

        <button className="btn-cta" style={{ flexShrink: 0 }} onClick={() => navigate("game-transition")}>
          🎮 Speel nu mee!
        </button>
      </div>
    </>
  );
}

// ── ADMIN ──────────────────────────────────────────────────────────────────────
function AdminScreen() {
  const [filter, setFilter] = useState<string>("alle");
  const contentH = PHONE_H - STATUS_H - NAV_H - HEADER_H;

  const totaalSpelers = 1402;
  const filtered = filter === "alle"
    ? STELLINGEN
    : STELLINGEN.filter((s) => s.topic === filter);

  const topicLabels = [
    { id: "alle", label: "Alle", emoji: "📋" },
    { id: "vervoer", label: "Vervoer", emoji: "🚲" },
    { id: "voeding", label: "Voeding", emoji: "🥦" },
    { id: "energie", label: "Energie", emoji: "⚡" },
    { id: "afval", label: "Afval", emoji: "♻️" },
    { id: "klimaat", label: "Klimaat", emoji: "🌡️" },
    { id: "duurzaamheid", label: "Duurz.", emoji: "🌍" },
  ];

  return (
    <>
      <ScreenHeader title="⚙️ Admin — Stemresultaten" gradient={GRADIENTS.admin} />
      <div style={{ height: contentH, display: "flex", flexDirection: "column", overflow: "hidden", background: "#0f172a" }}>
        {/* Stats bar */}
        <div style={{ padding: "10px 14px 0", flexShrink: 0 }}>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 7 }}>
            {[
              { label: "Totaal spelers", val: "14,402" },
              { label: "Stellingen",     val: "12"     },
            ].map((s) => (
              <div key={s.label} style={{ background: "#1e293b", border: "1px solid #334155", borderRadius: 12, padding: "8px 8px", textAlign: "center" }}>
                <div style={{ fontSize: 14, fontWeight: 900, color: "#e2e8f0" }}>{s.val}</div>
                <div style={{ fontSize: 8, color: "#64748b", fontFamily: "DM Mono, monospace", textTransform: "uppercase", lineHeight: 1.3 }}>{s.label}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Filter pills */}
        <div style={{ padding: "8px 14px", flexShrink: 0, display: "flex", gap: 5, overflowX: "auto" }}>
          {topicLabels.map((t) => (
            <button
              key={t.id}
              onClick={() => setFilter(t.id)}
              style={{ background: filter === t.id ? "#3b82f6" : "#1e293b", border: `1px solid ${filter === t.id ? "#3b82f6" : "#334155"}`, borderRadius: 100, padding: "4px 10px", fontFamily: "Nunito, sans-serif", fontSize: 10, fontWeight: 800, color: filter === t.id ? "#fff" : "#64748b", cursor: "pointer", whiteSpace: "nowrap", flexShrink: 0, display: "flex", alignItems: "center", gap: 3, transition: "all 0.15s" }}
            >
              <span>{t.emoji}</span> {t.label}
            </button>
          ))}
        </div>

        {/* Table header */}
        <div style={{ padding: "0 14px 6px", flexShrink: 0 }}>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 56px 56px 52px", gap: 6, padding: "6px 10px", borderRadius: 8, background: "#1e293b", border: "1px solid #334155" }}>
            <div style={{ fontFamily: "DM Mono, monospace", fontSize: 8, color: "#64748b", textTransform: "uppercase", letterSpacing: "0.08em" }}>Stelling</div>
            <div style={{ fontFamily: "DM Mono, monospace", fontSize: 8, color: "#22c55e", textTransform: "uppercase", letterSpacing: "0.08em", textAlign: "center" }}>Eens</div>
            <div style={{ fontFamily: "DM Mono, monospace", fontSize: 8, color: "#ef4444", textTransform: "uppercase", letterSpacing: "0.08em", textAlign: "center" }}>Oneens</div>
            <div style={{ fontFamily: "DM Mono, monospace", fontSize: 8, color: "#64748b", textTransform: "uppercase", letterSpacing: "0.08em", textAlign: "center" }}>Totaal</div>
          </div>
        </div>

        {/* Table rows */}
        <div style={{ flex: 1, overflowY: "auto", padding: "0 14px 10px", display: "flex", flexDirection: "column", gap: 5 }}>
          {filtered.map((stelling) => {
            const vote = ADMIN_VOTES[stelling.id];
            const eensPct = vote.eens;
            const oneensPct = 100 - eensPct;
            const topicColor = TOPICS.find((t) => t.id === stelling.topic)?.color ?? "#6b7280";
            return (
              <div key={stelling.id} style={{ background: "#1e293b", border: "1px solid #334155", borderRadius: 12, padding: "10px 10px", display: "flex", flexDirection: "column", gap: 7 }}>
                {/* Top row */}
                <div style={{ display: "flex", gap: 7, alignItems: "flex-start" }}>
                  <div style={{ width: 28, height: 28, background: "#0f172a", borderRadius: 8, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 15, flexShrink: 0 }}>
                    {stelling.icon}
                  </div>
                  <div style={{ flex: 1 }}>
                    <div style={{ display: "flex", alignItems: "center", gap: 5, marginBottom: 3 }}>
                      <div style={{ fontFamily: "DM Mono, monospace", fontSize: 8, color: topicColor, fontWeight: 500, textTransform: "uppercase", letterSpacing: "0.06em" }}>
                        #{stelling.id} · {stelling.topic}
                      </div>
                    </div>
                    <div style={{ fontSize: 11, fontWeight: 700, color: "#cbd5e1", lineHeight: 1.4 }}>
                      {stelling.text.length > 72 ? stelling.text.slice(0, 72) + "…" : stelling.text}
                    </div>
                  </div>
                </div>

                {/* Bar */}
                <div style={{ display: "flex", height: 8, borderRadius: 100, overflow: "hidden", gap: 2 }}>
                  <div style={{ width: `${eensPct}%`, background: "linear-gradient(90deg, #16a34a, #22c55e)", borderRadius: "100px 0 0 100px", transition: "width 0.4s" }} />
                  <div style={{ flex: 1, background: "linear-gradient(90deg, #dc2626, #ef4444)", borderRadius: "0 100px 100px 0" }} />
                </div>

                {/* Percentages row */}
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 4 }}>
                  <div style={{ background: "#052e16", border: "1px solid #166534", borderRadius: 8, padding: "5px 6px", textAlign: "center" }}>
                    <div style={{ fontFamily: "DM Mono, monospace", fontSize: 13, fontWeight: 700, color: "#4ade80" }}>{eensPct}%</div>
                    <div style={{ fontFamily: "DM Mono, monospace", fontSize: 7, color: "#16a34a", textTransform: "uppercase" }}>Eens</div>
                  </div>
                  <div style={{ background: "#450a0a", border: "1px solid #991b1b", borderRadius: 8, padding: "5px 6px", textAlign: "center" }}>
                    <div style={{ fontFamily: "DM Mono, monospace", fontSize: 13, fontWeight: 700, color: "#f87171" }}>{oneensPct}%</div>
                    <div style={{ fontFamily: "DM Mono, monospace", fontSize: 7, color: "#dc2626", textTransform: "uppercase" }}>Oneens</div>
                  </div>
                  <div style={{ background: "#1e293b", border: "1px solid #334155", borderRadius: 8, padding: "5px 6px", textAlign: "center" }}>
                    <div style={{ fontFamily: "DM Mono, monospace", fontSize: 11, fontWeight: 700, color: "#94a3b8" }}>{vote.total.toLocaleString("nl")}</div>
                    <div style={{ fontFamily: "DM Mono, monospace", fontSize: 7, color: "#64748b", textTransform: "uppercase" }}>Stemmen</div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
}

// ── SPELUITLEG ─────────────────────────────────────────────────────────────────
function SpeluitlegScreen({ navigate }: { navigate: (s: Screen) => void }) {
  const contentH = PHONE_H - STATUS_H - NAV_H - HEADER_H;
  return (
    <>
      <ScreenHeader title="🎮 Hoe werkt het spel?" gradient={GRADIENTS.speluitleg} onBack={() => navigate("home")} />
      <div style={{ height: contentH, display: "flex", flexDirection: "column", overflow: "hidden", padding: "12px 16px", gap: 10, background: "#f0f9ff" }}>
        <div style={{ fontSize: 13, color: "#0c4a6e", fontWeight: 600, flexShrink: 0, lineHeight: 1.5 }}>Beantwoord stellingen over klimaat en duurzaamheid — zo simpel is het! 🙌</div>
        <div style={{ flexShrink: 0, position: "relative", paddingBottom: 6 }}>
          <div style={{ position: "absolute", top: 10, left: 10, right: 10, height: 90, background: "#dbeafe", border: "2px solid #93c5fd", borderRadius: 20, transform: "rotate(-2deg)" }} />
          <div className="swipe-card">
            <div style={{ fontFamily: "DM Mono, monospace", fontSize: 9, color: "#3b82f6", letterSpacing: "0.1em", textTransform: "uppercase", fontWeight: 500, marginBottom: 6 }}>Voorbeeld stelling</div>
            <div style={{ fontSize: 14, fontWeight: 800, color: "#1e3a5f", lineHeight: 1.35 }}>"Elektrische auto's zijn goed voor het klimaat." 🚗⚡</div>
            <div style={{ display: "flex", justifyContent: "center", gap: 40, marginTop: 14 }}>
              <div style={{ textAlign: "center", background: "#dcfce7", borderRadius: 12, padding: "8px 16px", border: "2px solid #86efac" }}>
                <div style={{ fontSize: 22 }}>👍</div>
                <div style={{ fontSize: 9, color: "#16a34a", fontWeight: 900, fontFamily: "Nunito, sans-serif" }}>EENS</div>
              </div>
              <div style={{ textAlign: "center", background: "#fee2e2", borderRadius: 12, padding: "8px 16px", border: "2px solid #fca5a5" }}>
                <div style={{ fontSize: 22 }}>👎</div>
                <div style={{ fontSize: 9, color: "#dc2626", fontWeight: 900, fontFamily: "Nunito, sans-serif" }}>ONEENS</div>
              </div>
            </div>
          </div>
        </div>
        <div className="card" style={{ borderColor: "#bfdbfe", flexShrink: 0 }}>
          <div style={{ fontWeight: 900, fontSize: 13, color: "#1e3a5f", marginBottom: 9 }}>Spelregels 📋</div>
          <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
            {[
              { emoji: "👆", text: "Swipe omhoog = eens",                  pill: "#dcfce7" },
              { emoji: "👇", text: "Swipe omlaag = oneens",                pill: "#fee2e2" },
              { emoji: "🧭", text: "Elk antwoord beïnvloedt jouw kompas", pill: "#ede9fe" },
              { emoji: "💡", text: "Tussendoor leer je klimaatfeiten",     pill: "#fef3c7" },
            ].map((rule, i) => (
              <div key={i} style={{ display: "flex", gap: 8, alignItems: "center" }}>
                <div style={{ width: 28, height: 28, background: rule.pill, borderRadius: 9, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 15, flexShrink: 0 }}>{rule.emoji}</div>
                <div style={{ fontSize: 13, color: "#0c4a6e", fontWeight: 600 }}>{rule.text}</div>
              </div>
            ))}
          </div>
        </div>
        <button className="btn-cta" style={{ flexShrink: 0, marginTop: "auto" }} onClick={() => navigate("game-transition")}>🎮 Start het spel!</button>
      </div>
    </>
  );
}

// ── GAME TRANSITION ────────────────────────────────────────────────────────────
function GameTransitionScreen({ navigate, topicKey }: { navigate: (s: Screen) => void; topicKey: string }) {
  const t = TRANSITIONS[topicKey] ?? TRANSITIONS.vervoer;
  const contentH = PHONE_H - STATUS_H - NAV_H - HEADER_H;
  return (
    <>
      <ScreenHeader title="💡 Wist je dat..." gradient={GRADIENTS.transition} onBack={() => navigate("home")} />
      <div style={{ height: contentH, display: "flex", flexDirection: "column", overflow: "hidden", padding: "10px 16px", gap: 10, background: "#fffbeb" }}>
        <div style={{ background: "linear-gradient(135deg, #1e3a5f, #1d4ed8)", borderRadius: 18, padding: "14px 16px", textAlign: "center", flexShrink: 0, border: "2px solid rgba(255,255,255,0.15)" }}>
          <div style={{ fontSize: 32, marginBottom: 4 }}>{t.emoji}</div>
          <div style={{ fontFamily: "DM Mono, monospace", fontSize: 9, color: "#93c5fd", letterSpacing: "0.12em", textTransform: "uppercase", marginBottom: 3 }}>Volgend onderwerp</div>
          <div style={{ fontSize: 18, fontWeight: 900, color: "#fff" }}>{t.label}</div>
        </div>
        <div className="fact-box" style={{ flexShrink: 0 }}>
          <div style={{ fontFamily: "Nunito, sans-serif", fontSize: 10, fontWeight: 900, color: "#065f46", textTransform: "uppercase", marginBottom: 6 }}>💡 Wist je dat?</div>
          <div style={{ fontSize: 14, fontWeight: 800, color: "#064e3b", lineHeight: 1.4, marginBottom: 6 }}>"{t.feit}"</div>
          <div style={{ fontSize: 12, color: "#065f46", fontWeight: 600, lineHeight: 1.45 }}>{t.sub}</div>
        </div>
        <div style={{ background: "#fff", border: "2px solid #fde68a", borderRadius: 14, padding: "10px 12px", display: "flex", gap: 10, alignItems: "center", flexShrink: 0 }}>
          <div style={{ width: 36, height: 36, background: "#fef9c3", borderRadius: 10, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 20, flexShrink: 0 }}>🌍</div>
          <div>
            <div style={{ fontFamily: "DM Mono, monospace", fontSize: 9, color: "#d97706", letterSpacing: "0.08em", textTransform: "uppercase", fontWeight: 500, marginBottom: 2 }}>Klimaatfeit</div>
            <div style={{ fontSize: 12, color: "#374151", fontWeight: 700 }}>Elk antwoord telt mee voor jouw kompas!</div>
          </div>
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 8, marginTop: "auto", flexShrink: 0 }}>
          <button className="btn-cta" onClick={() => navigate("spel")}>Verder naar de stellingen →</button>
          <button className="btn-ghost-sm" style={{ alignSelf: "center", background: "rgba(0,0,0,0.07)", border: "1.5px solid rgba(0,0,0,0.14)", color: "#374151" }} onClick={() => navigate("educatie")}>📚 Meer leren</button>
        </div>
      </div>
    </>
  );
}

// ── SPEL ───────────────────────────────────────────────────────────────────────
function SpelScreen({ navigate, scores, onAnswer, currentIdx }: { navigate: (s: Screen) => void; scores: { a: number; c: number }; onAnswer: (a: number, c: number) => void; currentIdx: number }) {
  const contentH = PHONE_H - STATUS_H - NAV_H - HEADER_H;
  const stelling = STELLINGEN[currentIdx];
  const progress = currentIdx / STELLINGEN.length;
  const topicInfo = TOPICS.find((t) => t.id === stelling.topic);

  const handleAnswer = (agree: boolean) => {
    const mult = agree ? 1 : -1;
    onAnswer(stelling.a * mult, stelling.c * mult);
  };

  return (
    <>
      <ScreenHeader title={`🎮 Stelling ${currentIdx + 1} van ${STELLINGEN.length}`} gradient={GRADIENTS.spel} />
      <div style={{ height: contentH, display: "flex", flexDirection: "column", overflow: "hidden", background: "#eef2ff", padding: "12px 16px", gap: 12 }}>
        <div style={{ flexShrink: 0 }}>
          <div style={{ height: 7, background: "#c7d2fe", borderRadius: 100, overflow: "hidden" }}>
            <div style={{ height: "100%", width: `${progress * 100}%`, background: "linear-gradient(90deg, #6366f1, #8b5cf6)", borderRadius: 100, transition: "width 0.4s ease" }} />
          </div>
          <div style={{ display: "flex", justifyContent: "space-between", marginTop: 4 }}>
            <div style={{ fontFamily: "DM Mono, monospace", fontSize: 9, color: "#6366f1", fontWeight: 500 }}>VOORTGANG</div>
            <div style={{ fontFamily: "DM Mono, monospace", fontSize: 9, color: "#6366f1", fontWeight: 500 }}>{Math.round(progress * 100)}%</div>
          </div>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 6, flexShrink: 0 }}>
          <div style={{ background: topicInfo?.bg ?? "#f0fdf4", border: `2px solid ${topicInfo?.border ?? "#bbf7d0"}`, borderRadius: 100, padding: "3px 12px 3px 8px", display: "flex", alignItems: "center", gap: 5 }}>
            <span style={{ fontSize: 14 }}>{stelling.icon}</span>
            <span style={{ fontSize: 11, fontWeight: 800, color: topicInfo?.color ?? "#166534" }}>{topicInfo?.label ?? stelling.topic}</span>
          </div>
        </div>
        <div style={{ flex: 1, display: "flex", flexDirection: "column", justifyContent: "center", position: "relative" }}>
          {currentIdx < STELLINGEN.length - 2 && (
            <div style={{ position: "absolute", top: 16, left: 12, right: 12, height: "100%", background: "#fff", border: "2px solid #c7d2fe", borderRadius: 24, transform: "rotate(2deg)", zIndex: 0 }} />
          )}
          {currentIdx < STELLINGEN.length - 1 && (
            <div style={{ position: "absolute", top: 8, left: 8, right: 8, height: "100%", background: "#f8faff", border: "2px solid #a5b4fc", borderRadius: 24, transform: "rotate(-1deg)", zIndex: 1 }} />
          )}
          <div style={{ background: "#fff", border: "2px solid #818cf8", borderRadius: 24, padding: "24px 20px", boxShadow: "0 8px 32px rgba(99,102,241,0.15), 6px 6px 0 #c7d2fe", position: "relative", zIndex: 2 }}>
            <div style={{ fontFamily: "DM Mono, monospace", fontSize: 9, color: "#818cf8", letterSpacing: "0.12em", textTransform: "uppercase", fontWeight: 500, marginBottom: 10 }}>Stelling</div>
            <div style={{ fontSize: 18, fontWeight: 900, color: "#1e1b4b", lineHeight: 1.4, marginBottom: 16 }}>"{stelling.text}"</div>
            <div style={{ display: "flex", justifyContent: "space-between", padding: "0 8px" }}>
              <div style={{ textAlign: "center" }}>
                <div style={{ fontSize: 20, color: "#ef4444", fontWeight: 900 }}>↓</div>
                <div style={{ fontSize: 9, color: "#ef4444", fontWeight: 900, fontFamily: "Nunito, sans-serif", letterSpacing: "0.06em" }}>ONEENS</div>
              </div>
              <div style={{ textAlign: "center" }}>
                <div style={{ fontSize: 20, color: "#16a34a", fontWeight: 900 }}>↑</div>
                <div style={{ fontSize: 9, color: "#16a34a", fontWeight: 900, fontFamily: "Nunito, sans-serif", letterSpacing: "0.06em" }}>EENS</div>
              </div>
            </div>
          </div>
        </div>
        <div style={{ display: "flex", gap: 10, flexShrink: 0 }}>
          <button onClick={() => handleAnswer(false)} style={{ flex: 1, padding: "14px 10px", background: "linear-gradient(135deg, #fee2e2, #fca5a5)", border: "2px solid #f87171", borderRadius: 18, fontFamily: "Nunito, sans-serif", fontWeight: 900, fontSize: 14, color: "#991b1b", cursor: "pointer", display: "flex", flexDirection: "column", alignItems: "center", gap: 3, boxShadow: "0 3px 0 #f87171" }}
            onMouseDown={(e) => { (e.currentTarget as HTMLButtonElement).style.transform = "translateY(3px)"; (e.currentTarget as HTMLButtonElement).style.boxShadow = "none"; }}
            onMouseUp={(e) => { (e.currentTarget as HTMLButtonElement).style.transform = ""; (e.currentTarget as HTMLButtonElement).style.boxShadow = "0 3px 0 #f87171"; }}>
            <span style={{ fontSize: 22, fontWeight: 900 }}>↓</span><span>Oneens</span>
          </button>
          <button onClick={() => handleAnswer(true)} style={{ flex: 1, padding: "14px 10px", background: "linear-gradient(135deg, #dcfce7, #86efac)", border: "2px solid #4ade80", borderRadius: 18, fontFamily: "Nunito, sans-serif", fontWeight: 900, fontSize: 14, color: "#14532d", cursor: "pointer", display: "flex", flexDirection: "column", alignItems: "center", gap: 3, boxShadow: "0 3px 0 #4ade80" }}
            onMouseDown={(e) => { (e.currentTarget as HTMLButtonElement).style.transform = "translateY(3px)"; (e.currentTarget as HTMLButtonElement).style.boxShadow = "none"; }}
            onMouseUp={(e) => { (e.currentTarget as HTMLButtonElement).style.transform = ""; (e.currentTarget as HTMLButtonElement).style.boxShadow = "0 3px 0 #4ade80"; }}>
            <span style={{ fontSize: 22, fontWeight: 900 }}>↑</span><span>Eens</span>
          </button>
        </div>
        <button style={{ background: "none", border: "none", color: "#818cf8", fontFamily: "Nunito, sans-serif", fontSize: 12, fontWeight: 700, cursor: "pointer", flexShrink: 0, textAlign: "center" }} onClick={() => navigate("resultaat")}>
          Sla over →
        </button>
      </div>
    </>
  );
}

// ── RESULTAAT ──────────────────────────────────────────────────────────────────
function ResultaatScreen({ navigate, scores }: { navigate: (s: Screen) => void; scores: { a: number; c: number } }) {
  const contentH = PHONE_H - STATUS_H - NAV_H - HEADER_H;
  const maxScore = STELLINGEN.length * 1.5;
  const normA = Math.max(-1, Math.min(1, scores.a / maxScore));
  const normC = Math.max(-1, Math.min(1, scores.c / maxScore));
  const dotX = 81 + normC * 64;
  const dotY = 81 - normA * 64;
  const isActief = normA >= 0;
  const isCollectief = normC >= 0;
  const archetypes: Record<string, { emoji: string; naam: string; desc: string; tip: string; color: string; bg: string }> = {
    "ac": { emoji: "🤝", naam: "De Klimaatactivist",      desc: "Jij gelooft dat we samen het verschil kunnen maken — en je zet je daar ook actief voor in!",   tip: "Inspireer anderen en sluit je aan bij een lokale duurzaamheidsgroep.", color: "#16a34a", bg: "#dcfce7" },
    "ai": { emoji: "💪", naam: "De Groene Individualist",  desc: "Jij neemt het heft in eigen handen. Kleine keuzes in je dagelijks leven zijn jouw kracht.",    tip: "Deel jouw tips op social media — jouw voorbeeld inspireert!",           color: "#0891b2", bg: "#e0f2fe" },
    "pc": { emoji: "🌱", naam: "De Bezorgde Wereldburger", desc: "Je ziet klimaatverandering als een groot probleem en hoopt op collectieve oplossingen.",        tip: "Wist je dat stemmen en petities tekenen ook klimaatactie zijn?",        color: "#7c3aed", bg: "#ede9fe" },
    "pi": { emoji: "🤔", naam: "De Sceptische Denker",     desc: "Je twijfelt over je eigen rol of de ernst van het probleem. Dat is oké — meer leren helpt!",   tip: "Lees de educatiepagina's in KliMaten om meer feiten te ontdekken.",     color: "#d97706", bg: "#fef3c7" },
  };
  const key = `${isActief ? "a" : "p"}${isCollectief ? "c" : "i"}`;
  const archetype = archetypes[key];

  return (
    <>
      <ScreenHeader title="🧭 Jouw klimaatkompas" gradient={GRADIENTS.resultaat} />
      <div style={{ height: contentH, display: "flex", flexDirection: "column", overflow: "hidden", padding: "10px 16px", gap: 9, background: "#f5f3ff" }}>
        <div style={{ background: "#fff", border: "2px solid #c4b5fd", borderRadius: 20, padding: "12px", display: "flex", gap: 14, alignItems: "center", flexShrink: 0, boxShadow: "0 4px 16px rgba(99,102,241,0.1)" }}>
          <div style={{ position: "relative", width: 156, height: 156, flexShrink: 0 }}>
            <div style={{ position: "absolute", top: 2, left: 2, width: "calc(50% - 2px)", height: "calc(50% - 2px)", background: "rgba(16,185,129,0.15)", borderRadius: "100% 0 0 0" }} />
            <div style={{ position: "absolute", top: 2, right: 2, width: "calc(50% - 2px)", height: "calc(50% - 2px)", background: "rgba(99,102,241,0.12)", borderRadius: "0 100% 0 0" }} />
            <div style={{ position: "absolute", bottom: 2, left: 2, width: "calc(50% - 2px)", height: "calc(50% - 2px)", background: "rgba(245,158,11,0.1)", borderRadius: "0 0 0 100%" }} />
            <div style={{ position: "absolute", bottom: 2, right: 2, width: "calc(50% - 2px)", height: "calc(50% - 2px)", background: "rgba(239,68,68,0.08)", borderRadius: "0 0 100% 0" }} />
            <div style={{ position: "absolute", inset: 0, borderRadius: "50%", border: "2px solid #ddd6fe" }} />
            <div style={{ position: "absolute", top: "50%", left: 0, right: 0, height: 1.5, background: "#a78bfa", transform: "translateY(-50%)" }} />
            <div style={{ position: "absolute", left: "50%", top: 0, bottom: 0, width: 1.5, background: "#a78bfa", transform: "translateX(-50%)" }} />
            {[
              { l: "Actief",     s: { top: 5, left: "50%", transform: "translateX(-50%)" } },
              { l: "Passief",    s: { bottom: 5, left: "50%", transform: "translateX(-50%)" } },
              { l: "Individu",   s: { top: "50%", left: 2, transform: "translateY(-50%)" } },
              { l: "Collectief", s: { top: "50%", right: 2, transform: "translateY(-50%)" } },
            ].map((p, i) => (
              <div key={i} style={{ position: "absolute", fontFamily: "Nunito, sans-serif", fontSize: 8, color: "#7c3aed", fontWeight: 900, textTransform: "uppercase", ...p.s }}>{p.l}</div>
            ))}
            <div style={{ position: "absolute", left: dotX - 8, top: dotY - 8, width: 16, height: 16, background: "linear-gradient(135deg, #f59e0b, #ef4444)", borderRadius: "50%", border: "2.5px solid #fff", boxShadow: "0 2px 10px rgba(239,68,68,0.6), 0 0 0 3px rgba(239,68,68,0.2)" }} />
          </div>
          <div style={{ flex: 1 }}>
            <div style={{ fontSize: 28, marginBottom: 4 }}>{archetype.emoji}</div>
            <div style={{ fontFamily: "DM Mono, monospace", fontSize: 8, color: "#7c3aed", letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: 4 }}>Jouw type</div>
            <div style={{ fontSize: 13, fontWeight: 900, color: "#3730a3", lineHeight: 1.3 }}>{archetype.naam}</div>
          </div>
        </div>
        <div style={{ background: archetype.bg, border: `2px solid ${archetype.color}40`, borderRadius: 16, padding: "11px 13px", flexShrink: 0 }}>
          <div style={{ fontSize: 13, fontWeight: 700, color: archetype.color, lineHeight: 1.5 }}>{archetype.desc}</div>
        </div>
        <div className="card" style={{ flexShrink: 0, borderColor: "#ddd6fe", padding: "10px 13px" }}>
          <div style={{ fontWeight: 900, fontSize: 12, color: "#3730a3", marginBottom: 8 }}>📊 Jouw scores</div>
          <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
            {[
              { label: "Klimaatactief", val: normA, pos: "Actief",     neg: "Passief",     color: "#10b981" },
              { label: "Collectief",    val: normC, pos: "Collectief",  neg: "Individueel", color: "#6366f1" },
            ].map((bar) => (
              <div key={bar.label}>
                <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 3 }}>
                  <span style={{ fontSize: 10, fontWeight: 800, color: "#374151" }}>{bar.label}</span>
                  <span style={{ fontFamily: "DM Mono, monospace", fontSize: 9, color: bar.color }}>{bar.val >= 0 ? bar.pos : bar.neg}</span>
                </div>
                <div style={{ height: 6, background: "#e5e7eb", borderRadius: 100, position: "relative", overflow: "hidden" }}>
                  <div style={{ position: "absolute", left: "50%", top: 0, bottom: 0, width: `${Math.abs(bar.val) * 50}%`, background: bar.color, borderRadius: 100, transform: bar.val >= 0 ? "none" : "translateX(-100%)" }} />
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="fact-box" style={{ flexShrink: 0, padding: "10px 12px" }}>
          <div style={{ fontFamily: "Nunito, sans-serif", fontSize: 10, fontWeight: 900, color: "#065f46", textTransform: "uppercase", marginBottom: 4 }}>💡 Tip voor jou</div>
          <div style={{ fontSize: 12, fontWeight: 700, color: "#064e3b", lineHeight: 1.45 }}>{archetype.tip}</div>
        </div>
        <div style={{ display: "flex", gap: 9, flexShrink: 0 }}>
          <button className="btn-cta" style={{ flex: 1, padding: "12px 10px", fontSize: 13 }} onClick={() => navigate("game-transition")}>🔄 Opnieuw</button>
          <button className="btn-outline" style={{ flex: 1, padding: "12px 10px", fontSize: 13 }} onClick={() => navigate("educatie")}>📚 Meer leren</button>
        </div>
      </div>
    </>
  );
}

// ── EDUCATIE OVERZICHT ─────────────────────────────────────────────────────────
function EducatieScreen({ navigate, setTopic }: { navigate: (s: Screen) => void; setTopic: (t: string) => void }) {
  const contentH = PHONE_H - STATUS_H - NAV_H - HEADER_H;
  return (
    <>
      <ScreenHeader title="📚 Leer over klimaat" gradient={GRADIENTS.educatie} />
      <div style={{ height: contentH, display: "flex", flexDirection: "column", overflow: "hidden", padding: "10px 16px", gap: 10, background: "#f0fdf4" }}>
        <div style={{ background: "#fff", border: "2px solid #bbf7d0", borderRadius: 100, padding: "9px 16px", display: "flex", gap: 8, alignItems: "center", flexShrink: 0, boxShadow: "0 2px 8px rgba(0,0,0,0.06)" }}>
          <span style={{ fontSize: 15 }}>🔍</span>
          <span style={{ fontSize: 13, color: "#86efac", fontWeight: 700 }}>Zoek een onderwerp...</span>
        </div>
        <div style={{ fontSize: 12, color: "#15803d", fontWeight: 700, flexShrink: 0 }}>Kies een onderwerp om meer te leren 👇</div>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 9, flex: 1 }}>
          {TOPICS.map((topic) => (
            <button key={topic.id} onClick={() => { setTopic(topic.id); navigate("educatie-detail"); }}
              style={{ background: topic.bg, border: `2px solid ${topic.border}`, borderRadius: 18, padding: "12px 10px", textAlign: "left", cursor: "pointer", display: "flex", flexDirection: "column", gap: 6, transition: "all 0.15s", boxShadow: "0 2px 8px rgba(0,0,0,0.05)" }}
              onMouseEnter={(e) => { (e.currentTarget as HTMLButtonElement).style.transform = "scale(1.03)"; }}
              onMouseLeave={(e) => { (e.currentTarget as HTMLButtonElement).style.transform = "scale(1)"; }}>
              <div style={{ fontSize: 26, lineHeight: 1 }}>{topic.icon}</div>
              <div style={{ fontSize: 12, fontWeight: 800, color: topic.color, lineHeight: 1.3 }}>{topic.label}</div>
              <div style={{ fontSize: 10, color: topic.color, fontWeight: 700, opacity: 0.7 }}>Lees meer →</div>
            </button>
          ))}
        </div>
      </div>
    </>
  );
}

// ── EDUCATIE DETAIL ────────────────────────────────────────────────────────────
function EducatieDetailScreen({ navigate, topicId }: { navigate: (s: Screen) => void; topicId: string }) {
  const topic = TOPICS.find((t) => t.id === topicId) ?? TOPICS[0];
  const contentH = PHONE_H - STATUS_H - NAV_H - HEADER_H;
  return (
    <>
      <ScreenHeader title={`${topic.icon} ${topic.label}`} gradient={GRADIENTS.detail} onBack={() => navigate("educatie")} />
      <div style={{ height: contentH, display: "flex", flexDirection: "column", overflow: "hidden", padding: "10px 16px", gap: 9, background: "#f0fdf4" }}>
        <ImgPh label={`Afbeelding: ${topic.label}`} height={80} emoji={topic.icon} />
        <div style={{ flexShrink: 0 }}>
          <div style={{ fontSize: 18, fontWeight: 900, color: "#166534", marginBottom: 4 }}>{topic.label}</div>
          <div style={{ fontSize: 13, color: "#166534", fontWeight: 600, lineHeight: 1.5, opacity: 0.8 }}>Introductietekst over {topic.label.toLowerCase()}. Dit onderwerp raakt aan ons dagelijks leven en de toekomst!</div>
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 7, flex: 1 }}>
          {[
            { title: "🔍 Wat is het?",       text: "Een korte uitleg in begrijpelijke taal voor jongeren en gezinnen.", pill: "#dcfce7", border: "#86efac" },
            { title: "❗ Waarom belangrijk?", text: "Dit onderwerp heeft grote invloed op onze toekomst en het klimaat.", pill: "#fef9c3", border: "#fde047" },
            { title: "🌟 Wat kun jij doen?", text: "Kleine stappen die jij en je gezin kunnen zetten.", pill: "#ede9fe", border: "#c4b5fd" },
          ].map((section, i) => (
            <div key={i} style={{ background: section.pill, border: `2px solid ${section.border}`, borderRadius: 14, padding: "9px 12px" }}>
              <div style={{ fontWeight: 900, fontSize: 12, color: "#1a1a2e", marginBottom: 3 }}>{section.title}</div>
              <div style={{ fontSize: 12, color: "#374151", fontWeight: 600, lineHeight: 1.45 }}>{section.text}</div>
            </div>
          ))}
        </div>
        <div className="fact-box" style={{ flexShrink: 0 }}>
          <div style={{ fontFamily: "DM Mono, monospace", fontSize: 9, color: "#065f46", letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: 4 }}>💡 Wist je dat?</div>
          <div style={{ fontSize: 13, fontWeight: 800, color: "#064e3b" }}>[ Statistiek of feit over {topic.label.toLowerCase()} ]</div>
        </div>
        <button className="btn-outline" style={{ borderColor: "#86efac", flexShrink: 0 }} onClick={() => navigate("educatie")}>← Terug naar overzicht</button>
      </div>
    </>
  );
}

// ── KLIMAATKOMPAS ──────────────────────────────────────────────────────────────
function KlimaatkompasScreen({ navigate }: { navigate: (s: Screen) => void }) {
  const contentH = PHONE_H - STATUS_H - NAV_H - HEADER_H;
  return (
    <>
      <ScreenHeader title="🧭 Het klimaatkompas" gradient={GRADIENTS.kompas} />
      <div style={{ height: contentH, display: "flex", flexDirection: "column", overflow: "hidden", padding: "10px 16px", gap: 10, background: "#f5f3ff" }}>
        <div style={{ fontSize: 13, color: "#3730a3", fontWeight: 700, flexShrink: 0, lineHeight: 1.5 }}>Het klimaatkompas laat zien waar jij staat op twee assen. Jouw antwoorden bepalen jouw positie.</div>
        <div style={{ background: "#fff", border: "2px solid #c4b5fd", borderRadius: 20, padding: "14px", display: "flex", flexDirection: "column", alignItems: "center", flexShrink: 0, boxShadow: "0 4px 16px rgba(99,102,241,0.12)" }}>
          <div style={{ position: "relative", width: 162, height: 162 }}>
            <div style={{ position: "absolute", top: 2, left: 2, width: "calc(50% - 2px)", height: "calc(50% - 2px)", background: "rgba(16,185,129,0.15)", borderRadius: "100% 0 0 0" }} />
            <div style={{ position: "absolute", top: 2, right: 2, width: "calc(50% - 2px)", height: "calc(50% - 2px)", background: "rgba(99,102,241,0.12)", borderRadius: "0 100% 0 0" }} />
            <div style={{ position: "absolute", bottom: 2, left: 2, width: "calc(50% - 2px)", height: "calc(50% - 2px)", background: "rgba(245,158,11,0.1)", borderRadius: "0 0 0 100%" }} />
            <div style={{ position: "absolute", bottom: 2, right: 2, width: "calc(50% - 2px)", height: "calc(50% - 2px)", background: "rgba(239,68,68,0.08)", borderRadius: "0 0 100% 0" }} />
            <div style={{ position: "absolute", inset: 0, borderRadius: "50%", border: "2px solid #ddd6fe" }} />
            <div style={{ position: "absolute", top: "50%", left: 0, right: 0, height: 1.5, background: "#a78bfa", transform: "translateY(-50%)" }} />
            <div style={{ position: "absolute", left: "50%", top: 0, bottom: 0, width: 1.5, background: "#a78bfa", transform: "translateX(-50%)" }} />
            {[
              { l: "Actief", s: { top: 5, left: "50%", transform: "translateX(-50%)" } },
              { l: "Passief", s: { bottom: 5, left: "50%", transform: "translateX(-50%)" } },
              { l: "Individu", s: { top: "50%", left: 2, transform: "translateY(-50%)" } },
              { l: "Collectief", s: { top: "50%", right: 2, transform: "translateY(-50%)" } },
            ].map((p, i) => (
              <div key={i} style={{ position: "absolute", fontFamily: "Nunito, sans-serif", fontSize: 8, color: "#7c3aed", fontWeight: 900, textTransform: "uppercase", ...p.s }}>{p.l}</div>
            ))}
            <div style={{ position: "absolute", top: "30%", left: "62%", width: 14, height: 14, background: "linear-gradient(135deg, #f59e0b, #ef4444)", borderRadius: "50%", border: "2px solid #fff", boxShadow: "0 2px 8px rgba(239,68,68,0.5)" }} />
          </div>
          <div style={{ marginTop: 8, fontFamily: "DM Mono, monospace", fontSize: 9, color: "#7c3aed", letterSpacing: "0.1em", textTransform: "uppercase", fontWeight: 500 }}>Voorbeeld kompas-positie</div>
        </div>
        <div className="card" style={{ borderColor: "#ddd6fe", flex: 1 }}>
          <div style={{ fontWeight: 900, fontSize: 13, color: "#3730a3", marginBottom: 9 }}>Wat betekent jouw positie?</div>
          <div style={{ display: "flex", flexDirection: "column", gap: 7 }}>
            {[
              { pos: "Actief + Collectief",   emoji: "🤝", desc: "Je gelooft in gezamenlijke actie.", pill: "#dcfce7" },
              { pos: "Actief + Individueel",  emoji: "💪", desc: "Je neemt zelf initiatieven.",       pill: "#fef9c3" },
              { pos: "Passief + Collectief",  emoji: "🤷", desc: "Je ziet het als een groot probleem.",pill: "#ede9fe" },
              { pos: "Passief + Individueel", emoji: "🌀", desc: "Je twijfelt aan je eigen invloed.", pill: "#fee2e2" },
            ].map((item, i) => (
              <div key={i} style={{ display: "flex", gap: 8, alignItems: "center", background: item.pill, borderRadius: 10, padding: "6px 8px" }}>
                <div style={{ fontSize: 16, flexShrink: 0 }}>{item.emoji}</div>
                <div>
                  <div style={{ fontSize: 11, fontWeight: 900, color: "#1a1a2e" }}>{item.pos}</div>
                  <div style={{ fontSize: 11, color: "#374151", fontWeight: 600 }}>{item.desc}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
        <button className="btn-cta" style={{ flexShrink: 0 }} onClick={() => navigate("game-transition")}>🎮 Start het spel!</button>
      </div>
    </>
  );
}

// ── ROOT ───────────────────────────────────────────────────────────────────────
export default function App() {
  const [screen, setScreen] = useState<Screen>("home");
  const [topicId, setTopicId] = useState("energie");
  const [currentIdx, setCurrentIdx] = useState(0);
  const [scores, setScores] = useState({ a: 0, c: 0 });
  const [transitionTopic, setTransitionTopic] = useState("vervoer");

  const transitionAfterIdx: Record<number, string> = { 1: "voeding", 3: "energie", 5: "afval", 7: "klimaat", 9: "duurzaamheid" };

  const navigate = (s: Screen) => {
    if (s === "spel" || s === "game-transition") { setCurrentIdx(0); setScores({ a: 0, c: 0 }); setTransitionTopic("vervoer"); }
    setScreen(s);
  };

  const handleAnswer = (da: number, dc: number) => {
    const newScores = { a: scores.a + da, c: scores.c + dc };
    setScores(newScores);
    const next = currentIdx + 1;
    if (next >= STELLINGEN.length) {
      setScreen("resultaat");
    } else if (transitionAfterIdx[currentIdx]) {
      setTransitionTopic(transitionAfterIdx[currentIdx]);
      setCurrentIdx(next);
      setScreen("game-transition");
    } else {
      setCurrentIdx(next);
    }
  };

  const gradientForScreen = (): string => {
    const map: Record<string, string> = {
      home: GRADIENTS.home, speluitleg: GRADIENTS.speluitleg,
      educatie: GRADIENTS.educatie, "educatie-detail": GRADIENTS.detail,
      klimaatkompas: GRADIENTS.kompas, "game-transition": GRADIENTS.transition,
      spel: GRADIENTS.spel, resultaat: GRADIENTS.resultaat,
      "over-ons": GRADIENTS.overOns, admin: GRADIENTS.admin,
    };
    return map[screen] ?? GRADIENTS.home;
  };

  return (
    <div style={{ minHeight: "100vh", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", background: "#0f172a", padding: "20px 16px", gap: 14 }}>
      <div style={{ fontFamily: "DM Mono, monospace", fontSize: 11, color: "#334155", letterSpacing: "0.12em", textTransform: "uppercase" }}>
        KliMaten — Mobile prototype — 390×844
      </div>

      <div className="wireframe-phone" style={{ width: PHONE_W, height: PHONE_H }}>
        <StatusBar gradient={gradientForScreen()} />

        {screen === "home"            && <HomeScreen navigate={navigate} />}
        {screen === "over-ons"        && <OverOnsScreen navigate={navigate} />}
        {screen === "speluitleg"      && <SpeluitlegScreen navigate={navigate} />}
        {screen === "game-transition" && <GameTransitionScreen navigate={(s) => { if (s === "spel") setScreen("spel"); else navigate(s); }} topicKey={transitionTopic} />}
        {screen === "spel"            && <SpelScreen navigate={navigate} scores={scores} onAnswer={handleAnswer} currentIdx={currentIdx} />}
        {screen === "resultaat"       && <ResultaatScreen navigate={navigate} scores={scores} />}
        {screen === "educatie"        && <EducatieScreen navigate={navigate} setTopic={setTopicId} />}
        {screen === "educatie-detail" && <EducatieDetailScreen navigate={navigate} topicId={topicId} />}
        {screen === "klimaatkompas"   && <KlimaatkompasScreen navigate={navigate} />}
        {screen === "admin"           && <AdminScreen />}

        <BottomNav active={screen} gradient={gradientForScreen()} navigate={navigate} />
      </div>

      <div style={{ display: "flex", gap: 6, flexWrap: "wrap", justifyContent: "center", maxWidth: 600 }}>
        {([
          ["home",            "🏠 Home"],
          ["over-ons",        "🏢 Over ons"],
          ["speluitleg",      "🎮 Speluitleg"],
          ["game-transition", "💡 Tussenscherm"],
          ["spel",            "🃏 Stellingen"],
          ["resultaat",       "🧭 Resultaat"],
          ["educatie",        "📚 Educatie"],
          ["educatie-detail", "📄 Detail"],
          ["klimaatkompas",   "🧭 Kompas"],
          ["admin",           "⚙️ Admin"],
        ] as [Screen, string][]).map(([s, label]) => (
          <button key={s} onClick={() => { if (s === "spel") { setCurrentIdx(0); setScores({ a: 0, c: 0 }); } setScreen(s); }}
            style={{ background: screen === s ? "#1e40af" : "#1e293b", color: screen === s ? "#bfdbfe" : "#475569", border: screen === s ? "1px solid #60a5fa" : "1px solid #334155", borderRadius: 100, padding: "5px 13px", fontFamily: "Nunito, sans-serif", fontSize: 11, fontWeight: 700, cursor: "pointer", transition: "all 0.15s" }}>
            {label}
          </button>
        ))}
      </div>
    </div>
  );
}
