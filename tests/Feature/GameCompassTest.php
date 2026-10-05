<?php

namespace Tests\Feature;

use App\Models\Statement;
use Database\Seeders\StatementSeeder;
use Illuminate\Foundation\Testing\DatabaseTransactions;
use Illuminate\Pagination\LengthAwarePaginator;
use Tests\TestCase;

class GameCompassTest extends TestCase
{
    use DatabaseTransactions;

    public function test_game_shows_exactly_twenty_categorized_statements(): void
    {
        $this->seed(StatementSeeder::class);

        Statement::create([
            'text' => 'Extra test activity statement',
            'category' => 'activity',
        ]);

        Statement::create([
            'text' => 'Extra test priority statement',
            'category' => 'priority',
        ]);

        $this->get('/game')
            ->assertOk()
            ->assertViewHas('statements', function ($statements): bool {
                return $statements->count() === 20
                    && $statements->every(fn (Statement $statement): bool => in_array(
                        $statement->category,
                        ['activity', 'priority'],
                        true,
                    ));
            });
    }

    public function test_saved_game_score_is_used_by_the_compass(): void
    {
        $this->postJson('/game/save-score', [
            'activity_score' => 30,
            'priority_score' => 40,
            'quiz_correct' => 4,
            'quiz_total' => 6,
        ])
            ->assertOk()
            ->assertSessionHas('activity_score', 30)
            ->assertSessionHas('priority_score', 40);

        $this->get('/klimaatkompas')
            ->assertOk()
            ->assertSeeText('Klimaatprioriteit: 40 | Activiteit: 30');
    }

    public function test_admin_can_create_a_statement_with_a_category(): void
    {
        $this->withSession(['is_admin' => true])
            ->get('/admin')
            ->assertOk()
            ->assertSee('name="category" required', false)
            ->assertSeeText('Activiteit')
            ->assertSeeText('Prioriteit');

        $this->withSession(['is_admin' => true])
            ->post('/admin/statements', [
                'text' => 'Test climate statement',
                'category' => 'priority',
            ])
            ->assertRedirect('/admin')
            ->assertSessionHas('success');

        $this->assertDatabaseHas('statements', [
            'text' => 'Test climate statement',
            'category' => 'priority',
        ]);
    }

    public function test_admin_statement_list_is_paginated_to_ten_rows(): void
    {
        $this->seed(StatementSeeder::class);
        $expectedTotal = Statement::count();

        $this->withSession(['is_admin' => true])
            ->get('/admin')
            ->assertOk()
            ->assertSee('page=2', false)
            ->assertSeeText('Categorie')
            ->assertSeeText('Activiteit')
            ->assertSeeText('Pagina 1 van')
            ->assertSeeText('Volgende')
            ->assertViewHas('statements', function ($statements) use ($expectedTotal): bool {
                return $statements instanceof LengthAwarePaginator
                    && $statements->count() === 10
                    && $statements->total() === $expectedTotal
                    && $statements->lastPage() > 1;
            });
    }
}