<?php

namespace App\Http\Controllers\API;

use Illuminate\Http\Request;
use App\Models\AcitivityLogs;
use App\Http\Controllers\Controller;

class ActivityLogs extends Controller
{
    //
    public function Logs($id){

        $logs = AcitivityLogs::where('user_logs_fk',$id)->orderBy('created_at','DESC')->get();

        return response()->json([
            "status"        =>      200,
            "data"          =>      $logs,
        ]);
    }

}
