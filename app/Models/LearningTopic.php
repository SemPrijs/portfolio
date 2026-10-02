<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Model;

class LearningTopic extends Model
{
    protected $table = 'learning_topics';

    protected $fillable = [
        'slug',
        'title',
        'icon',
        'intro',
        'what',
        'why',
        'action',
        'fact',
        'color_class',
        'sort_order',
        'is_active',
    ];

    protected $casts = [
        'is_active' => 'boolean',
        'sort_order' => 'integer',
    ];

    public static function ordered(): Builder
    {
        return static::query()
            ->where('is_active', true)
            ->orderBy('sort_order')
            ->orderBy('title');
    }

    public static function seedDefaults(): void
    {
        $defaults = [
            [
                'slug' => 'klimaatverandering',
                'title' => 'Klimaatverandering',
                'icon' => '🌡️',
                'intro' => 'Introductietekst over klimaatverandering. Dit onderwerp raakt aan ons dagelijks leven en de toekomst!',
                'what' => 'Een korte uitleg in begrijpelijke taal voor jongeren en gezinnen.',
                'why' => 'Dit onderwerp heeft grote invloed op onze toekomst en het klimaat.',
                'action' => 'Kleine stappen die jij en je gezin kunnen zetten.',
                'fact' => 'Klimaatverandering betekent dat de gemiddelde temperatuur op aarde stijgt door extra broeikasgassen in de lucht.',
                'color_class' => 'topic-orange',
                'sort_order' => 1,
            ],
            [
                'slug' => 'energie',
                'title' => 'Energie',
                'icon' => '⚡',
                'intro' => 'Energie gebruiken we elke dag. Ontdek waar het vandaan komt en hoe we ermee omgaan.',
                'what' => 'Energie is wat nodig is om iets te laten werken, bewegen of veranderen.',
                'why' => 'De manier waarop we energie opwekken heeft invloed op het klimaat.',
                'action' => 'Bespaar energie door lichten uit te doen en apparaten bewust te gebruiken.',
                'fact' => 'Energie besparen begint vaak met kleine keuzes, zoals het uitzetten van lampen en het niet onnodig laten draaien van apparaten.',
                'color_class' => 'topic-yellow',
                'sort_order' => 2,
            ],
            [
                'slug' => 'voeding',
                'title' => 'Voeding',
                'icon' => '🍃',
                'intro' => 'Wat we eten heeft invloed op de aarde, dieren en mensen over de hele wereld.',
                'what' => 'Voeding is alles wat we eten en drinken om ons lichaam energie te geven.',
                'why' => 'Voedsel maken, vervoeren en weggooien kost grondstoffen en energie.',
                'action' => 'Kies vaker voor seizoensproducten en gooi zo min mogelijk eten weg.',
                'fact' => 'Veel voedsel wordt weggegooid terwijl het nog prima eetbaar is. Dat kost tijd, energie en water.',
                'color_class' => 'topic-green',
                'sort_order' => 3,
            ],
            [
                'slug' => 'afval-recycling',
                'title' => 'Afval & recycling',
                'icon' => '♻️',
                'intro' => 'Minder afval maken en goed scheiden helpt om grondstoffen en de natuur te beschermen.',
                'what' => 'Afval is iets wat we niet meer gebruiken. Recycling geeft materialen een nieuw leven.',
                'why' => 'Nieuwe spullen maken kost grondstoffen, water en energie.',
                'action' => 'Gebruik spullen langer, repareer ze en scheid je afval goed.',
                'fact' => 'Door spullen opnieuw te gebruiken of te recyclen, laten we minder nieuwe grondstoffen uit de aarde halen.',
                'color_class' => 'topic-blue',
                'sort_order' => 4,
            ],
            [
                'slug' => 'vervoer',
                'title' => 'Vervoer',
                'icon' => '🚲',
                'intro' => 'We verplaatsen ons elke dag. Dat kan op manieren die beter zijn voor het klimaat.',
                'what' => 'Vervoer brengt mensen en spullen van de ene naar de andere plek.',
                'why' => 'Auto’s, vliegtuigen en vrachtwagens gebruiken brandstof en stoten broeikasgassen uit.',
                'action' => 'Pak vaker de fiets, loop of kies het openbaar vervoer.',
                'fact' => 'Fietsen is gezond voor jou en goed voor de lucht en het klimaat.',
                'color_class' => 'topic-purple',
                'sort_order' => 5,
            ],
            [
                'slug' => 'duurzaamheid',
                'title' => 'Duurzaamheid',
                'icon' => '🌍',
                'intro' => 'Duurzaamheid betekent goed zorgen voor de aarde, nu en voor de mensen na ons.',
                'what' => 'Duurzaam leven houdt rekening met mens, milieu en de toekomst.',
                'why' => 'De aarde heeft grenzen. Samen kunnen we zorgen dat er genoeg blijft voor iedereen.',
                'action' => 'Maak bewuste keuzes en kijk steeds hoe je iets kunt hergebruiken.',
                'fact' => 'Kleine keuzes van veel mensen maken samen een groot verschil voor de planeet.',
                'color_class' => 'topic-mint',
                'sort_order' => 6,
            ],
        ];

        foreach ($defaults as $topic) {
            static::updateOrCreate(
                ['slug' => $topic['slug']],
                [
                    'title' => $topic['title'],
                    'icon' => $topic['icon'],
                    'intro' => $topic['intro'],
                    'what' => $topic['what'],
                    'why' => $topic['why'],
                    'action' => $topic['action'],
                    'fact' => $topic['fact'],
                    'color_class' => $topic['color_class'],
                    'sort_order' => $topic['sort_order'],
                    'is_active' => true,
                ]
            );
        }
    }
}
