<?php

use Illuminate\Http\Request;

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

// Secured - return User (Laravel boilerplate)
// Route::middleware('auth:api')->get('/user', function (Request $request) {
//     return $request->user();
// });

// Secured - return User
$router->group(['middleware' => 'auth:api'], function ($router) {
    $router->get('/user', 'Users@user');
});

// Secured test
$router->group(['middleware' => 'auth:api'], function ($router) {
    $router->get('/test', function () {
        return response('secret', 200);
    });
});

// Unsecured - register user
$router->post('/register', 'Users@store');