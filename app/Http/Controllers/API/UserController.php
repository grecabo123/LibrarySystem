<?php

namespace App\Http\Controllers\API;

use App\Models\BiddingInfo;
use App\Models\BiddingItem;
use App\Models\BiddingImage;
use Illuminate\Http\Request;
use App\Models\AcitivityLogs;
use Illuminate\Support\Facades\DB;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Validator;
use Carbon\Carbon;

class UserController extends Controller
{
    //

    public function AddProducts(Request $request){

        // dd($request->all());

        $validate = Validator::make($request->all(), [
            "productname"           =>          "required",
            "productdetails"        =>          "required",
            // "auctiondate"           =>          "required",
            "producttype"           =>          "required",
            "barangay"              =>          "required",
            "price"                 =>          "required",
            "address"               =>          "required",
            "files"                 =>          "required|mimes:jpg,jpeg,png",
            "startbit"              =>          "required",
            "endbit"                =>          "required",
        ]);


        if($validate->fails()) {
            // if($request->hasFile('files_upload')){
               
            //     foreach($request->files_upload as $files) {
            //         // $count = 0;
            //         $file = $files->file('file');
            //         $extension = $file->getClientOriginalExtension();
            //         $filename = $request->productname.".".$extension;
            //         $file->move('Uploads/Files/',$filename);
            //         $information->file = "Uploads/Files/".$filename;
            //         // $array = array( 
                        
            //         // );


    
            //         // BiddingImage::insert($array);
    
            //     }
            // }
            return response()->json([
                "error"             =>          $validate->messages(),
              
            ]);
        }
        else{

            $biddingitem = new BiddingItem;
            $biddingitem->name = $request->productname;
            $biddingitem->uniq_key = md5(time().$request->productname);
            $biddingitem->product_type = $request->producttype;
            $biddingitem->description = $request->productdetails;
            $biddingitem->price = $request->price;
            $biddingitem->start_date_now = $request->startbit;
            $biddingitem->end_date_now = $request->endbit;
            $biddingitem->milliseconds_data = $request->time_end;
            $biddingitem->save();
    
            $biddinginfo = new BiddingInfo;
            $biddinginfo->address = $request->address;
            $biddinginfo->bidding_brgy_fk = $request->barangay;
            $biddinginfo->bidding_item_fk = $biddingitem->id;
            $biddinginfo->user_info_fk = $request->user_logs;
            $biddinginfo->save();

            $biddingimg = new BiddingImage;

            $biddingimg->item_fk = $biddingitem->id;

            if($request->hasFile('files')){
                $file = $request->file('files');
                $extension = $file->getClientOriginalExtension();
                $filename = md5(time()).".".$extension;
                $file->move('Uploads/Files/',$filename);
                $biddingimg->image =  "Uploads/Files/".$filename;                
            }

            $biddingimg->save();

            $logs = new AcitivityLogs;
            $logs->activity = "Creating Bidding Item"." ".$request->productname;
            $logs->user_logs_fk = $request->user_logs;
            $logs->save();
    
            return response()->json([
                "status"        =>          200,
                "success"       =>          "Product Has Been Posted",
            ]);

        }
    }

    public function ProductDetails(){
        $data = DB::table('tbl_biddingitem')
            ->join('tbl_biddinginfo','tbl_biddinginfo.bidding_item_fk','=','tbl_biddingitem.id')
                ->orderBy('tbl_biddingitem.created_at','DESC')
                    ->get();

        return response()->json([
            "status"            =>          200,
            "product"           =>          $data,
        ]);
    }

    public function ProductDetailsInformation($id){
        $data = DB::table('tbl_biddingitem')
            ->join('tbl_biddinginfo','tbl_biddinginfo.bidding_item_fk','=','tbl_biddingitem.id')
                ->join('tbl_bidding_image','tbl_bidding_image.item_fk','=','tbl_biddingitem.id')
                    ->where('tbl_biddingitem.uniq_key', $id)
                        ->first();

        return response()->json([
            "status"            =>          200,
            "product"           =>          $data,
        ]);
    }

    public function RemoveProducts($id){
        $removeproducts = BiddingItem::select('id')->whereIn('id',explode(",",$id));
        if($removeproducts){
            $removeproducts->delete();
            return response()->json([
                "status"           =>          200,
                "remove"           =>          "Deleted Permanently",
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

    public function ProductInformation($id){
    $data = DB::table('tbl_biddingitem')
            ->join('tbl_biddinginfo','tbl_biddinginfo.bidding_item_fk','=','tbl_biddingitem.id')
                ->where('tbl_biddingitem.id',$id)
                    ->first();

        return response()->json([
            "status"            =>          200,
            "product"           =>          $data,
        ]);

    }

    public function UpdateProductData (Request $request, $id){

        $item = BiddingItem::find($id);

        if($item){

        }
        else{
            
            return response()->json([
                "status"        =>         200,

            ]);
        }
    }
}
