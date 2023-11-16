<?php

namespace App\Http\Controllers\API;

use App\Models\DocumentInformation;
use App\Models\User;
use App\Models\Author;
use App\Models\Courses;
use App\Models\Document;
use App\Models\SchoolYear;
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


    public function SchoolYearData(){
        $data = SchoolYear::orderBy('created_at','desc')->get();

        return response()->json([
            "status"        =>      200,
            "data"        =>      $data,
        ]);
    }
    public function AddSchoolYear(Request $request){
        $schoolyear = new SchoolYear;
        $schoolyear->SchoolYear = $request->term_data;
        // $schoolyear->year_status = 1;
        $schoolyear->save();
 
        return response()->json([
             "status"        =>      200,
        ]);
    }

    public function ThesisData(){
        $thesis = Document::orderBy('created_at','DESC')->get();
        
        return response()->json([
            "status"        =>          200,
            "data"          =>          $thesis,
        ]);
    }

    public function UploadDocument(Request $request) {
        

        $validate = Validator::make($request->all(), [
            "title"               =>          "required",
            "description"         =>          "required",
            "year"                =>          "required",
            "department"          =>          "required",
            "program"             =>          "required",
            "email"               =>          "required",
            "keywords"            =>          "required",
            "month"               =>          "required",
            "file"                =>          "required|mimes:pdf",
        ]);

        if($validate->fails()){
            return response()->json([
                    "error"         =>          $validate->messages(),
            ]);
        }
        else{

            $year = SchoolYear::get()->last();

            $document = new Document;
            $document->title = $request->title;
            $document->uniquecode = md5($request->title);
            $document->description = $request->description;
            $document->year_published = $request->year;
            $document->keywords = $request->keywords;
            $document->save();

            $account_email = User::select('*')->whereIn('email',explode(',',$request->email))->pluck('id');
            $pk = $account_email;

            foreach($pk as $key){
                $data = array(
                    "document_fk"       =>      $document->id,
                    "author_user_fk"    =>      $key,
                );
                Author::insert($data);
            }

            $documentinfo = new DocumentInformation;
            $documentinfo->adviser =  $request->adviser;
            $documentinfo->department_fk = $request->department;
            $documentinfo->course_fk = $request->program;
            $documentinfo->docu_fk = $document->id;
            $documentinfo->year_fk = $year->id;
            if($request->hasFile('file')){
                $file = $request->file('file');
                $extension = $file->getClientOriginalExtension();
                $filename = $request->input('title').".".$extension;
                $file->move('Uploads/Files/',$filename);
                $documentinfo->file = "Uploads/Files/".$filename;
            }
            $documentinfo->save();

            $logs = new AcitivityLogs;
            $logs->activity = "Uploading"." ".$request->title;
            $logs->user_logs_fk = $request->admin_key;
            $logs->save();

            return response()->json([
                "status"            =>          200,
                "message"           =>          "Uploaded Successfully",
            ]);

        }
    }


    
    
}
