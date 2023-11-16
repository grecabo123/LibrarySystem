<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class DocumentInformation extends Model
{
    use HasFactory;

    protected $table = "tbl_documentinfo";

    protected $fillable = [
        "adviser",
        "department_fk",
        "course_fk",
        "file",
        "docu_fk",
        "year_fk",
    ];
}
