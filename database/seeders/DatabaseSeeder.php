<?php

namespace Database\Seeders;

use App\Models\AdminAccount;
use App\Models\LearningTopic;
use App\Models\User;
// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // User::factory(10)->create();

        if (app()->environment(['local', 'testing'])) {
            User::factory()->create([
                'name' => 'Test User',
                'email' => 'test@example.com',
            ]);
        }

        AdminAccount::updateOrCreate(
            ['email' => env('ADMIN_EMAIL', 'admin@klimaten.nl')],
            [
                'name' => 'Hoofdadmin',
                'password' => env('ADMIN_PASSWORD', 'klimaten'),
                'is_active' => true,
            ],
        );

        LearningTopic::seedDefaults();
    }
}
