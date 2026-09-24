import './bootstrap';


// ======================================================
// STELLINGEN
// ======================================================
//
// 10 stellingen voor ACTIVITEIT
// 10 stellingen voor PRIORITEIT
//
// EENS   = +1 punt
// ONEENS = -1 punt
//

const statements = [

    // =========================
    // ACTIVITEIT - 10 STELLINGEN
    // =========================

    {
        text: 'Ik probeer bewust mijn energieverbruik te verminderen.',
        category: 'activity'
    },

    {
        text: 'Ik gebruik zo vaak mogelijk de fiets of het openbaar vervoer.',
        category: 'activity'
    },

    {
        text: 'Ik probeer minder vlees te eten vanwege het klimaat.',
        category: 'activity'
    },

    {
        text: 'Ik probeer mijn woning zo energiezuinig mogelijk te maken.',
        category: 'activity'
    },

    {
        text: 'Ik let erop hoeveel energie mijn apparaten gebruiken.',
        category: 'activity'
    },

    {
        text: 'Ik probeer zo min mogelijk voedsel te verspillen.',
        category: 'activity'
    },

    {
        text: 'Ik koop regelmatig tweedehands producten om verspilling te verminderen.',
        category: 'activity'
    },

    {
        text: 'Ik probeer minder vaak het vliegtuig te nemen.',
        category: 'activity'
    },

    {
        text: 'Ik scheid mijn afval om grondstoffen opnieuw te kunnen gebruiken.',
        category: 'activity'
    },

    {
        text: 'Ik probeer in mijn dagelijks leven bewuste duurzame keuzes te maken.',
        category: 'activity'
    },


    // =========================
    // PRIORITEIT - 10 STELLINGEN
    // =========================

    {
        text: 'Ik vind klimaatverandering een belangrijk probleem.',
        category: 'priority'
    },

    {
        text: 'Ik vind dat klimaatbeleid een hoge prioriteit moet hebben.',
        category: 'priority'
    },

    {
        text: 'Ik vind dat de overheid meer moet doen tegen klimaatverandering.',
        category: 'priority'
    },

    {
        text: 'Ik vind dat bedrijven meer verantwoordelijkheid moeten nemen voor hun CO₂-uitstoot.',
        category: 'priority'
    },

    {
        text: 'Ik vind dat Nederland sneller moet overstappen op duurzame energie.',
        category: 'priority'
    },

    {
        text: 'Ik vind dat klimaatbeleid belangrijker is dan economische groei op korte termijn.',
        category: 'priority'
    },

    {
        text: 'Ik vind dat duurzame keuzes voor iedereen makkelijker gemaakt moeten worden.',
        category: 'priority'
    },

    {
        text: 'Ik vind dat vervuilende producten en activiteiten zwaarder belast mogen worden.',
        category: 'priority'
    },

    {
        text: 'Ik vind dat de overheid meer moet investeren in openbaar vervoer.',
        category: 'priority'
    },

    {
        text: 'Ik vind dat klimaatbeleid een belangrijke rol moet spelen bij politieke keuzes.',
        category: 'priority'
    }
];


// ======================================================
// QUIZVRAGEN
// ======================================================

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


// ======================================================
// SPELSTATUS
// ======================================================

let currentIndex = 0;
let currentQuiz = 0;

let quizMode = false;
let quizAnswered = false;


// ======================================================
// SCORES
// ======================================================

let activityScore = 0;
let priorityScore = 0;


// ======================================================
// ELEMENTEN
// ======================================================

const card =
    document.getElementById('statement-card');

const statementText =
    document.getElementById('statement-text');

const progress =
    document.getElementById('progress');

const agreeButton =
    document.getElementById('agree-button');

const disagreeButton =
    document.getElementById('disagree-button');

const trashBin =
    document.getElementById('trash-bin');

const agreeStack =
    document.querySelector('.agree-stack');


// ======================================================
// ALLEEN OP GAME PAGINA
// ======================================================

if (card) {


    // ==================================================
    // QUIZKNOP MAKEN
    // ==================================================

    function createQuizNextButton() {

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


        // Knop buiten de kaart plaatsen
        card.parentElement.appendChild(nextButton);


        nextButton.addEventListener(
            'click',
            nextAfterQuiz
        );


        return nextButton;
    }


    // ==================================================
    // QUIZKNOP VERWIJDEREN
    // ==================================================

    function removeQuizNextButton() {

        const nextButton =
            document.getElementById('quiz-next');

        if (nextButton) {
            nextButton.remove();
        }
    }


    // ==================================================
    // NORMALE STELLING TONEN
    // ==================================================

    function showStatement() {

        quizMode = false;


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


        // Geen stellingen meer?
        if (currentIndex >= statements.length) {
            showEnd();
            return;
        }


        statementText.textContent =
            statements[currentIndex].text;


        progress.textContent =
            `${currentIndex + 1} / ${statements.length}`;
    }


    // ==================================================
    // QUIZ TONEN
    // ==================================================

    function showQuiz() {

        if (currentQuiz >= quizQuestions.length) {
            showEnd();
            return;
        }


        quizMode = true;
        quizAnswered = false;


        // Normale knoppen verbergen
        agreeButton.style.display = 'none';
        disagreeButton.style.display = 'none';


        // Stapel verbergen
        if (agreeStack) {
            agreeStack.style.display = 'none';
        }


        // Prullenbak verbergen
        if (trashBin) {
            trashBin.style.display = 'none';
        }


        card.classList.add('quiz-card');


        const quiz =
            quizQuestions[currentQuiz];


        const letters = [
            'A',
            'B',
            'C',
            'D'
        ];


        // ==================================================
        // QUIZ IN KAART
        // ==================================================

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


        // ==================================================
        // VERDER KNOP BUITEN KAART
        // ==================================================

        const nextButton =
            createQuizNextButton();


        progress.textContent =
            `Quiz ${currentQuiz + 1} / ${quizQuestions.length}`;


        // ==================================================
        // ANTWOORDKNOPPEN
        // ==================================================

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


    // ==================================================
    // QUIZ ANTWOORD CONTROLEREN
    // ==================================================

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


        // ==================================================
        // GOED ANTWOORD
        // ==================================================

        if (selectedAnswer === quiz.correct) {

            quizButtons[selectedAnswer]
                .classList.add('correct');


            feedback.textContent =
                'Goed gedaan! 🎉';


            feedback.classList.add(
                'correct-feedback'
            );

        }


        // ==================================================
        // FOUT ANTWOORD
        // ==================================================

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


        // Verder-knop tonen
        if (nextButton) {
            nextButton.style.display = 'block';
        }
    }


    // ==================================================
    // VERDER NA QUIZ
    // ==================================================

    function nextAfterQuiz() {

        currentQuiz++;


        removeQuizNextButton();


        card.classList.remove('quiz-card');


        // Als er nog stellingen zijn
        if (currentIndex < statements.length) {

            showStatement();

            return;
        }


        // Als alle stellingen klaar zijn,
        // maar er zijn nog quizvragen
        if (currentQuiz < quizQuestions.length) {

            showQuiz();

            return;
        }


        // Alles klaar
        showEnd();
    }


    // ==================================================
    // STELLING BEANTWOORDEN
    // ==================================================

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


        const currentStatement =
            statements[currentIndex];


        // ==================================================
        // SCORE BIJWERKEN
        // ==================================================

        if (currentStatement.category === 'activity') {

            if (answer === 'agree') {
                activityScore++;
            } else {
                activityScore--;
            }

        }


        if (currentStatement.category === 'priority') {

            if (answer === 'agree') {
                priorityScore++;
            } else {
                priorityScore--;
            }

        }


        // ==================================================
        // EENS
        // ==================================================

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


        // ==================================================
        // ONEENS
        // ==================================================

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


        // ==================================================
        // VOLGENDE STELLING
        // ==================================================

        setTimeout(() => {

            currentIndex++;


            card.classList.remove(
                'swipe-up'
            );

            card.classList.remove(
                'swipe-down'
            );


            // Na iedere 5 stellingen een quiz
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


    // ==================================================
    // EINDE
    // ==================================================

    function showEnd() {

    quizMode = true;

    removeQuizNextButton();


    // Knoppen verbergen
    agreeButton.style.display = 'none';
    disagreeButton.style.display = 'none';


    if (agreeStack) {
        agreeStack.style.display = 'none';
    }


    if (trashBin) {
        trashBin.style.display = 'none';
    }


    card.classList.remove('quiz-card');


    // Oude resultaatknop verwijderen
    const oldResultButton =
        document.getElementById('result-button');

    if (oldResultButton) {
        oldResultButton.remove();
    }


    // ==================================================
    // RESULTAAT IN DE CARD
    // ==================================================

    statementText.innerHTML = `

        <div class="game-finished">

            <div class="finished-icon">
                🎉
            </div>

            <h2>
                Je bent klaar!
            </h2>

            <p>
                Dit is jouw resultaat:
            </p>


            <div class="score-results">

                <div class="score-item">

                    <span class="score-label">
                        ACTIVITEIT
                    </span>

                    <strong class="score-value">
                        ${formatScore(activityScore)}
                    </strong>

                    <span class="score-range">
                        van -10 tot +10
                    </span>

                </div>


                <div class="score-item">

                    <span class="score-label">
                        PRIORITEIT
                    </span>

                    <strong class="score-value">
                        ${formatScore(priorityScore)}
                    </strong>

                    <span class="score-range">
                        van -10 tot +10
                    </span>

                </div>

            </div>

        </div>

    `;


    // ==================================================
    // KNOP ONDER DE CARD
    // ==================================================

    const resultButton =
        document.createElement('button');

    resultButton.type = 'button';
    resultButton.id = 'result-button';
    resultButton.className = 'result-button';

    resultButton.textContent =
        'Naar kieskompas →';


    resultButton.addEventListener(
        'click',
        () => {

            window.location.href =
                '/kieskompas';

        }
    );


    // Plaats de knop DIRECT onder de card
    card.insertAdjacentElement(
        'afterend',
        resultButton
    );


    progress.textContent =
        'Klaar!';
}


    // ==================================================
    // SCORE OPMAKEN
    // ==================================================

    function formatScore(score) {

        if (score > 0) {
            return `+${score}`;
        }

        return score;
    }


    // ==================================================
    // EENS / ONEENS KNOPPEN
    // ==================================================

    agreeButton.addEventListener(
        'click',
        () => answer('agree')
    );


    disagreeButton.addEventListener(
        'click',
        () => answer('disagree')
    );


    // ==================================================
    // SWIPE
    // ==================================================

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


    // ==================================================
    // START
    // ==================================================

    showStatement();
}

