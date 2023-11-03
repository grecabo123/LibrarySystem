<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class BarangayData extends Model
{
    use HasFactory;

    protected $table = "tbl_barangay_coordinates";

    protected $fillable = [
        "barangay_list",
        "lati",
        "longi",
    ];
}
