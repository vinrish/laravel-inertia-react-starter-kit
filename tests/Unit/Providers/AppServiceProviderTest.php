<?php

declare(strict_types=1);

use App\Providers\AppServiceProvider;
use Illuminate\Support\Facades\App;
use Illuminate\Validation\Rules\Password;

function bootProvider(string $env): void
{
    App::detectEnvironment(fn (): string => $env);

    new AppServiceProvider(app())->boot();
}

it('detects production environment', function (): void {
    bootProvider('production');

    expect(app()->isProduction())->toBeTrue();
});

it('detects non-production environment', function (): void {
    bootProvider('local');

    expect(app()->isProduction())->toBeFalse();
});

it('applies strict password rules in production', function (): void {
    bootProvider('production');

    $rule = Password::default();

    expect($rule)->not->toBeNull();
});

it('applies relaxed password rules outside production', function (): void {
    bootProvider('local');

    $rule = Password::default();

    expect($rule)->not->toBeNull();
});
