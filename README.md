# KliMaten

KliMaten is een telefoonvriendelijke website gebouwd met Laravel 11, Blade, Vite en Tailwind CSS.

## Benodigdheden

- PHP 8.2 of hoger
- Composer
- Node.js en npm

## Project starten

1. Installeer de PHP- en JavaScript-dependencies:

   ```bash
   composer install
   npm install
   ```

2. Maak het lokale configuratiebestand aan:

   ```bash
   copy .env.example .env
   php artisan key:generate
   ```

3. Start de ontwikkelomgeving:

   ```bash
   composer run dev
   ```

   De website is daarna beschikbaar op `http://localhost:8000`.

## Controles voor een wijziging

Voer voor het delen van werk minimaal deze controles uit:

```bash
php artisan test
vendor/bin/pint --test
npm run build
```

Gebruik `vendor/bin/pint` om PHP-code automatisch te formatteren wanneer de controle fouten meldt.

## Afspraken

- Bouw eerst voor een klein telefoonscherm en controleer daarna grotere schermen.
- Houd routes in `routes/`, controllers in `app/Http/Controllers/` en views in `resources/views/`.
- Gebruik migrations voor databasewijzigingen; pas de database niet handmatig aan.
- Commit nooit `.env`, wachtwoorden, API-sleutels of andere lokale secrets.
- Voeg bij nieuwe functionaliteit passende tests toe in `tests/Feature/` of `tests/Unit/`.

## Handige Laravel-documentatie

- [Laravel-documentatie](https://laravel.com/docs)
- [Blade-views](https://laravel.com/docs/blade)
- [Laravel routing](https://laravel.com/docs/routing)
