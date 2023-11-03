<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class MessageForm extends Model
{
    use HasFactory;

    protected $table = "tbl_message";

    protected $fillable = [
        "subject",
        "message",
        "user_message_fk",
    ];
}
