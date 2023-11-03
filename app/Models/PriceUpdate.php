<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class PriceUpdate extends Model
{
    use HasFactory;

    protected $table = "tbl_price";

    protected $fillable = [
        "current_price",
        "new_price",
        "name_tag",
        "name_tag_int",
    ];
}
