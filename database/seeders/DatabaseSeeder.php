<?php

namespace Database\Seeders;

// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     *
     * @return void
     */
    public function run()
    {
        // \App\Models\User::factory(10)->create();

        \App\Models\User::factory()->create([
            'name' => 'User',
            'email' => 'user@marioapp.com',
            'rol' => 'user',
        ]);
        \App\Models\User::factory()->create([
            'name' => 'Admin',
            'email' => 'admin@marioapp.com',
            'rol' => 'admin',
        ]);
    }
}
