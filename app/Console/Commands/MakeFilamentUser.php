<?php

namespace App\Console\Commands;

use App\Models\User;
use Illuminate\Console\Command;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;

class MakeFilamentUser extends Command
{
    protected $signature = 'make:filament-user';

    protected $description = 'Create a new Filament admin user';

    public function handle(): int
    {
        $name = $this->ask('Name');

        $email = $this->askValid('Email', 'email', ['required', 'email', 'unique:users,email']);

        $password = $this->secret('Password');

        User::create([
            'name'     => $name,
            'email'    => $email,
            'password' => Hash::make($password),
        ]);

        $this->info("Admin user [{$email}] created successfully.");

        return self::SUCCESS;
    }

    private function askValid(string $question, string $field, array $rules): string
    {
        $value = $this->ask($question);

        $validator = Validator::make([$field => $value], [$field => $rules]);

        if ($validator->fails()) {
            $this->error($validator->errors()->first($field));

            return $this->askValid($question, $field, $rules);
        }

        return $value;
    }
}
