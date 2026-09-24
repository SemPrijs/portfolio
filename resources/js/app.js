import './bootstrap';

const statements = [
    'De overheid moet meer investeren in duurzame energie.',
    'Iedereen zou minder vlees moeten eten om klimaatverandering tegen te gaan.',
    'Elektrische auto’s zijn een goede oplossing voor het klimaat.',
    'Vliegen moet duurder worden om klimaatverandering tegen te gaan.',
    'Nederland moet sneller stoppen met het gebruik van fossiele brandstoffen.',
    'Bedrijven moeten meer belasting betalen voor hun CO₂-uitstoot.',
    'Windmolens moeten vaker worden gebouwd, ook als omwonenden daar last van hebben.',
    'Iedereen zou zonnepanelen op zijn huis moeten hebben.',
    'Openbaar vervoer moet goedkoper worden om autorijden te verminderen.',
    'Klimaatbeleid moet vooral gericht zijn op grote bedrijven.'
];

let currentIndex = 0;

const card = document.getElementById('statement-card');
const statementText = document.getElementById('statement-text');
const progress = document.getElementById('progress');

const agreeButton = document.getElementById('agree-button');
const disagreeButton = document.getElementById('disagree-button');

if (!card || !statementText || !progress || !agreeButton || !disagreeButton) {
} else {

function showStatement() {

    if (currentIndex >= statements.length) {
        statementText.textContent = 'Je bent klaar! 🎉';

        progress.textContent = `${statements.length} / ${statements.length}`;

        agreeButton.disabled = true;
        disagreeButton.disabled = true;

        return;
    }

    statementText.textContent = statements[currentIndex];

    progress.textContent =
        `${currentIndex + 1} / ${statements.length}`;
}


function answer(answer) {

    if (card.classList.contains('swipe-up') ||
        card.classList.contains('swipe-down')) {
        return;
    }

    if (answer === 'agree') {

        card.classList.add('swipe-up');

    } else {

        card.classList.add('swipe-down');

    }

    setTimeout(() => {

        currentIndex++;

        card.classList.remove('swipe-up');
        card.classList.remove('swipe-down');

        showStatement();

    }, 500);
}


agreeButton.addEventListener('click', () => {
    answer('agree');
});


disagreeButton.addEventListener('click', () => {
    answer('disagree');
});


showStatement();

let startY = 0;
let startX = 0;

card.addEventListener('pointerdown', (event) => {

    startY = event.clientY;
    startX = event.clientX;

    card.setPointerCapture(event.pointerId);
});


card.addEventListener('pointerup', (event) => {

    const endY = event.clientY;
    const endX = event.clientX;

    const differenceY = startY - endY;
    const differenceX = startX - endX;

    // Alleen verticale swipes accepteren
    if (Math.abs(differenceY) < Math.abs(differenceX)) {
        return;
    }

    // Omhoog swipen = eens
    if (differenceY > 100) {
        answer('agree');
    }

    // Omlaag swipen = oneens
    if (differenceY < -100) {
        answer('disagree');
    }
});

}


