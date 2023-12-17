<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\API\SearchItems;
use App\Http\Controllers\API\ActivityLogs;
use App\Http\Controllers\API\AuthControll;
use App\Http\Controllers\API\PriceMonitor;
use App\Http\Controllers\API\UserController;
use App\Http\Controllers\API\AdminController;
use App\Http\Controllers\API\BarangayController;
use App\Http\Controllers\API\SearchingController;
use App\Http\Controllers\API\DepartmentController;

Route::post('Login',[AuthControll::class, 'Login']);
Route::post('LoginWithGoogle',[AuthControll::class, 'LoginWithGoogle']);

// Student Account
Route::post('CreateAccount', [AuthControll::class, 'CreateAccount']);

// Non Student
Route::post('CreateNonStudent', [AuthControll::class, 'CreateNonStudent']);



Route::get('BarangayData', [BarangayController::class, 'ListBarangay']);


Route::post('SearchEngine',[SearchingController::class, 'SearchEngine']);
Route::post('SearchEngineResult/{id}',[SearchingController::class, 'SearchEngineResult']);
Route::post('DocumentFilter',[SearchingController::class, 'DocumentFilter']);


Route::get('AnnoucmentData',[AdminController::class, 'AnnoucmentData']);

// Searching Controller
Route::get('AllUsers',[SearchingController::class, 'AllUsers']);
Route::get('AllNonUsers',[SearchingController::class, 'AllNonUsers']);
Route::get('AllRegistered',[SearchingController::class, 'AllRegistered']);
Route::get('Logs/{id}', [ActivityLogs::class, 'Logs']);


// IP Address
Route::post('IpAddressAccess',[SearchingController::class, 'IpAddressAccess']);

Route::post('DocumentData',[SearchingController::class, 'DocumentData']);
Route::get('Visitors/{id}',[SearchingController::class, 'Visitors']);


// Department
Route::get('DepartmentDataFetch',[DepartmentController::class, 'DepartmentData']);
Route::get('CourseDataFetch',[DepartmentController::class, 'CourseDataFetch']);
Route::post('AddDepartment',[DepartmentController::class, 'AddDepartment']);

Route::get('ThesisData', [AdminController::class, 'ThesisData']);
Route::get('CourseThesis/{id}',[AdminController::class,'CourseThesis']);
Route::get('CourseThesisData/{id}',[AdminController::class,'CourseThesisData']);

Route::post('AddArchives', [UserController::class, 'AddArchives']);
// Admin router
Route::middleware(['auth:sanctum', 'isAPIAdmin'])->group(function () {
    Route::get('/checking',function () {
        return response()->json([
            "status"        =>      200,
            "role"          =>      auth()->user()->role,
        ],200);
    });
    Route::post('AddEmail',[AdminController::class, 'AddEmail']);
    Route::get('registered/{id}',[AdminController::class, 'RegisteredAccount']);
    Route::get('nonregistered', [AdminController::class, 'NonRegistered']);
    Route::get('AccountInformation/{id}', [AdminController::class, 'AccountInformation']);
    Route::get('CourseData/{id}', [AdminController::class, 'CourseData']);
    Route::post('AddCourse', [AdminController::class, 'AddCourse']);
    Route::post('AddSchoolYear', [AdminController::class, 'AddSchoolYear']);
    Route::get('SchoolYearData', [AdminController::class, 'SchoolYearData']);
    Route::post('UploadDocument',[AdminController::class,'UploadDocument']);
    Route::post('UploadNonAccount',[AdminController::class,'UploadNonAccount']);
    Route::post('AddName',[AdminController::class,'AddName']);
    Route::get('AllData',[AdminController::class,'AllData']);
    Route::post('posted',[AdminController::class,'posted']);
    Route::get('MostVvisited',[AdminController::class, 'MostVvisited']);
    Route::put('TransferCourse',[AdminController::class, 'TransferCourse']);
    Route::put('UpdateCourseName',[AdminController::class, 'UpdateCourseName']);
    Route::get('CourseDetails/{id}',[AdminController::class, 'CourseDetails']);
    Route::get('DepartmentFilterThesis/{id}',[AdminController::class, 'DepartmentFilterThesis']);
    Route::put('AccountDeactivate/{id}',[AdminController::class, 'AccountDeactivate']);
    Route::put('Accountactivate/{id}',[AdminController::class, 'Accountactivate']);
    
});


// User Route
Route::middleware(['auth:sanctum', 'isAPIUser'])->group(function () {
    Route::get('/check',function () {
        return response()->json([
            "status"        =>      200,
            "role"          =>      auth()->user()->role,
        ],200);
    });
    Route::post('AddProducts', [UserController::class,  'AddProducts']);
    Route::get('ProductDetails', [UserController::class,  'ProductDetails']);
    Route::delete('RemoveProducts/{id}', [UserController::class,  'RemoveProducts']);
    Route::get('ProductInformation/{id}', [UserController::class, 'ProductInformation']);
    Route::put('UpdateProductData/{$id}',[UserController::class, 'UpdateProductData']);
    Route::get('ProductDetailsInformation/{id}', [UserController::class,  'ProductDetailsInformation']);
});


Route::middleware(['auth:sanctum'])->group(function () {
    Route::post('logout',[AuthControll::class, 'Logout']);
});

Route::middleware('auth:api')->get('/user', function (Request $request) {
    return $request->user();
});
