<?php

namespace App\Http\Controllers\API;

use App\Models\User;
use App\Models\Courses;
use App\Models\BiddingInfo;
use App\Models\BiddingItem;
use App\Models\MessageForm;
use App\Models\PriceUpdate;
use Illuminate\Http\Request;
use App\Models\AcitivityLogs;
use App\Models\ReportMessage;
use Illuminate\Support\Facades\DB;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Validator;

class AdminController extends Controller
{
    public function RegisteredAccount(){

        $data = User::selectRaw('id,name_user,username,email,status,role')
            ->where('status', 1)
                ->get();

        return response()->json([
            "status"        =>      200,
            "accounts"      =>      $data,
        ]);
    }

    public function NonRegistered(){

        $data = User::selectRaw('id,name_user,username,email,status,role')
            ->where('status', 0)
                ->get();

        return response()->json([
            "status"        =>      200,
            "accounts"      =>      $data,
        ]);
    }

    public function AccountInformation($id){

        $data = DB::table('users')
            ->join('tbl_contact','tbl_contact.contact_user_fk','=','users.id')
                ->join('tbl_barangay_coordinates','tbl_barangay_coordinates.id','=','users.user_brgy_fk')
                    ->selectRaw('users.name_user,users.email,users.birthdate,users.files,tbl_contact.contact_number,tbl_contact.home_address,tbl_contact.zipcode,tbl_barangay_coordinates.brgy_name')
                        ->where('users.id',$id)
                            ->first();

        if($data){
            return response()->json([
                "status"        =>      200,
                "account"       =>      $data,
            ]);
        }
        else{
            return response()->json([
                "status"        =>      504,
                "message"       =>      "Account Does Not Exist",
            ]);
        }
    }

    public function SendMessage(Request $request){

        $user = User::selectRaw('id,email')->where('email',$request->email)->first();
        
        if($user){
            $msg = new MessageForm;
            $msg->subject = $request->subject;
            $msg->message = $request->message;
            $msg->user_message_fk  = $user->id;
            $msg->save();

            User::where('id',$user->id)
                ->update([
                    "status"        =>      1,
                ]);

            $logs = new AcitivityLogs;

            $logs->activity = $request->email." "."Sent Message"."-".$request->subject;
            $logs->user_logs_fk = $request->user_id;
            $logs->save();

            return response()->json([
                "status"            =>      200,
                "message"           =>      $request->email." "."Email Sent",
            ]);
        }
        else{
            return response()->json([
                "error"             =>      "Something went wrong",
            ]);
        }
    }

    public function Logs($id){

        $logs = AcitivityLogs::where('user_logs_fk',$id)->get();

        return response()->json([
            "status"        =>      200,
            "data"          =>      $logs,
        ]);
    }

    public function AddCourse(Request $request){
        
       $course = new Courses;
       $course->CourseName = $request->course;
       $course->department_fk = $request->department_fk;
       $course->status_course = 1;
       $course->save();

       return response()->json([
            "status"        =>      200,
       ]);
    }

    public function CourseData($id){
        $course = Courses::where('department_fk',$id)->get();

        return response()->json([
            "status"        =>      200,
            "course"        =>      $course,
        ]);
    }


    
    
}
