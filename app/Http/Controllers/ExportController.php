<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Maatwebsite\Excel\Facades\Excel;
use App\Exports\Export;

class ExportController extends Controller
{
    public function export()
    {
        return Excel::download(new Export, 'Tong_hop_giang_day.xlsx');
    }
}
