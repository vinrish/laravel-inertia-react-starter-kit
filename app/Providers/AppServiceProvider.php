<?php

declare(strict_types=1);

namespace App\Providers;

use Carbon\CarbonImmutable;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\Date;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\URL;
use Illuminate\Support\Facades\Vite;
use Illuminate\Support\ServiceProvider;
use Illuminate\Validation\Rules\Password;

final class AppServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     */
    public function register(): void
    {
        //
    }

    /**
     * Bootstrap any application services.
     */
    public function boot(): void
    {
        $this->configureDefaults();
        $this->configureModels();
        $this->configureUrl();
        $this->configureVite();
        $this->configureSecurity();
    }

    /**
     * Configure default behaviors for production-ready applications.
     */
    private function configureDefaults(): void
    {
        Date::use(CarbonImmutable::class);

        DB::prohibitDestructiveCommands(
            app()->isProduction(),
        );

        Password::defaults(fn (): ?Password => app()->isProduction()
            ? Password::min(12)
                ->mixedCase()
                ->letters()
                ->numbers()
                ->symbols()
                ->uncompromised()
            : Password::min(8),
        );
    }

    /**
     * Configure Eloquent models.
     */
    private function configureModels(): void
    {
        Model::shouldBeStrict();

        Model::unguard();

        Model::preventLazyLoading(! app()->isProduction());
    }

    /**
     * Configure application's generation.
     */
    private function configureUrl(): void
    {
        URL::forceScheme('https');
        URL::forceHttps(true);
    }

    /**
     * Configure application's Vite.
     */
    private function configureVite(): void
    {
        if (app()->runningUnitTests()) {
            config(['inertia.ssr.enabled' => false]);
        }

        Vite::usePrefetchStrategy(
            app()->isProduction() ? 'aggressive' : 'hover'
        );
    }

    private function configureSecurity(): void
    {
        Http::preventStrayRequests(true);
    }
}
