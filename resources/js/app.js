import './bootstrap';

const statements = window.statements || [];
const quizQuestions = window.quizQuestions || [];


// ======================================================
// SPELSTATUS
// ======================================================

let currentIndex = 0;
let currentQuiz = 0;

let quizMode = false;
let quizAnswered = false;

let correctQuizAnswers = 0;


// ======================================================
// SCORES
// ======================================================

let activityScore = 0;
let priorityScore = 0;
const pointsPerStatement = 10;


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

            correctQuizAnswers++;

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
                activityScore += pointsPerStatement;
            } else {
                activityScore -= pointsPerStatement;
            }

        }


        if (currentStatement.category === 'priority') {

            if (answer === 'agree') {
                priorityScore += pointsPerStatement;
            } else {
                priorityScore -= pointsPerStatement;
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

    // ======================================================
// SCORE OPSLAAN
// ======================================================

function saveScore() {

    const csrfToken =
        document.querySelector('meta[name="csrf-token"]')
            ?.getAttribute('content');

    if (!csrfToken) {
        console.error('CSRF-token niet gevonden.');
        return;
    }

    fetch('/game/save-score', {
        method: 'POST',

        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'X-CSRF-TOKEN': csrfToken,
        },

        body: JSON.stringify({
            activity_score: activityScore,
            priority_score: priorityScore,
            quiz_correct: correctQuizAnswers,
            quiz_total: quizQuestions.length,
        }),
    })
    .then(response => {

        if (!response.ok) {
            throw new Error(
                `Score opslaan mislukt: ${response.status}`
            );
        }

        return response.json();
    })
    .then(data => {

        console.log('Score opgeslagen:', data);

    })
    .catch(error => {

        console.error(
            'De score kon niet worden opgeslagen:',
            error
        );

    });
}

    // ==================================================
    // EINDE
    // ==================================================

    function showEnd() {

        quizMode = true;

        // Score opslaan
        saveScore();

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

            <div class="quiz-result">

                <strong class="quiz-result-score">
                    ${correctQuizAnswers}/${quizQuestions.length}
                </strong>

                <span class="quiz-result-text">
                    vragen goed
                </span>

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
                '/klimaatkompas';

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

