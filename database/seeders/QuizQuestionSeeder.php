<?php

namespace Database\Seeders;

use App\Models\QuizQuestion;
use Illuminate\Database\Seeder;

class QuizQuestionSeeder extends Seeder
{
    public function run(): void
    {
        $questions = [
            [
                'question' => 'Welke energiebron is hernieuwbaar?',
                'answer_a' => 'Kolen',
                'answer_b' => 'Windenergie',
                'answer_c' => 'Aardgas',
                'answer_d' => 'Olie',
                'correct_answer' => 'b',
            ],

            [
                'question' => 'Wat is CO₂?',
                'answer_a' => 'Een broeikasgas',
                'answer_b' => 'Een soort plastic',
                'answer_c' => 'Een brandstof',
                'answer_d' => 'Een metaal',
                'correct_answer' => 'a',
            ],

            [
                'question' => 'Welke keuze helpt om energie te besparen?',
                'answer_a' => 'Licht onnodig laten branden',
                'answer_b' => 'Apparaten onnodig aan laten staan',
                'answer_c' => 'Energiezuinige apparaten gebruiken',
                'answer_d' => 'De verwarming hoger zetten',
                'correct_answer' => 'c',
            ],

            [
                'question' => 'Welke vervoerswijze heeft doorgaans een lage CO₂-uitstoot per persoon?',
                'answer_a' => 'Vliegtuig',
                'answer_b' => 'Auto',
                'answer_c' => 'Trein',
                'answer_d' => 'Motor',
                'correct_answer' => 'c',
            ],

            [
                'question' => 'Wat kan helpen tegen klimaatverandering?',
                'answer_a' => 'Meer fossiele brandstoffen gebruiken',
                'answer_b' => 'Energie besparen',
                'answer_c' => 'Meer verspillen',
                'answer_d' => 'Meer wegwerpproducten gebruiken',
                'correct_answer' => 'b',
            ],
        ];

        foreach ($questions as $question) {
            QuizQuestion::updateOrCreate(
                ['question' => $question['question']],
                $question,
            );
        }
    }
}