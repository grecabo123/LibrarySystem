<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class BiddingItem extends Model
{
    use HasFactory;

    protected $table = "tbl_biddingitem";

    protected $fillable = [
        "name",
        "price",
        "uniq_key",
        "product_type",
        "description",
    ];
}
