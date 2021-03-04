<?php

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class SemesterSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $array = [
            [
                'name' => "Kì 1 - Năm 1"
            ],
            [
                'name' => "Kì 2 - Năm 1"
            ],
            [
                'name' => "Kì 1 - Năm 2"
            ],
            [
                'name' => "Kì 2 - Năm 2"
            ],
            [
                'name' => "Kì 1 - Năm 3"
            ],
            [
                'name' => "Kì 2 - Năm 3"
            ],
            [
                'name' => "Kì 1 - Năm 4"
            ],
            [
                'name' => "Kì 2 - Năm 4"
            ],
            [
                'name' => "Kì 1 - Năm 5"
            ],
            [
                'name' => "Kì 2 - Năm 5"
            ]
        ];
        DB::table('semesters')->insert($array);
    }
}
