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
    'Klimaatbeleid moet vooral gericht zijn op grote bedrijven.',

    'De overheid moet meer investeren in duurzame energie.',
    'Iedereen zou minder vlees moeten eten om klimaatverandering tegen te gaan.',
    'Elektrische auto’s zijn een goede oplossing voor het klimaat.',
    'Vliegen moet duurder worden om klimaatverandering tegen te gaan.',
    'Nederland moet sneller stoppen met het gebruik van fossiele brandstoffen.'
];

const quizQuestions = [
    {
        question: 'Welke energiebron is hernieuwbaar?',
        answers: [
            'Kolen',
            'Windenergie',
            'Aardgas',
            'Olie'
        ],
        correct: 1
    },

    {
        question: 'Wat is CO₂?',
        answers: [
            'Een broeikasgas',
            'Een soort plastic',
            'Een brandstof',
            'Een metaal'
        ],
        correct: 0
    },

    {
        question: 'Welke keuze helpt om energie te besparen?',
        answers: [
            'Licht onnodig laten branden',
            'Apparaten onnodig aan laten staan',
            'Energiezuinige apparaten gebruiken',
            'De verwarming hoger zetten'
        ],
        correct: 2
    },

    {
        question: 'Welke vervoerswijze heeft doorgaans een lage CO₂-uitstoot per persoon?',
        answers: [
            'Vliegtuig',
            'Auto',
            'Trein',
            'Motor'
        ],
        correct: 2
    },

    {
        question: 'Wat kan helpen tegen klimaatverandering?',
        answers: [
            'Meer fossiele brandstoffen gebruiken',
            'Energie besparen',
            'Meer verspillen',
            'Meer wegwerpproducten gebruiken'
        ],
        correct: 1
    }
];


let currentIndex = 0;
let currentQuiz = 0;
let quizMode = false;
let quizAnswered = false;


// =========================
// ELEMENTEN
// =========================

const card = document.getElementById('statement-card');
const statementText = document.getElementById('statement-text');
const progress = document.getElementById('progress');

const agreeButton = document.getElementById('agree-button');
const disagreeButton = document.getElementById('disagree-button');

const trashBin = document.getElementById('trash-bin');
const agreeStack = document.querySelector('.agree-stack');


// =========================
// ALLEEN OP GAME PAGINA
// =========================

if (card) {

    // =========================
    // QUIZKNOP MAKEN
    // =========================

    function createQuizNextButton() {

        // Bestaat er al een knop?
        let nextButton =
            document.getElementById('quiz-next');

        if (nextButton) {
            nextButton.remove();
        }


        nextButton =
            document.createElement('button');

        nextButton.type = 'button';
        nextButton.id = 'quiz-next';
        nextButton.className = 'quiz-next';
        nextButton.textContent = 'Verder →';
        nextButton.style.display = 'none';


        // BELANGRIJK:
        // De knop komt buiten de card,
        // direct onder de card.
        card.parentElement.appendChild(nextButton);


        nextButton.addEventListener(
            'click',
            nextAfterQuiz
        );


        return nextButton;
    }


    // =========================
    // QUIZKNOP VERWIJDEREN
    // =========================

    function removeQuizNextButton() {

        const nextButton =
            document.getElementById('quiz-next');

        if (nextButton) {
            nextButton.remove();
        }
    }


    // =========================
    // NORMALE STELLING TONEN
    // =========================

    function showStatement() {

        quizMode = false;


        // Quizknop verwijderen
        removeQuizNextButton();


        // EENS / ONEENS terug
        agreeButton.style.display = '';
        disagreeButton.style.display = '';


        // Stapel terug
        if (agreeStack) {
            agreeStack.style.display = '';
        }


        // Prullenbak terug
        if (trashBin) {
            trashBin.style.display = '';
        }


        // Normale kaart
        card.classList.remove('quiz-card');


        agreeButton.disabled = false;
        disagreeButton.disabled = false;


        if (currentIndex >= statements.length) {
            showEnd();
            return;
        }


        statementText.textContent =
            statements[currentIndex];


        progress.textContent =
            `${currentIndex + 1} / ${statements.length}`;
    }


    // =========================
    // QUIZ TONEN
    // =========================

    function showQuiz() {

        if (currentQuiz >= quizQuestions.length) {
            showEnd();
            return;
        }


        quizMode = true;
        quizAnswered = false;


        // =========================
        // NORMALE UI VERBERGEN
        // =========================

        agreeButton.style.display = 'none';
        disagreeButton.style.display = 'none';


        if (agreeStack) {
            agreeStack.style.display = 'none';
        }


        if (trashBin) {
            trashBin.style.display = 'none';
        }


        // Quizkaart
        card.classList.add('quiz-card');


        const quiz =
            quizQuestions[currentQuiz];


        const letters = [
            'A',
            'B',
            'C',
            'D'
        ];


        // =========================
        // QUIZ IN DE KAART
        // =========================

        statementText.innerHTML = `
            <div class="quiz-content">

                <div class="quiz-label">
                    QUIZVRAAG ${currentQuiz + 1}
                </div>

                <div class="quiz-question">
                    ${quiz.question}
                </div>

                <div class="quiz-answers">

                    ${quiz.answers.map((answer, index) => `
                        <button
                            type="button"
                            class="quiz-answer"
                            data-answer="${index}"
                        >
                            <span class="quiz-letter">
                                ${letters[index]}
                            </span>

                            <span class="quiz-answer-text">
                                ${answer}
                            </span>
                        </button>
                    `).join('')}

                </div>

                <div
                    id="quiz-feedback"
                    class="quiz-feedback"
                ></div>

            </div>
        `;


        // =========================
        // VERDER KNOP
        // BUITEN DE KAART
        // =========================

        const nextButton =
            createQuizNextButton();


        progress.textContent =
            `Quiz ${currentQuiz + 1} / ${quizQuestions.length}`;


        // =========================
        // ANTWOORDKNOPPEN
        // =========================

        const quizButtons =
            card.querySelectorAll('.quiz-answer');


        quizButtons.forEach(button => {

            button.addEventListener(
                'click',
                () => {

                    const selectedAnswer =
                        Number(button.dataset.answer);

                    answerQuiz(selectedAnswer);
                }
            );

        });
    }


    // =========================
    // QUIZ ANTWOORD CONTROLEREN
    // =========================

    function answerQuiz(selectedAnswer) {

        if (quizAnswered) {
            return;
        }


        quizAnswered = true;


        const quiz =
            quizQuestions[currentQuiz];


        const quizButtons =
            card.querySelectorAll('.quiz-answer');


        const feedback =
            card.querySelector('#quiz-feedback');


        const nextButton =
            document.getElementById('quiz-next');


        // Alle antwoorden uitschakelen
        quizButtons.forEach(button => {
            button.disabled = true;
        });


        // =========================
        // GOED ANTWOORD
        // =========================

        if (selectedAnswer === quiz.correct) {

            quizButtons[selectedAnswer]
                .classList.add('correct');


            feedback.textContent =
                'Goed gedaan! 🎉';


            feedback.classList.add(
                'correct-feedback'
            );

        }


        // =========================
        // FOUT ANTWOORD
        // =========================

        else {

            quizButtons[selectedAnswer]
                .classList.add('wrong');


            quizButtons[quiz.correct]
                .classList.add('correct');


            feedback.textContent =
                `Helaas! Het juiste antwoord is ${quiz.answers[quiz.correct]}.`;


            feedback.classList.add(
                'wrong-feedback'
            );
        }


        // Verder-knop buiten de kaart tonen
        if (nextButton) {
            nextButton.style.display = 'block';
        }
    }


    // =========================
    // VERDER NA QUIZ
    // =========================

    function nextAfterQuiz() {

        currentQuiz++;


        // Quizknop verwijderen
        removeQuizNextButton();


        // Quizstijl verwijderen
        card.classList.remove('quiz-card');


        // Terug naar volgende stelling
        if (currentIndex < statements.length) {

            showStatement();

        } else {

            showEnd();
        }
    }


    // =========================
    // STELLING BEANTWOORDEN
    // =========================

    function answer(answer) {

        // Tijdens quiz niets doen
        if (quizMode) {
            return;
        }


        // Dubbel antwoord voorkomen
        if (
            card.classList.contains('swipe-up') ||
            card.classList.contains('swipe-down')
        ) {
            return;
        }


        // =========================
        // EENS
        // =========================

        if (answer === 'agree') {

            card.classList.add('swipe-up');


            if (agreeStack) {

                agreeStack.classList.add(
                    'stack-active'
                );


                setTimeout(() => {

                    agreeStack.classList.remove(
                        'stack-active'
                    );

                }, 400);
            }
        }


        // =========================
        // ONEENS
        // =========================

        else {

            card.classList.add('swipe-down');


            if (trashBin) {

                trashBin.classList.add(
                    'trash-active'
                );


                setTimeout(() => {

                    trashBin.classList.remove(
                        'trash-active'
                    );

                }, 400);
            }
        }


        // =========================
        // VOLGENDE STELLING
        // =========================

        setTimeout(() => {

            currentIndex++;


            card.classList.remove(
                'swipe-up'
            );

            card.classList.remove(
                'swipe-down'
            );


            // Na iedere 5 stellingen quiz
            if (
                currentIndex % 5 === 0 &&
                currentQuiz < quizQuestions.length
            ) {

                showQuiz();

            } else {

                showStatement();
            }

        }, 500);
    }


    // =========================
    // EINDE
    // =========================

    function showEnd() {

        quizMode = true;


        removeQuizNextButton();


        agreeButton.style.display = 'none';
        disagreeButton.style.display = 'none';


        if (agreeStack) {
            agreeStack.style.display = 'none';
        }


        if (trashBin) {
            trashBin.style.display = 'none';
        }


        card.classList.remove('quiz-card');


        statementText.innerHTML = `
            <div class="game-finished">

                <div class="finished-icon">
                    🎉
                </div>

                <h2>
                    Je bent klaar!
                </h2>

                <p>
                    Je hebt alle 15 stellingen
                    en de quizvragen beantwoord.
                </p>

            </div>
        `;


        progress.textContent =
            'Klaar!';
    }


    // =========================
    // EENS / ONEENS KNOPPEN
    // =========================

    agreeButton.addEventListener(
        'click',
        () => answer('agree')
    );


    disagreeButton.addEventListener(
        'click',
        () => answer('disagree')
    );


    // =========================
    // SWIPE
    // =========================

    let startY = 0;
    let startX = 0;


    card.addEventListener(
        'pointerdown',
        (event) => {

            // Tijdens quiz geen swipe
            if (quizMode) {
                return;
            }


            startY = event.clientY;
            startX = event.clientX;


            card.setPointerCapture(
                event.pointerId
            );
        }
    );


    card.addEventListener(
        'pointerup',
        (event) => {

            // Tijdens quiz geen swipe
            if (quizMode) {
                return;
            }


            const endY = event.clientY;
            const endX = event.clientX;


            const differenceY =
                startY - endY;


            const differenceX =
                startX - endX;


            // Alleen verticale swipe
            if (
                Math.abs(differenceY) <
                Math.abs(differenceX)
            ) {
                return;
            }


            // Omhoog = EENS
            if (differenceY > 100) {
                answer('agree');
            }


            // Omlaag = ONEENS
            if (differenceY < -100) {
                answer('disagree');
            }
        }
    );


    // =========================
    // START
    // =========================

    showStatement();
}