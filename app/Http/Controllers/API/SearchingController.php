<?php

namespace App\Http\Controllers\API;

use App\Models\User;
use App\Models\Visits;
use App\Models\Document;
use App\Models\VisitCounts;
use Illuminate\Http\Request;
use App\Models\AcitivityLogs;
use Illuminate\Support\Facades\DB;
use App\Http\Controllers\Controller;
use App\Http\Controllers\API\ActivityLogs;

class SearchingController extends Controller
{

    public function AllNonUsers(){
        $users = User::where('role',3)
                ->get();

            return response()->json([
                "status"            =>          200,
                "email"             =>          $users,
            ]);
    }

    public function AllUsers(){
        $users = User::join('tbl_department','tbl_department.id','users.department_fk')
            ->join('tbl_course','tbl_course.id','=','users.course_fk')
                ->selectRaw('users.name,users.email,users.student_no,tbl_course.CourseName,tbl_department.department')
                    ->where('role',2)
                    ->get();

        return response()->json([
            "status"            =>          200,
            "email"             =>          $users,
        ]);
    }

    public function AllRegistered () {
        $users = User::all();
       

        return response()->json([
            "status"            =>          200,
            "users"             =>          $users,
        ]);
    }
    public function SearchEngine(Request $request){
        
        $output = Document::where('is_active_docu','!=',2)
                ->where(function($query) use ($request){
                    $query->where('tbl_document.title','like',"%$request->search%")
                        ->orWhere('tbl_document.keywords','like',"%$request->search%");
            })->get();
        
        
        if($output->count() > 0){
            $logs = new AcitivityLogs;
            $logs->activity = "Search"." ".$request->search." "."Using SearchEngine";
            $logs->user_logs_fk = $request->user_id != "" ? $request->user_id : null;
            $logs->save();
            return response()->json([
                "status"            =>          200,
                "ResultsOutput"     =>          $output,
            ]);
        }
        else{
            return response()->json([
                "status"            =>          404,
                "error"             =>          $request->search." "."Does Not Exist",
            ]);
        }
    }

    public function SearchEngineResult($id){

        $output = Document::where('is_active_docu','!=',2)
            ->where(function($query) use ($id){
                $query->where('title','like',"%$id%")
                    ->orWhere('keywords','like',"%$id%");
        })->get();

        $yeardetails = DB::table('tbl_document')
        ->selectRaw('year_published, count(year_published) as total')
            ->whereIn('is_active_docu',[0,1])
                ->where(function ($query) use ($id){
                    $query->where('title','like',"%$id%")
                        ->orWhere('keywords','like',"%$id%");
                })->groupBy('Year_Published')->get();   

        if($output->count() > 0){
            return response()->json([
                "status"            =>          200,
                "ResultsOutput"     =>          $output,
                "Total"             =>          $yeardetails,
            ]);
        }
        else{
            return response()->json([
                "status"            =>          404,
                "error"             =>          "Result's Not Found",
            ]);
        }
        
    }
    public function DocumentFilter(Request $request){
        $dummy = DB::table('tbl_document')
                ->selectRaw('title,keywords,description,year_published,uniquecode')
                    ->whereIn('is_active_docu',[0,1])->whereIn('year_published',$request->year)
                        ->where(function ($query) use ($request){
                            $query->where('title','like',"%$request->keyword%")
                                ->orWhere('keywords','like',"%$request->keyword%");
        })
        ->get();  

        return response()->json([
            "status"            =>      200,
            "ResultsOutput"     =>      $dummy,
        ]);
    }

    public function IPAddressAccess(Request $request){
        $ipaddress = $request->ipaddress;
        $user_fk = $request->user_fk;
        $access = $request->access;
        
        $check = Visits::where([
            ['IP',$ipaddress],
            ['document_code',$access],
        ])->first();
        

        if($check){
            $checkip = Visits::where([
                ['IP',$ipaddress],
            ])->first();

            if($checkip){
                $count = VisitCounts::select('*')->where('document_access_code',$access)->first();
                return response()->json([
                    "status"            =>          200,
                    "count"             =>          $count->visit_count,
                ]);
            }
            else{
                $tblcount = VisitCounts::where([
                    ['document_access_code',$access],
                ])->first();
                if($tblcount){
                    // $count_update = DB::table('tbl_count')->where('document_access_code',$access)->update(['visit_count'=>$tblcount->visit_count + 1]);
                    $count = VisitCounts::select('*')->where('document_access_code',$access)->first();
                    return response()->json([
                        "status"            =>          200,
                        "count"             =>          $count->visit_count,
                    ]);
                }
            }
        }
        else{
            $visits = new Visits;
            $visits->document_code = $access;
            $visits->IP = $ipaddress;
            $visits->user_fk = $user_fk;
            $visits->save();  

            $tbladd = new VisitCounts;
            $tbladd->document_access_code = $access;
            $tbladd->visit_count = 1;
            $tbladd->save();
        }   
    }

    public function DocumentData(Request $request){

        $docs = Document::select('*')->where('uniquecode',$request->document_code)->first();
        $course = DB::table('tbl_documentinfo')
            ->join('tbl_department','tbl_department.id','=','tbl_documentinfo.department_fk')
                ->join('tbl_course','tbl_course.id','=','tbl_documentinfo.course_fk')
                    ->selectRaw('tbl_department.department,tbl_course.CourseName,tbl_documentinfo.file')
                        ->where('tbl_documentinfo.docu_fk',$docs->id)->first();
        $document = DB::table('tbl_document')
            ->join('tbl_documentinfo','tbl_documentinfo.docu_fk','=','tbl_document.id')
                ->selectRaw('tbl_document.id,tbl_document.title,tbl_document.keywords,
                tbl_document.description,tbl_document.uniquecode,
                tbl_documentinfo.file,tbl_document.created_at,
                tbl_document.year_published')
                    ->where('tbl_document.uniquecode',$request->document_code)->first();

        $author = DB::table('users')
            ->join('tbl_author','tbl_author.author_user_fk','=','users.id')
                ->selectRaw('users.first_name,users.middle_name,users.last_name')
                    ->where('tbl_author.document_fk',$docs->id)
                        ->get();

        $visitcount = Visits::where('user_fk',$request->user_fk)
            ->where(function($query) use ($request){
                $query->where('document_code',$request->document_code);
            })
        ->get();
        

            return response()->json([
                "status"            =>          200,
                "data"              =>          $document,
                "author"            =>          $author,
                "course"            =>          $course,
                "visits"            =>          $visitcount->count(),
            ]);
    }

    public function Visitors($id){
        $total  = DB::table('tbl_visit')->select(DB::raw('DATE (created_at) as date'),DB::raw('count(*) as views'))->where('document_code',$id)->groupBy('date')->get();
        if($total->count() > 0){
            return response()->json([
                "status"            =>      200,
                "data"              =>      $total,
            ]);
        }
        else{
            return response()->json([
                "status"            =>      504,
                "data"              =>      "No Data To Display",
            ]);
        }
    }
}
