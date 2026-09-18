<?php

namespace Tests\Feature;

// use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class ExampleTest extends TestCase
{
    /**
     * A basic test example.
     */
    public function test_the_application_returns_a_successful_response(): void
    {
        $response = $this->get('/');

        $response->assertStatus(200);
    }

    public function test_bottom_navigation_links_are_visible(): void
    {
        $response = $this->get('/');

        $response->assertSeeText('Home');
        $response->assertSeeText('Leer over klimaat');
    }

    public function test_the_learning_page_renders_the_climate_style_only(): void
    {
        $response = $this->get('/profiel');

        $response->assertStatus(200);
        $response->assertSeeText('Leer over klimaat');
        $response->assertDontSeeText('Wat is klimaatverandering?');
    }
}
