<?php

namespace App\Http\Controllers\API;

use App\Mail\Emails;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Mail;

class MailController extends Controller
{
    public static function sendmail($name,$email,$hash){

        $data = [
            'name'      =>      $name,
            'email'     =>      $email,
            "password"  =>      $hash, 
        ];

        Mail::to($email)->send(new Emails($data));
    }
}
