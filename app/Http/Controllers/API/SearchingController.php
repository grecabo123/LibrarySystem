<?php

namespace App\Http\Controllers\API;

use App\Models\User;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;

class SearchingController extends Controller
{
    public function AllUsers(){
        $users = User::join('tbl_department','tbl_department.id','users.department_fk')
            ->join('tbl_course','tbl_course.id','=','users.course_fk')
                ->selectRaw('users.name,users.email,users.student_no,tbl_course.CourseName,tbl_department.department')
                    ->where('role',2)
                    ->get();

        return response()->json([
            "status"            =>          200,
            "email"              =>          $users,
        ]);
    }
}
