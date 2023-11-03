<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class AcitivityLogs extends Model
{
    use HasFactory;

    protected $table = "tbl_logs";

    protected $fillable = [
        "activity",
        "user_logs_fk ",
    ];
}
