<?php

use App\Http\Controllers\Api\AuthController;
use App\Http\Controllers\Api\MovieController;
use App\Http\Controllers\Api\UsersController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});

// Public routes
Route::post('/auth/login', [AuthController::class, 'loginUser'])->name('login.post');
Route::post('/auth/register', [AuthController::class, 'createUser'])->name('register.post');
Route::get('/search', function (Request $request) {
    $response = Http::get(config('app.uri_movies')."/search/movie", [
        'api_key' => config('app.key_movies'),
        'query' => $request['query'],
        'page' => $request['page'],
    ]);
    return response()->json([
            'success'=> true,
            'data'=> json_decode($response->body()),
            'message'=>"Currency retrieved successfully"],
            200);
});
// Protected routes
Route::group(['middleware' => ['auth:sanctum']], function () {
    Route::post('/auth/logout', [AuthController::class, 'logoutUser'])->name('logout.post');
    Route::resource('/movies', MovieController::class);
    Route::resource('/users', UsersController::class);
});
