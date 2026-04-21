<?php

declare(strict_types=1);

namespace App\Providers;

use Carbon\CarbonImmutable;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\App;
use Illuminate\Support\Facades\Date;
use Illuminate\Support\Facades\DB;
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
    }

    /**
     * Configure default behaviors for production-ready applications.
     */
    private function configureDefaults(): void
    {
        Date::use(CarbonImmutable::class);

        DB::prohibitDestructiveCommands(
            $this->isProduction(),
        );

        Password::defaults(fn (): ?Password => $this->isProduction()
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

        Model::preventLazyLoading(! $this->isProduction());
    }

    /**
     * Configure application's generation.
     */
    private function configureUrl(): void
    {
        URL::forceScheme('https');
        //        URL::forceHttps(true);
    }

    /**
     * Configure application's Vite.
     */
    private function configureVite(): void
    {
        if ($this->isTesting()) {
            config(['inertia.ssr.enabled' => false]);

            return;
        }

        Vite::usePrefetchStrategy(
            $this->isProduction() ? 'aggressive' : 'hover'
        );
    }

    private function isProduction(): bool
    {
        return App::isProduction();
    }

    private function isTesting(): bool
    {
        return App::runningUnitTests();
    }
}
