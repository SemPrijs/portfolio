<?php

namespace Database\Seeders;

use App\Models\Statement;
use Illuminate\Database\Seeder;

class StatementSeeder extends Seeder
{
    public function run(): void
    {
        $statements = [
            [
                'text' => 'Ik probeer bewust mijn energieverbruik te verminderen.',
                'category' => 'activity',
            ],
            [
                'text' => 'Ik gebruik zo vaak mogelijk de fiets of het openbaar vervoer.',
                'category' => 'activity',
            ],
            [
                'text' => 'Ik probeer minder vlees te eten vanwege het klimaat.',
                'category' => 'activity',
            ],
            [
                'text' => 'Ik probeer mijn woning zo energiezuinig mogelijk te maken.',
                'category' => 'activity',
            ],
            [
                'text' => 'Ik let erop hoeveel energie mijn apparaten gebruiken.',
                'category' => 'activity',
            ],
            [
                'text' => 'Ik probeer zo min mogelijk voedsel te verspillen.',
                'category' => 'activity',
            ],
            [
                'text' => 'Ik koop regelmatig tweedehands producten om verspilling te verminderen.',
                'category' => 'activity',
            ],
            [
                'text' => 'Ik probeer minder vaak het vliegtuig te nemen.',
                'category' => 'activity',
            ],
            [
                'text' => 'Ik scheid mijn afval om grondstoffen opnieuw te kunnen gebruiken.',
                'category' => 'activity',
            ],
            [
                'text' => 'Ik probeer in mijn dagelijks leven bewuste duurzame keuzes te maken.',
                'category' => 'activity',
            ],
            [
                'text' => 'Ik vind klimaatverandering een belangrijk probleem.',
                'category' => 'priority',
            ],
            [
                'text' => 'Ik vind dat klimaatbeleid een hoge prioriteit moet hebben.',
                'category' => 'priority',
            ],
            [
                'text' => 'Ik vind dat de overheid meer moet doen tegen klimaatverandering.',
                'category' => 'priority',
            ],
            [
                'text' => 'Ik vind dat bedrijven meer verantwoordelijkheid moeten nemen voor hun CO₂-uitstoot.',
                'category' => 'priority',
            ],
            [
                'text' => 'Ik vind dat Nederland sneller moet overstappen op duurzame energie.',
                'category' => 'priority',
            ],
            [
                'text' => 'Ik vind dat klimaatbeleid belangrijker is dan economische groei op korte termijn.',
                'category' => 'priority',
            ],
            [
                'text' => 'Ik vind dat duurzame keuzes voor iedereen makkelijker gemaakt moeten worden.',
                'category' => 'priority',
            ],
            [
                'text' => 'Ik vind dat vervuilende producten en activiteiten zwaarder belast mogen worden.',
                'category' => 'priority',
            ],
            [
                'text' => 'Ik vind dat de overheid meer moet investeren in openbaar vervoer.',
                'category' => 'priority',
            ],
            [
                'text' => 'Ik vind dat klimaatbeleid een belangrijke rol moet spelen bij politieke keuzes.',
                'category' => 'priority',
            ],
        ];

        foreach ($statements as $statement) {
            Statement::create([
                'text' => $statement['text'],
                'category' => $statement['category'],
                'aantal_eens' => 0,
                'aantal_oneens' => 0,
            ]);
        }
    }
}
