<?php

namespace App\Http\Controllers;

use App\Models\Statement;
use App\Models\QuizQuestion;
use App\Models\UserAnswer;
use Illuminate\Http\Request;

class GameController extends Controller
{
    public function index()
    {
        $statements = Statement::inRandomOrder()
            ->get(['id', 'text']);

        return view('game', compact('statements'));
    }

    public function statement(Request $request)
    {
        $request->validate([
            'statement_id' => ['required', 'exists:statements,id'],
            'answer' => ['required', 'in:agree,disagree'],
        ]);

        UserAnswer::create([
            'user_id' => auth()->id(),
            'statement_id' => $request->statement_id,
            'answer' => $request->answer,
        ]);

        return response()->json([
            'success' => true,
        ]);
    }

    public function quiz(Request $request)
    {
        $request->validate([
            'quiz_question_id' => ['required', 'exists:quiz_questions,id'],
            'answer' => ['required', 'in:a,b,c,d'],
        ]);

        $question = QuizQuestion::findOrFail(
            $request->quiz_question_id
        );

        $correct = $question->correct_answer === $request->answer;

        UserAnswer::create([
            'user_id' => auth()->id(),
            'quiz_question_id' => $question->id,
            'answer' => $request->answer,
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
        'activity_score' => ['required', 'integer'],
        'priority_score' => ['required', 'integer'],
    ]);

    $request->session()->put([
        'activity_score' => $validated['activity_score'],
        'priority_score' => $validated['priority_score'],
    ]);

    return response()->json([
        'success' => true,
    ]);
}
}