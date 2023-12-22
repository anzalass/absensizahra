<?php

use App\Http\Controllers\AktivitasController;
use App\Http\Controllers\IzinController;
use App\Http\Controllers\MapelSiswaController;
use App\Http\Controllers\MataPelajaranController;
use App\Http\Controllers\UserController;
use App\Http\Controllers\VerificationController;
use Illuminate\Http\Request;
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

// Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
//     return $request->user();
// });

// Route::prefix('api')->middleware('api')->group(function () {
//     Route::post('tambahPemeliharaan',[PemeliharaanController::class, 'tambahPemeliharaan']);
// });

//Authentication
Route::get('email/verify/{id}',[VerificationController::class, 'verify'])->name('verification.verify');
Route::get('forgotPassword/verify/{id}/{token}', [VerificationController::class, 'forgotPassword'])->name('verification.forgotPassword');
Route::middleware('auth:sanctum')->group(function(){
    Route::get('user',[UserController::class, 'user']);
    Route::post('logout',[UserController::class,'logout']);
});

Route::middleware('auth')->group(function () {
    Route::get('GetUser',[UserController::class,'getUser']);
});

//Table User
Route::get('getUser',[UserController::class, 'getUser']);
Route::get('getUserById/{id}',[UserController::class,'getUserById']);
Route::put('updateDataUser/{id}',[UserController::class, 'updateDataUser']);
Route::post('Register',[UserController::class,'regis']);
Route::post('login',[UserController::class, 'login']);
Route::post('forgotPassword',[UserController::class, 'register']);
Route::delete('deleteUser/{id}', [UserController::class, 'deleteUser']);

//Get User
Route::get('getGuruPengajar', [UserController::class, 'getGuruPengajar']);
Route::get('getGuruPiket',[UserController::class, 'getGuruPiket']);
Route::get('getKurikulum',[UserController::class, 'getKurikulum']);
Route::put('ChangePassword/{idUser}',[UserController::class,'changePassword']);

//Table Izin
Route::get('getIzin/{id}',[IzinController::class, 'index']);
Route::get('getIzinByKurikulumId/{id}',[IzinController::class,'getIzinByKurikulumId']);
Route::get('getIzinGuruById/{id}',[IzinController::class,'getIzinGuruById']);
Route::get('getIzinKurikulum',[IzinController::class,'AllPermissionKurikulum']);
Route::get('getIzinPengajar/{id}',[IzinController::class, 'AllPermissionGuruPengajar']);
Route::get('getIzinPiket/{id}',[IzinController::class, 'AllPermissionGuruPiket']);
Route::get('getIzinById/{id}',[IzinController::class, 'getIzinById']);

Route::post('requestIzin',[IzinController::class, 'tambahIzin']);
Route::post('requestIzinGuru',[IzinController::class, 'tambahIzinGuru']);

Route::put('BeriIzin/{id}/{role}',[IzinController::class, 'BeriIzin']);
Route::put('TolakPengajuan/{id}/{role}',[IzinController::class, 'Tolak']);

Route::put('Batalkan/{id}/{role}',[IzinController::class, 'Batalkan']);

Route::put('EditIzin/{id}',[IzinController::class,'EditIzin']);
Route::put('EditIzinGuru/{id}',[IzinController::class,'EditIzinGuru']);

//Table Mata Pelajaran
Route::get('getMataPelajaran', [MataPelajaranController::class, 'index']);
Route::post('AddMataPelajaran',[MataPelajaranController::class, 'AddMataPelajaran']);
Route::put('UpdateMataPelajaran',[MataPelajaranController::class, 'EditMataPelajaran']);

//Table Mapel Siswa
Route::get('getMapelSiswa',[MapelSiswaController::class,'index']);
Route::post('AddMapelSiswa',[MapelSiswaController::class, 'TambahMapelSiswa']);
Route::put('UpdateMapelSiswa',[MapelSiswaController::class, 'EditMapelSiswa']);

//Table Aktivitas
Route::get('getAllAktivitas',[AktivitasController::class, 'index']);
Route::get('getAktivitasByUser/{idUser}',[AktivitasController::class, 'getByUser']);
Route::post('AddAktivitas',[AktivitasController::class,'AddAktivitas']);