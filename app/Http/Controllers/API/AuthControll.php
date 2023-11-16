<?php

namespace App\Http\Controllers\API;

use App\Models\User;
use App\Models\Contacts;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;

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
            $user->secret = $request->student_no;
            $user->password = Hash::make($request->student_no);
            $user->save();

            return response()->json([
                "status"            =>          200,
            ]);

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

    public function Logout(){
        auth()->user()->tokens()->delete();

        return response()->json([
            "status"        =>      200,
            'message'       =>      "Logout Successfully",
        ]);
    }
}
