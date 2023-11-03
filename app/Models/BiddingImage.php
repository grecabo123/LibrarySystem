<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class BiddingImage extends Model
{
    use HasFactory;

    
    protected $table = "tbl_bidding_image";

    protected $fillable = [
        "image",
        "item_fk",
        // "bidding_item_fk",
    ];
}
