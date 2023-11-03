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
            "zipcode"       =>      "required",
            "password"      =>      "required",
            "city"          =>      "required",
            "mobile"        =>      "required",
            "username"      =>      "required",
            "home"          =>      "required",
            "file"          =>      "required|mimes:png,jpeg",
            "birthdate"     =>      "required",
        ]);

        if($validate->fails()){
            return response()->json([
                "error"         =>      $validate->messages(),
            ]);
        }
        else{
            $user = new User;

            $user->name = $request->fname." ".$request->mname." ".$request->lname;
            $user->username = $request->username;
            $user->email = $request->email;
            $user->role = 2;
            $user->status = 0;
            $user->birthdate = $request->birthdate;
            $user->user_brgy_fk = $request->city;
            $user->password = Hash::make($request->password);
            
            if($request->hasFile('file')){

                $file = $request->file('file');
                $extension = $file->getClientOriginalExtension();
                $filename = $request->lname.".".$extension;
                $file->move('Uploads/Files/',$filename);
                $user->files = "Uploads/Files/".$filename;
            }
            $user->save();

            $contact = new Contacts;

            $contact->contact_number = $request->mobile;
            $contact->home_address = $request->home;
            $contact->zipcode = $request->zipcode;
            $contact->contact_user_fk = $user->id;

            $contact->save();

            return response()->json([
                "status"            =>          200,
                "success"           =>          "Registered Account Successfully",
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
