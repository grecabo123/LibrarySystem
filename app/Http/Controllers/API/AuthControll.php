<?php

namespace App\Http\Controllers\API;

use App\Models\History;
use App\Models\User;
use App\Models\Contacts;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;
use App\Http\Controllers\API\MailController;

class AuthControll extends Controller
{    
    public function CreateAccount(Request $request){

        $validate = Validator::make($request->all(), [
            "fname"         =>      "required",
            "lname"         =>      "required",
            "email"         =>      "required|email|unique:users,email",
            "student_no"    =>      "required",
            "department"    =>      "required",
            "course"        =>      "required",
        ]);

        if($validate->fails()){
            return response()->json([
                "error"         =>      $validate->messages(),
            ]);
        }
        else{
            $hash = substr(md5(time()), 0, 8);
            $name = $request->fname." ". $request->mname." ".$request->lname;
            $mail = MailController::sendmail($name,$request->email,$hash);

            if($mail == 0){      
                $user = new User;
                $user->name = $request->fname." ".$request->mname." ".$request->lname;
                $user->first_name = $request->fname;
                $user->middle_name = $request->mname;
                $user->last_name = $request->lname;
                $user->email = $request->email;
                $user->student_no = $request->student_no;
                $user->course_fk = $request->course;
                $user->department_fk = $request->department;
                $user->role = $request->role == 2 ? 2 : 3; 
                $user->status = 1;
                $user->secret = $request->student_no."".$hash;
                $user->password = Hash::make($request->student_no."".$hash);
                $user->save();

                return response()->json([
                    "status"            =>          200,
                    "success"           =>          "Please Check your email for credintials". "".$request->email,
                ]);
            }
            else{
                return response()->json([
                    "status"            =>          504,
                    "error"             =>          "Server Error"
                ]);
            }


        }
    }

    public function Login(Request $request){

        $validate = Validator::make($request->all(), [
            "username"      =>      "required",
            "password"      =>      "required",
        ]);

        if($validate->fails()) {
            return response()->json([
                "error"     =>      $validate->messages(),
            ]);
        }
        else{
            $user = User::where('email',$request->username)->first();
            if($user || Hash::check($request->password, $user->password)){   
                if($user->status == 1){

                    $history = new History;

                    $history->email = $user->email;
                    $history->status = 1;

                    $history->save();

                    // Admin
                    if($user->role == 1){
                        $token = $user->createToken($user->email.'_Admin',['server:admin'])->plainTextToken;
                    }
                    else{
                        // user
                        $token = $user->createToken($user->email.'_User',['server:user'])->plainTextToken;
                    }
                    return response()->json([
                        "status"            =>      200,
                        "role"              =>      $user->role,
                        "id"                =>      $user->id,
                        "token"             =>      $token,
                        "message"           =>      "Logged In Successfuly",
                    ]);
                }
                else{
                    // check if the account is not verified
                    return response()->json([
                        "status"        =>          501,
                        "message"       =>          "Your Account is not verified",
                    ]);
                }
            }
            else{
                // Wrong input credintials
                return response()->json([
                    "status"        =>          504,
                    "message"       =>          "Wrong Credintials",
                ]);
                
            }
        }
    }

    public function Logout(Request $request){
        auth()->user()->tokens()->delete();

        $user = User::find($request->id);

        $history = new History;

        $history->email = $user->email;
        $history->status = 0;

        $history->save();

        return response()->json([
            "status"        =>      200,
            'message'       =>      "Logout Successfully",
        ]);
    }

    public function CreateNonStudent(Request $request){
        $validate = Validator::make($request->all(), [
            "fname"             =>          "required",
            "lname"             =>          "required",
            "email"             =>          "required|email|unique:users,email",
        ]);

        if($validate->fails()) {
            return response()->json([
                "error"             =>          $validate->messages(),
            ]);
        }
        else{
            $hash = substr(md5(time()), 0, 8);
            $name = $request->fname." ". $request->mname." ".$request->lname;
            $mail = MailController::sendmail($name,$request->email,$hash);

            if($mail == 0){      
                $user = new User;
                $user->name = $request->fname." ".$request->mname." ".$request->lname;
                $user->first_name = $request->fname;
                $user->middle_name = $request->mname;
                $user->last_name = $request->lname;
                $user->email = $request->email;
                $user->student_no = '';
                // $user->course_fk = $request->course;
                // $user->department_fk = $request->department;
                $user->role = $request->role == 2 ? 2 : 3; 
                $user->status = 1;
                $user->secret = $request->password;
                $user->password = Hash::make($request->student_no."".$hash);
                $user->save();

                return response()->json([
                    "status"            =>          200,
                    "success"           =>          "Please Check your email for credintials". "".$request->email,
                ]);
            }
        }
    }

    public function LoginWithGoogle(Request $request){
        
        $user = User::where('email',$request->email)->first();

        if($user) {
            if($user->status == 1){
                // Admin
                if($user->role == 1){
                    $token = $user->createToken($user->email.'_Admin',['server:admin'])->plainTextToken;
                }
                else{
                    // user
                    $token = $user->createToken($user->email.'_User',['server:user'])->plainTextToken;
                }
                return response()->json([
                    "status"            =>      200,
                    "role"              =>      $user->role,
                    "id"                =>      $user->id,
                    "token"             =>      $token,
                    "message"           =>      "Logged In Successfuly",
                ]);
            }
            else{
                // check if the account is not verified
                return response()->json([
                    "status"        =>          501,
                    "message"       =>          "Your Account is not verified",
                ]);
            }
        }
        else{

        }
    }
}
