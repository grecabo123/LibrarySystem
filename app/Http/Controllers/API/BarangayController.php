<?php

namespace App\Http\Controllers\API;

use App\Models\BarangayData;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;

class BarangayController extends Controller
{
    //

    public function ListBarangay(){

        $data = BarangayData::select('*')->orderBy('brgy_name','ASC')->get();

        return response()->json([
            "status"        =>      200,
            "brgy"          =>      $data,
        ]);
    }
}
