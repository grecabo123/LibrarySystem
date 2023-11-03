<?php

namespace App\Http\Controllers\API;

use App\Models\User;
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

    public function ReportIssue(){

        $data = ReportMessage::select('*')->orderBy('created_at','ASC')->get();

        return response()->json([
            "status"        =>      200,
            "data"          =>      $data,
        ]);
    }

    public function UpdatePrice(Request $request) {

        $price = PriceUpdate::select('*')->orderBy('created_at','DESC')->get();

        return response()->json([
            "status"        =>      200,
            "results"       =>      $price,
        ]);

    }

    public function PostUpdatedPrice(Request $request) {

        $validate = Validator::make($request->all(), [
            "price"         =>      "required",
            "name"          =>      "required",
        ]);

        if($validate->fails()) {
            return response()->json([
                "error"         =>      $validate->messages(),
            ]);
        }
        else{
                    $newprice = new PriceUpdate;
                    $newprice->current_price = $request->price;
                    $newprice->name_tag = $request->name;
            
                    $newprice->save();
            
                    return response()->json([
                        "status"        =>          200,
                        "data"          =>          "New Price Updated",
                    ]);
        }
        
    }

    
    public function TotalCount() {
        $allcounts = User::all();
        $verified = User::where('status', 1)->get();
        $pending = User::where('status', 0)->get();
        $reports = ReportMessage::all();
        $copras = BiddingItem::where('product_type','Copras')->get();
        $whole = BiddingItem::where('product_type','Whole')->get();
        $copras_price = PriceUpdate::select('*')->whereIn('name_tag_int',[1])->orderBy('created_at','DESC')->first();
        $whole_price = PriceUpdate::select('*')->whereIn('name_tag_int',[2])->orderBy('created_at','DESC')->first();
        $copras_sold = BiddingItem::where([
            "product_type"          =>      "Copras",
            "price_status"          =>      1,
        ])->get();

        $whole_sold = BiddingItem::where([
            "product_type"          =>      "Whole",
            "price_status"          =>      1,
        ])->get();
        

        return response()->json([
            "status"                =>           200,
            "allaccounts"           =>           $allcounts->count(),
            "verified"              =>           $verified->count(),
            "pending"               =>           $pending->count(),
            "reports"               =>           $reports->count(),
            "copras_total"          =>           $copras->count(),
            "whole_total"           =>           $whole->count(),
            "copras_price"          =>           $copras_price,
            "whole_price"           =>           $whole_price,
            "copras_sold"           =>           $copras_sold->count(),
            "whole_sold"            =>           $whole_sold->count(),
        ]);
    } 

    
    
}
