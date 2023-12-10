<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Author extends Model
{
    use HasFactory;

    protected $table = "tbl_author";

    protected $fillable = [
        "document_fk",
        "author_user_fk",
    ];

    
    public function useraccount(){
        return $this->belongsTo(User::class, 'author_user_fk','id');
    }
}
