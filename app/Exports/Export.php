<?php

namespace App\Exports;

use Maatwebsite\Excel\Concerns\FromCollection;
use App\ClassRoomUnit;

class Export implements FromCollection
{
    /**
    * @return \Illuminate\Support\Collection
    */
    public function collection()
    {
        return ClassRoomUnit::all();
    }
}
