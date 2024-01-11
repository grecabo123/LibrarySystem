<?php

namespace App\Http\Controllers\API;

use App\Models\Announcement;
use App\Models\Department;
use App\Models\DocumentInformation;
use App\Models\History;
use App\Models\User;
use App\Models\Author;
use App\Models\Courses;
use App\Models\Document;
use App\Models\SchoolYear;
use App\Models\BiddingInfo;
use App\Models\BiddingItem;
use App\Models\MessageForm;
use App\Models\PriceUpdate;
use App\Models\Visits;
use Illuminate\Http\Request;
use App\Models\AcitivityLogs;
use App\Models\ReportMessage;
use Illuminate\Support\Facades\DB;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Validator;

class AdminController extends Controller
{

    public function AddEmail (Request $request) {

        $validator = Validator::make($request->all(), [
            "email"             =>          "required|email|unique:users,email",
        ]);

        if($validator->fails()) {
            return response()->json([
                "error"         =>          $validator->messages(),
            ]);
        }
        else{

            $user = new User;
            
            $user->email = $request->email;
            $user->role = $request->role >=2 ? 2 : 1;
            $user->status = 1;

            $user->save();

            return response()->json([
                "status"            =>          200,
                "success"           =>          "Added Email",
            ]);


        }
    }

    public function AllData(){
        $allaccounts = User::all();
        $students = User::where('role',2)->get();
        $non_student = User::where('role',3)->get();
        $thesis = Document::all();

        return response()->json([
            "status"            =>          200,
            "allaccounts"       =>          $allaccounts->count(),
            "students"          =>          $students->count(),
            "non_students"      =>          $non_student->count(),
            "thesis"            =>          $thesis->count(),
        ]);
    }
    public function RegisteredAccount($id){

        $data = User::selectRaw('id,name,student_no,email,status,role')
            ->whereIn('status', [0,1])
                ->where('role',$id)
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

       $data = User::join('tbl_department','tbl_department.id','=','users.department_fk')
        ->join('tbl_course','tbl_course.id','=','users.course_fk')
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
        $thesis = DocumentInformation::join('tbl_department','tbl_department.id','=','tbl_documentinfo.department_fk')
            ->selectRaw('tbl_department.department, count(tbl_documentinfo.department_fk) as total, tbl_department.id,tbl_department.color_code,tbl_department.department_code')
                ->groupBy('tbl_documentinfo.department_fk')
                    ->orderBy('total','desc')
                        ->get();
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
    
    public function CourseThesis($id){
        $list = Department::join('tbl_course','tbl_course.department_fk','tbl_department.id')
            ->leftjoin('tbl_documentinfo','tbl_documentinfo.course_fk','=','tbl_course.id')
                ->selectRaw('tbl_course.CourseName, count(tbl_documentinfo.course_fk) as total, tbl_course.id')
                    ->where('tbl_documentinfo.department_fk',$id)
                        ->groupBy('tbl_documentinfo.course_fk')
                        ->get();
        return response()->json([
            "status"            =>      200,
            "data"              =>      $list,
        ]);
    }

    public function CourseThesisData($id){
        $data = Document::join('tbl_documentinfo','tbl_documentinfo.docu_fk','=','tbl_document.id')
            ->join('tbl_department','tbl_department.id','=','tbl_documentinfo.department_fk')
                ->join('tbl_course','tbl_course.id','=','tbl_documentinfo.course_fk')
                    ->selectRaw('tbl_document.title,tbl_document.id,tbl_document.uniquecode,tbl_document.description,tbl_document.year_published,tbl_document.keywords,
            tbl_documentinfo.file,tbl_department.department,tbl_course.CourseName,tbl_document.created_at')
                ->where('tbl_documentinfo.course_fk',$id)
                    ->get();

        $author = Author::join('users','users.id','=','tbl_author.author_user_fk') 
            ->join('tbl_documentinfo','tbl_documentinfo.docu_fk','=','tbl_author.document_fk')
                ->where('tbl_documentinfo.course_fk',$id)
                    ->selectRaw('users.name,users.email')
                        ->groupBy('tbl_author.author_user_fk')
                            ->get();
                // ->join('')

        return response()->json([
            "status"            =>      200,
            "data"              =>      $data,
            "author"            =>      $author,
        ]);     
    }
    
    public function posted(Request $request){

        $validate = Validator::make($request->all(), [
            "title"                 =>          "required",
            "description"           =>          "required",
        ]);

        if($validate->fails()) {
            return response()->json([
                "error"         =>      $validate->messages(),
            ]);
        }
        else{

            $post = new Announcement;
            $post->title = $request->title;
            $post->date_annoucment = $request->date_post;
            $post->description = $request->description;
            $post->save();

            $logs = new AcitivityLogs;

            $logs->activity = "Craete an Announcement";
            $logs->user_logs_fk = $request->user_fk;

            $logs->save();

            return response()->json([
                "status"            =>          200,
                "message"           =>          "Posted Announcement",
            ]);
        }
    }
    
    public function AnnoucmentData(){

        $data = Announcement::orderBy('created_at','DESC')->get();
        return response()->json([
            "status"        =>      200,
            "data"          =>      $data,
        ]);
    }

    public function MostVvisited(){
        $visits = DB::table('tbl_document')
            ->join('tbl_visit', 'tbl_visit.document_code', '=', 'tbl_document.uniquecode')
                ->selectRaw('count(tbl_visit.document_code) as total, tbl_document.title')
                    ->orderBy('total', 'DESC')
                        ->groupBy('tbl_document.uniquecode', 'tbl_document.title')
                            ->limit(5)
                                ->get();
            

        return response()->json([
            "status"            =>          200,
            "data"              =>          $visits,
        ]);
    }


    public function TransferCourse(Request $request){
        $course = Courses::find($request->id);

        if($course){
            $course->department_fk = $request->department_id;
            $course->update();

            return response()->json([
                "status"            =>          200,
                "data"              =>          "Transffered",
            ]);
        }
        else{
            return response()->json([
                "status"            =>          505,
                "error"             =>          "Data Not Found"
            ]);
        }
    }

    public function CourseDetails($id){
        $course = Courses::find($id);

        if($course){
            return response()->json([
                "status"            =>          200,
                "course"            =>          $course,
            ]);
        }
    }

    public function UpdateCourseName (Request $request){
        $course_update = Courses::find($request->id);
        if($course_update){

            $course_update->CourseName = $request->CourseName;
            $course_update->update();

            return response()->json([
                "status"            =>          200,
            ]);
        }
    }

    public function DepartmentFilterThesis(Request $request){


        if($request->id == "all") {
            $data = DocumentInformation::join('tbl_document','tbl_document.id','=','tbl_documentinfo.docu_fk')
            ->join('tbl_department','tbl_department.id','=','tbl_documentinfo.department_fk')
            ->leftjoin('tbl_visit','tbl_visit.document_code','tbl_document.uniquecode')
            ->join('tbl_course','tbl_course.id','=','tbl_documentinfo.course_fk')
            ->selectRaw('tbl_document.title, count(tbl_visit.document_code) as total_visits, tbl_department.department,tbl_course.CourseName')
            // ->where('tbl_documentinfo.department_fk', $request->id)
            ->whereBetween('tbl_documentinfo.created_at', [$request->from, $request->end])
            ->groupBy('tbl_document.title', 'tbl_document.uniquecode', 'tbl_department.department','tbl_course.id')
            ->get();

            $department = Department::all();    

            return response()->json([
                "status"            =>          200,
                "data"              =>          $data,
                "department"        =>          $department,
                "all"               =>          "All",
            ]);

        }
        else{

            $data = DocumentInformation::join('tbl_document','tbl_document.id','=','tbl_documentinfo.docu_fk')
            ->join('tbl_department','tbl_department.id','=','tbl_documentinfo.department_fk')
            ->leftjoin('tbl_visit','tbl_visit.document_code','tbl_document.uniquecode')
            ->join('tbl_course','tbl_course.id','=','tbl_documentinfo.course_fk')
            ->selectRaw('tbl_document.title, count(tbl_visit.document_code) as total_visits, tbl_department.department,tbl_course.CourseName')
            ->where('tbl_documentinfo.department_fk', $request->id)
            ->whereBetween('tbl_documentinfo.created_at', [$request->from, $request->end])
            ->groupBy('tbl_document.title', 'tbl_document.uniquecode', 'tbl_department.department','tbl_course.id')
            ->get();
            $department = Department::find($request->id);    
            return response()->json([
                "status"            =>          200,
                "data"              =>          $data,
                "department"        =>          $department,
                "all"               =>          "null"
            ]);
        }


    }

    public function AccountDeactivate($id, Request $request){
        
        $user_update = User::find($id);

        if($user_update) {
            $user_update->status = 0;
            $user_update->update();

            return response()->json([
                "status"                =>              200,
                "succss"               =>              "Change Status",
            ]);
        }
    }

    public function Accountactivate($id, Request $request){
        
        $user_update = User::find($id);

        if($user_update) {
            $user_update->status = 1;
            $user_update->update();

            return response()->json([
                "status"                =>              200,
                "succss"               =>              "Change Status",
            ]);
        }
    }

    public function UploadNonAccount (Request $request) {


        $validate = Validator::make($request->all(), [
            "title"               =>          "required",
            "description"         =>          "required",
            "year"                =>          "required",
            "department"          =>          "required",
            "program"             =>          "required",
            "names"               =>          "required",
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
            $account_email = User::select('*')->whereIn('name',explode(',',$request->namee))->pluck('id');
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
                "data"              =>          $request->user_name,
            ]);
        }
    }

    public function AddName(Request $request){

        $validator = Validator::make($request->all(), [
            "first_name"            =>          "required",
            "last_name"            =>          "required",
        ]);

        if($validator->fails()) {
            return response()->json([
                "error"         =>          $validator->messages(),
            ]);
        }
        else{
            $user = new User;
            
            $user->name = $request->first_name." ".$request->middle_name." ".$request->last_name;
            $user->first_name = $request->first_name;
            $user->middle_name = $request->middle_name;
            $user->last_name = $request->last_name;
            $user->role = 3;
            $user->save();
    
            return response()->json([
                "status"            =>          200,
                "data"              =>          "Added",
            ]);

        }
    }

    public function AccountHistory (){
        $data = History::orderBy('created_at','DESC')->get();

        return response()->json([
            "status"            =>          200,
            "data"              =>          $data,
        ]);
    }

    public function import(Request $request){
        $department = Department::select('*')->where('department',$request->department)->first();
        $course = Courses::select('*')->where('CourseName',$request->course)->first();

        $user = new User;
        $name = $request->first." ".$request->middle." ".$request->last;
        $user->name = $name;
        $user->first_name = $request->first;
        $user->middle_name = $request->middle;
        $user->last_name = $request->last;
        $user->student_no = $request->IDNumber;
        $user->email = $request->email;
        $user->role = 1;
        $user->department_fk = $department->id;
        $user->course_fk = $course->id;
        $user->status = 1;
        $user->save();

        return response()->json([
            "status"                =>          200,
            "Info"                  =>          $request->email." "."Imported Data",
        ]);
    }

    public function importstudent(Request $request){
        $department = Department::select('*')->where('department',$request->department)->first();
        $course = Courses::select('*')->where('CourseName',$request->course)->first();

        $user = new User;
        $name = $request->first." ".$request->middle." ".$request->last;
        $user->name = $name;
        $user->first_name = $request->first;
        $user->middle_name = $request->middle;
        $user->last_name = $request->last;
        $user->student_no = $request->IDNumber;
        $user->email = $request->email;
        $user->role = 2;
        $user->department_fk = $department->id;
        $user->course_fk = $course->id;
        $user->status = $request->accounttype;
        $user->save();

        return response()->json([
            "status"                =>          200,
            "Info"                  =>          $request->email." "."Imported Data",
        ]);
    }

    
}
