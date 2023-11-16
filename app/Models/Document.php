<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Document extends Model
{
    use HasFactory;

    protected $table = "tbl_document";

    protected $fillable = [
        "title",
        "uniquecode",
        "description",
        "year_published",
        "keywords",
    ];
}
