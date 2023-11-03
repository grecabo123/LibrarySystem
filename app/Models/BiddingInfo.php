<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class BiddingInfo extends Model
{
    use HasFactory;

    protected $table = "tbl_biddinginfo";

    protected $fillable = [
        "address",
        "bidding_brgy_fk",
        "bidding_item_fk",
    ];
}
