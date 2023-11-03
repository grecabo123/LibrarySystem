<?php

namespace App\Http\Controllers\API;

use App\Models\BiddingItem;
use App\Models\BiddingPost;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Validator;

class SearchItems extends Controller
{
    //

    public function SearchItem(Request $request){
    
        $data = DB::table('tbl_biddinginfo')
            ->join('tbl_biddingitem','tbl_biddingitem.id','=','tbl_biddinginfo.bidding_item_fk')
                ->join('tbl_barangay_coordinates','tbl_barangay_coordinates.id','=','tbl_biddinginfo.bidding_brgy_fk')
                    ->where('tbl_biddingitem.price_status','=',0)
                        ->where(function($query)  use ($request) {
                            $query->where('tbl_biddingitem.name', $request->itemname)
                                ->orWhere('tbl_barangay_coordinates.barangay_list', $request->itemname)
                                    ->orWhere('tbl_biddingitem.description', $request->itemname);
                        })->orderBy('tbl_biddinginfo.created_at','DESC')
                        ->get();

        if($data->count() == 0) {
            return response()->json([
                "status"        =>      404,
                "message"       =>      "No Data Found",
            ]);
        }   
        else{
            return response()->json([
                "status"        =>      200,
                "results"       =>      $data,
            ]);
        }


        // }

    }   

    public function SearchItemResults($id){
        $data = DB::table('tbl_biddinginfo')
            ->join('tbl_biddingitem','tbl_biddingitem.id','=','tbl_biddinginfo.bidding_item_fk')
                ->join('tbl_barangay_coordinates','tbl_barangay_coordinates.id','=','tbl_biddinginfo.bidding_brgy_fk')
                    ->where('tbl_biddingitem.price_status','=',0)
                        ->where(function($query)  use ($id) {
                            $query->where('tbl_biddingitem.name', $id)
                                ->orWhere('tbl_barangay_coordinates.barangay_list', $id)
                                    ->orWhere('tbl_biddingitem.description', $id);
                        })->orderBy('tbl_biddinginfo.created_at','DESC')
                        ->get();

        if($data->count() == 0) {
            return response()->json([
                "status"        =>      404,
                "message"       =>      "No Data Found",
            ]);
        }   
        else{
            return response()->json([
                "status"        =>      200,
                "results"       =>      $data,
            ]);
        }
    }

    public function AllItems(){

        $data = DB::table('tbl_biddingitem')
            ->join('tbl_bidding_image','tbl_bidding_image.item_fk','=','tbl_biddingitem.id')
                ->join('tbl_biddinginfo','tbl_biddinginfo.bidding_item_fk','=','tbl_biddingitem.id')
                    ->orderBy('tbl_biddingitem.created_at','ASC')
                        ->get();


        return response()->json([
            "status"            =>          200,
            "results"           =>          $data,
        ]);
    }

    public function Details($id){
        
        $results = DB::table('tbl_biddingitem')
            ->join('tbl_bidding_image','tbl_bidding_image.item_fk','=','tbl_biddingitem.id')
                ->join('tbl_biddinginfo','tbl_biddinginfo.bidding_item_fk','=','tbl_biddingitem.id')
                    ->join('tbl_barangay_coordinates','tbl_barangay_coordinates.id','=','tbl_biddinginfo.bidding_brgy_fk')
                        ->join('users','users.id','=','tbl_biddinginfo.user_info_fk')
                            ->join('tbl_contact','tbl_contact.contact_user_fk','=','users.id')
                        ->where('tbl_biddingitem.uniq_key', $id)
                            ->first();

        return response()->json([
            "status"            =>          200,
            "results"           =>          $results,
        ]);
    }

    public function GetCompetetor($id,$user_id){

        $num_bid = 0;

        $data= DB::table('tbl_biddingamount')
            ->join('users','users.id','=','tbl_biddingamount.bidding_item_user_fk')
                ->join('tbl_biddingitem','tbl_biddingitem.id','=','tbl_biddingamount.bidding_amt_fk')
                    ->where('tbl_biddingitem.uniq_key',$id)
                        ->get();

        $bidItem = BiddingItem::where('uniq_key',$id)->first();
        
        $search = BiddingPost::where([
            "bidding_item_user_fk"          =>      $user_id,
            "bidding_amt_fk"                =>      $bidItem->id,
        ])->first();

        if($search){
            $num_bid = $search->count();
        }

        $total = BiddingPost::select('*')->where('bidding_amt_fk',$bidItem->id)->get();
        
        return response()->json([
            "status"            =>      200,
            "users_"            =>      $data,
            "results"           =>      $num_bid,
            "total_bid"         =>      $total->count(),
        ]);
    }

    public function BiddingPost(Request $request){

        $validator = Validator::make($request->all(), [
            "amount_bid"            =>          "required",
            "message"               =>          "required",
        ]);

        if($validator->fails()) {
            return response()->json([
                "error"         =>          $validator->fails(),    
            ]);
        }
        else{

            $bidItem = BiddingItem::where('uniq_key',$request->uniq)->first();


            $search = BiddingPost::where([
                'bidding_item_user_fk'      =>      $request->id,
                'bidding_amt_fk'            =>      $bidItem->id,
            ])->first();

            if($search){
                return response()->json([
                    "status"            =>          501,
                    "message"           =>          "Already Bid This Item",
                ]);
            }
            else{
                $BidPost = new BiddingPost;
                $BidPost->bidding_amt_fk = $bidItem->id;
                $BidPost->item_desc = $request->message;
                $BidPost->amount_bidding = $request->amount_bid;
                $BidPost->bidding_item_user_fk = $request->id;
                $BidPost->save();
    
                return response()->json([
                    "status"        =>          200,
                    "response"      =>          "Bid Posted",
                ]);

            }
            

        }
    }
}
