<?php

declare(strict_types=1);

namespace App\Actions\User;

use App\Models\User;
use Illuminate\Auth\Events\Registered;
use Illuminate\Support\Facades\DB;
use SensitiveParameter;
use Throwable;

final readonly class CreateUser
{
    /**
     * @param  array<string, mixed>  $attributes
     *
     * @throws Throwable
     */
    public function handle(array $attributes, #[SensitiveParameter] string $password): User
    {
        return DB::transaction(function () use ($attributes, $password) {
            $user = User::query()->create([
                ...$attributes,
                'password' => $password,
            ]);

            event(new Registered($user));

            return $user;
        });
    }
}
