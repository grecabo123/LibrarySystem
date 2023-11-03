<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class BiddingPost extends Model
{
    use HasFactory;

    protected $table = "tbl_biddingamount";

    protected $fillable = [
        "bidding_amt_fk",
        "item_desc",
        "amount_bidding",
        "bidding_item_user_fk",
    ];
}
