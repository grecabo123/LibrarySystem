<?php

namespace App\Http\Controllers\API;

use App\Models\Department;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Validator;
use App\Models\AcitivityLogs;


class DepartmentController extends Controller
{
    public function DepartmentData(){
        
        $data = Department::orderBy('department','DESC')->get();

        return response()->json([
            "status"        =>          200,
            "data"          =>          $data,
        ]);
    }

    public function AddDepartment(Request $request){
        $validator = Validator::make($request->all(), [
             "department"       =>      "required",
             "code"             =>      "required",
        ]);

        if($validator->fails()) {
            return response()->json([
                "error"         =>          $validator->messages(),
            ]);
        }
        else{
            $department = new Department;
            $department->department = $request->department;
            $department->department_code = $request->code;
            $department->save();

            $logs = new AcitivityLogs;
            $logs->activity = $request->department;
            $logs->user_logs_fk = $request->user_id;
            $logs->save();
            
            return response()->json([
                "status"            =>          200,
                "message"           =>          "Added Data",
            ]);
        }
    }
}
