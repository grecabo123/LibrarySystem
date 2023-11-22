<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Announcement extends Model
{
    use HasFactory;

    protected $table = "tbl_announcement";

    protected $fillable = [
        "date_annoucment",
        "description",
    ];
}
