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
let scoreSaved = false;


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

        agreeButton.style.display = '';
        disagreeButton.style.display = '';

        if (agreeStack) {
            agreeStack.style.display = '';
        }

        if (trashBin) {
            trashBin.style.display = '';
        }

        card.classList.remove('quiz-card');

        agreeButton.disabled = false;
        disagreeButton.disabled = false;

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

        agreeButton.style.display = 'none';
        disagreeButton.style.display = 'none';

        if (agreeStack) {
            agreeStack.style.display = 'none';
        }

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

        const nextButton =
            createQuizNextButton();

        progress.textContent =
            `Quiz ${currentQuiz + 1} / ${quizQuestions.length}`;

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
    // QUIZ ANTWOORD CONTROLEREN + OPSLAAN
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
        // ANTWOORD OMZETTEN NAAR A/B/C/D
        // ==================================================

        const answerLetters = [
            'a',
            'b',
            'c',
            'd'
        ];

        const selectedAnswerLetter =
            answerLetters[selectedAnswer];


        // ==================================================
        // ANTWOORD OPSLAAN IN DATABASE
        // ==================================================

        saveQuizAnswer(
            quiz.id,
            selectedAnswerLetter
        );


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
    // QUIZ ANTWOORD NAAR DATABASE STUREN
    // ==================================================

    function saveQuizAnswer(
        quizQuestionId,
        answer
    ) {

        const csrfToken =
            document.querySelector(
                'meta[name="csrf-token"]'
            )?.getAttribute('content');

        if (!csrfToken) {
            console.error(
                'CSRF-token niet gevonden.'
            );

            return;
        }


        fetch('/game/quiz', {
            method: 'POST',

            credentials: 'same-origin',

            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                'X-CSRF-TOKEN': csrfToken,
            },

            body: JSON.stringify({
                quiz_question_id: quizQuestionId,
                answer: answer,
            }),
        })
        .then(response => {

            if (!response.ok) {

                throw new Error(
                    `Quiz antwoord opslaan mislukt: ${response.status}`
                );
            }

            return response.json();
        })
        .then(data => {

            console.log(
                'Quiz antwoord opgeslagen:',
                data
            );

        })
        .catch(error => {

            console.error(
                'Quiz antwoord kon niet worden opgeslagen:',
                error
            );

        });
    }


    // ==================================================
    // VERDER NA QUIZ
    // ==================================================

    function nextAfterQuiz() {

        currentQuiz++;

        removeQuizNextButton();

        card.classList.remove('quiz-card');

        if (currentIndex < statements.length) {

            showStatement();

            return;
        }

        if (currentQuiz < quizQuestions.length) {

            showQuiz();

            return;
        }

        showEnd();
    }


    // ==================================================
    // STELLING BEANTWOORDEN
    // ==================================================

    function answer(answer) {

        if (quizMode) {
            return;
        }

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
        // ANTWOORD STELLING OPSLAAN
        // ==================================================

        saveStatementAnswer(
            currentStatement.id,
            answer
        );


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
    // STELLING ANTWOORD NAAR DATABASE STUREN
    // ==================================================

    function saveStatementAnswer(
        statementId,
        answer
    ) {

        const csrfToken =
            document.querySelector(
                'meta[name="csrf-token"]'
            )?.getAttribute('content');

        if (!csrfToken) {
            console.error(
                'CSRF-token niet gevonden.'
            );

            return;
        }


        fetch('/game/statement', {
            method: 'POST',

            credentials: 'same-origin',

            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                'X-CSRF-TOKEN': csrfToken,
            },

            body: JSON.stringify({
                statement_id: statementId,
                answer: answer,
            }),
        })
        .then(response => {

            if (!response.ok) {

                throw new Error(
                    `Stelling opslaan mislukt: ${response.status}`
                );
            }

            return response.json();
        })
        .then(data => {

            console.log(
                'Stelling opgeslagen:',
                data
            );

        })
        .catch(error => {

            console.error(
                'Stelling kon niet worden opgeslagen:',
                error
            );

        });
    }
// ======================================================
// SCORE OPSLAAN
// ======================================================

async function saveScore() {

    console.log('SAVE SCORE START');

    const csrfToken =
        document.querySelector(
            'meta[name="csrf-token"]'
        )?.getAttribute('content');

    if (!csrfToken) {
        console.error('GEEN CSRF TOKEN');
        return false;
    }

    try {

        const response = await fetch(
            '/game/save-score',
            {
                method: 'POST',

                credentials: 'same-origin',

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
            }
        );

        const data = await response.json();

        console.log(
            'SAVE SCORE RESPONSE:',
            response.status,
            data
        );

        if (!response.ok) {
            console.error(
                'SAVE SCORE MISLUKT'
            );

            return false;
        }

        scoreSaved = true;

        console.log(
            'SCORE STAAT IN DATABASE'
        );

        return true;

    } catch (error) {

        console.error(
            'SAVE SCORE ERROR:',
            error
        );

        return false;
    }
}

    // ==================================================
    // EINDE
    // ==================================================

    async function showEnd() {

        quizMode = true;


        // Score opslaan
        await saveScore();


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
            document.getElementById(
                'result-button'
            );

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

        resultButton.id =
            'result-button';

        resultButton.className =
            'result-button';

        resultButton.textContent =
            'Naar kieskompas →';


        resultButton.addEventListener(
            'click',
            () => {

                window.location.href =
                    '/klimaatkompas';

            }
        );


        card.insertAdjacentElement(
            'afterend',
            resultButton
        );


        progress.textContent =
            'Klaar!';
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

            if (quizMode) {
                return;
            }

            const endY =
                event.clientY;

            const endX =
                event.clientX;

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