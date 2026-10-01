<?php

namespace App\Http\Controllers;

use App\Models\GameScore;
use App\Models\Statement;
use App\Models\QuizQuestion;
use App\Models\UserAnswer;
use App\Models\GameScore;
use Illuminate\Support\Str;
use Illuminate\Http\Request;
use Illuminate\Support\Str;

class GameController extends Controller
{
    public function index()
    {
        $statements = Statement::inRandomOrder()
            ->get([
                'id',
                'text',
                'category',
            ]);

        $quizQuestions = QuizQuestion::inRandomOrder()
            ->get()
            ->map(function ($quiz) {
                return [
                    'id' => $quiz->id,
                    'question' => $quiz->question,
                    'answers' => [
                        $quiz->answer_a,
                        $quiz->answer_b,
                        $quiz->answer_c,
                        $quiz->answer_d,
                    ],
                    'correct' => match ($quiz->correct_answer) {
                        'a' => 0,
                        'b' => 1,
                        'c' => 2,
                        'd' => 3,
                        default => null,
                    },
                ];
            });

        return view('game', compact(
            'statements',
            'quizQuestions'
        ));
    }

    public function statement(Request $request)
    {
        $validated = $request->validate([
            'statement_id' => [
                'required',
                'exists:statements,id',
            ],
            'answer' => [
                'required',
                'in:agree,disagree',
            ],
        ]);

        $statement = Statement::findOrFail(
            $validated['statement_id']
        );

        if ($validated['answer'] === 'agree') {

    $statement->increment('aantal_eens');

    if (auth()->check()) {
        auth()->user()->increment('eens');
    }

} else {

    $statement->increment('aantal_oneens');

    if (auth()->check()) {
        auth()->user()->increment('oneens');
    }
}

        UserAnswer::create([
            'user_id' => auth()->id(),
            'statement_id' => $statement->id,
            'answer' => $validated['answer'],
        ]);

        return response()->json([
            'success' => true,
        ]);
    }

    public function quiz(Request $request)
    {
<<<<<<< HEAD
        $validated = $request->validate([
=======
        $request->validate([
>>>>>>> f27eb7fd22e09b2d3070cfbe070e551e430a2c95
            'quiz_question_id' => [
                'required',
                'exists:quiz_questions,id',
            ],
            'answer' => [
                'required',
                'in:a,b,c,d',
            ],
        ]);

        $question = QuizQuestion::findOrFail(
            $validated['quiz_question_id']
        );

        $correct = $question->correct_answer === $validated['answer'];

        UserAnswer::create([
            'user_id' => auth()->id(),
            'quiz_question_id' => $question->id,
            'answer' => $validated['answer'],
            'correct' => $correct,
        ]);

        return response()->json([
            'correct' => $correct,
            'message' => $correct
                ? 'Goed antwoord!'
                : 'Helaas, dat antwoord is niet juist.',
        ]);
    }

    public function saveScore(Request $request)
    {
        $validated = $request->validate([
            'activity_score' => [
                'required',
                'integer',
            ],
            'priority_score' => [
                'required',
                'integer',
            ],
            'quiz_correct' => [
                'required',
                'integer',
                'min:0',
            ],
            'quiz_total' => [
                'required',
                'integer',
                'min:0',
            ],
        ]);

        /*
        |--------------------------------------------------------------------------
<<<<<<< HEAD
        | Gebruiker met account
=======
        | Ingelogde gebruiker
>>>>>>> f27eb7fd22e09b2d3070cfbe070e551e430a2c95
        |--------------------------------------------------------------------------
        */

        if (auth()->check()) {

            $user = auth()->user();

            $user->update([
                'activity_score' => $validated['activity_score'],
                'priority_score' => $validated['priority_score'],
                'quiz_correct' => $validated['quiz_correct'],
                'quiz_total' => $validated['quiz_total'],
            ]);

            return response()->json([
                'success' => true,
                'type' => 'user',
<<<<<<< HEAD
                'user_id' => $user->id,
=======
>>>>>>> f27eb7fd22e09b2d3070cfbe070e551e430a2c95
                'message' => 'Score opgeslagen bij het account.',
            ]);
        }

        /*
        |--------------------------------------------------------------------------
        | Gast
        |--------------------------------------------------------------------------
        */

<<<<<<< HEAD
        $guestId = $request->session()->get('guest_id');

        if (!$guestId) {
            $guestId = (string) Str::uuid();

            $request->session()->put(
                'guest_id',
                $guestId
            );
        }

        $gameScore = GameScore::create([
            'user_id' => null,
            'guest_id' => $guestId,
=======
        if (!$request->session()->has('guest_id')) {
            $request->session()->put(
                'guest_id',
                (string) Str::uuid()
            );
        }

        GameScore::create([
            'user_id' => null,
            'guest_id' => $request->session()->get('guest_id'),
>>>>>>> f27eb7fd22e09b2d3070cfbe070e551e430a2c95
            'activity_score' => $validated['activity_score'],
            'priority_score' => $validated['priority_score'],
            'quiz_correct' => $validated['quiz_correct'],
            'quiz_total' => $validated['quiz_total'],
        ]);

        return response()->json([
            'success' => true,
            'type' => 'guest',
<<<<<<< HEAD
            'guest_id' => $guestId,
            'game_score_id' => $gameScore->id,
            'message' => 'Gastscore opgeslagen.',
=======
            'message' => 'Score opgeslagen als gast.',
>>>>>>> f27eb7fd22e09b2d3070cfbe070e551e430a2c95
        ]);
    }
}