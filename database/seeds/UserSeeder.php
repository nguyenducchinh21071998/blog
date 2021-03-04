<?php

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Str;
use \Illuminate\Support\Facades\Hash;

class UserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        DB::table('users')->insert([
            'name' => 'Admin',
            'email' => "admin@admin.com",
            'password' => Hash::make('123456789'),
            'email_verified_at' => now(),
            'remember_token' => Str::random(10),
            'mobile' => '0987654321',
            'address' => 'HN',
            'position' => 'Admin'
        ]);
    }
}
