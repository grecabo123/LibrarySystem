<?php

namespace App\Http\Controllers\API;

use App\Models\AcitivityLogs;
use App\Models\PriceUpdate;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Validator;

class PriceMonitor extends Controller
{
    public function index($id){
        
        $data = PriceUpdate::select('*')->where('name_tag_int',$id)->orderBy('created_at','DESC')->get();

        return response()->json([
            "status"        =>      200,
            "data"          =>      $data,
        ]);
    }
    public function register(Request $request){

        $validator = Validator::make($request->all(), [
            "new_price"         =>      "required",
        ]);

        if($validator->fails()){
            return response()->json([
                "error"         =>      $validator->messages(), 
            ]);
        }
        else{
            $data = new PriceUpdate;
            $data->current_price = $request->current;
            $data->new_price = $request->new_price;
            $data->name_tag_int = $request->name;
            $data->save();

            $logs = new AcitivityLogs;
            $logs->activity = "Copras Changed Price to". " ".$request->new_price;
            $logs->user_logs_fk = $request->id;
            $logs->save();

            return response()->json([
                "status"            =>      200,
                "message"           =>      "Price Updated"
            ]);
        }
    }
    public function remove($id){

        $data = PriceUpdate::find($id);
        if($data) {
            $data->delete();
            return response()->json([
                "status"            =>          200,
            ]);
        }
    }

    public function monitor(){
        $copras = PriceUpdate::select('*')->whereIn('name_tag_int',[1])->orderBy('created_at','DESC')->get()->first();
        $whole = PriceUpdate::select('*')->whereIn('name_tag_int',[2])->orderBy('created_at','DESC')->get()->first();
        
        return response()->json([
            "status"            =>          200,
            "copras"            =>          $copras,
            "whole"             =>          $whole,
        ]);
    }
}
