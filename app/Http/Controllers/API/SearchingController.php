<?php

namespace App\Http\Controllers\API;

use App\Models\User;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;

class SearchingController extends Controller
{
    public function AllUsers(){
        $users = User::select('email')->get();

        return response()->json([
            "status"            =>          200,
            "data"              =>          $users,
        ]);
    }
}
