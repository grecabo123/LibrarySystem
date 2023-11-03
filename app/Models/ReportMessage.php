<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ReportMessage extends Model
{
    use HasFactory;

    protected $table = "tbl_reports";

    protected $fillable = [
        "messagecode",
        "report_msg",
        "user_report_fk",
    ];
}
