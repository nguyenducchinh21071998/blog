<?php

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class DepartmentSeeder extends Seeder
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
                'name' => "P102-TA2"
            ],
            [
                'name' => "P103-TA2"
            ],
            [
                'name' => "P104-TA2"
            ]
        ];
        DB::table('departments')->insert($array);
    }
}
