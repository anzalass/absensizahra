<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Izin;
use App\Http\Requests\IzinRequest;
use Illuminate\Support\Facades\Validator;

class IzinController extends Controller
{
    public function index($id){
        $result = Izin::where("idUser",$id)->get();
        if($result){
            return response()->json([
                'results'=> $result
            ],200);
        }else{
            return response()->json([
                'message' => "Izin tidak ditemukan"
            ],404);
        }   
    }

    public function DashboardSiswa($id){
        $izinMasuk = Izin::where("typeIzin","Masuk")->where("id", $id)->get();
        $izinKeluar = Izin::where("typeIzin","Keluar")->where("id", $id)->get();
        $izinPulang = Izin::where("typeIzin","Pulang")->where("id", $id)->get();
        $izinDiizinkan = Izin::where("typeIzin","Diizinkan")->where("id", $id)->get();
        $izinDitolak = Izin::where("typeIzin","Ditolak")->where("id", $id)->get();

        return response()->json([
            "masuk"=>count($izinMasuk),
            "keluar"=>count($izinKeluar),
            "pulang"=>count($izinPulang),
            "diizinkan"=>count($izinDiizinkan),
            "ditolak"=>count($izinDitolak)
        ],200);
    }

    public function DashboardGuru($idSiswa, $idGuru){
        $izinMasuk = Izin::where("typeIzin","Masuk")->where("id", $idSiswa)->get();
        $izinKeluar = Izin::where("typeIzin","Keluar")->where("id", $idSiswa)->get();
        $izinPulang = Izin::where("typeIzin","Pulang")->where("id", $idSiswa)->get();
        $izinDiizinkan = Izin::where("typeIzin","Diizinkan")->where("id", $idSiswa)->get();
        $izinDitolak = Izin::where("typeIzin","Ditolak")->where("id", $idSiswa)->get();
        $izinGuru = Izin::where("id", $idGuru)->get();

        return response()->json([
            "masuk"=>count($izinMasuk),
            "keluar"=>count($izinKeluar),
            "pulang"=>count($izinPulang),
            "diizinkan"=>count($izinDiizinkan),
            "ditolak"=>count($izinDitolak),
            "izinGuru"=>count($izinGuru)
        ],200);
    }

    public function DashboardKurikulum($id){
        $izinMasuk = Izin::where("typeIzin","Masuk")->where("kurikulum", $id)->get();
        $izinKeluar = Izin::where("typeIzin","Keluar")->where("kurikulum", $id)->get();
        $izinPulang = Izin::where("typeIzin","Pulang")->where("kurikulum", $id)->get();
        $izinDiizinkan = Izin::where("typeIzin","Diizinkan")->where("kurikulum", $id)->get();
        $izinDitolak = Izin::where("typeIzin","Ditolak")->where("kurikulum", $id)->get();

        return response()->json([
            "masuk"=>count($izinMasuk),
            "keluar"=>count($izinKeluar),
            "pulang"=>count($izinPulang),
            "diizinkan"=>count($izinDiizinkan),
            "ditolak"=>count($izinDitolak)
        ],200);
    }

    public function getIzinByKurikulumId($id){
        $result = Izin::where('kurikulum', $id)->get();
        if($result){
            return response()->json([
                'results'=> $result
            ],200);
        }else{
            return response()->json([
                'message' => "Izin tidak ditemukan"
            ],404);
        } 
    }

    public function getIzinGuruById($id){
        $result = Izin::where("idUser",$id)->get();
        if($result){
            return response()->json([
                'results'=> $result
            ],200);
        }else{
            return response()->json([
                'message' => "Izin tidak ditemukan"
            ],404);
        } 
    }

    public function getIzinById($id){
        // $resultsIzin = Izin::find($id);
        $resultsIzin = Izin::where('id', $id)->get();
        if($resultsIzin){
            return response()->json([
                'results'=> $resultsIzin
            ],200);
        }else{
            return response()->json([
                'message' => "Izin tidak ditemukan"
            ],404);
        } 
    }

    public function Batalkan($id, $role){
        $getRecord = Izin::find($id);

        if(!$getRecord){
            return response()->json([
                'message' => "Data Tidak Ditemukan"
            ],404);
        }

        $getRecord->statusPengajuan = "Batalkan";
        if($role == 1){
            $getRecord->responGuruPengajar = "Dibatalkan";
        }else if($role == 2){
            $getRecord->responKurikulum = "Dibatalkan";
        }

        $getRecord->save();
        return response()->json([
            'message'=> "Data berhasil diupdate"
        ],200);
    }

    
    public function AllPermissionGuruPengajar($id){
        $results = Izin::where('guruPengajar', $id)->get();
        if($results){
            return response()->json([
                'results'=> $results
            ],200);
        }else{
            return response()->json([
                'message' => "Izin tidak ditemukan"
            ],404);
        } 
    }

    public function AllPermissionGuruPiket($id){
        $results = Izin::where('guruPiket', $id)->get();
        if($results){
            return response()->json([
                'results'=> $results
            ],200);
        }else{
            return response()->json([
                'message' => "Izin tidak ditemukan"
            ],404);
        } 
    }

    public function EditIzin(IzinRequest $request, $id){
        $getIzinGuru = Izin::find($id);
        if($getIzinGuru){
            try{
            if($request->typeIzin == 'Masuk'){
                $validator = Validator::make($request->all(),[
                    'idUser' => 'required',
                    'idMapel' => 'required',
                    'kelas' => 'required|string',
                    'guruPengajar' => 'required',
                    'keterangan'=> 'required',
                    'jamMasuk' => 'required',
                    'typeIzin'=> 'required',
                ]);
            }else if($request->typeIzin == 'Keluar'){
                $validator = Validator::make($request->all(),[
                    'idUser' => 'required',
                    'idMapel' => 'required',
                    'kelas' => 'required|string',
                    'guruPengajar' => 'required',
                    'jamKeluar'=> 'required',
                    'jamMasuk'=> 'required',
                    'keterangan'=> 'required',
                    'typeIzin'=> 'required',
                ]);
            }else if($request->typeIzin == 'Pulang'){
                $validator = Validator::make($request->all(),[
                    'idUser' => 'required',
                    'idMapel' => 'required',
                    'kelas' => 'required|string',
                    'guruPengajar' => 'required',
                    'jamKeluar'=> 'required',
                    'keterangan'=> 'required',
                    'typeIzin'=> 'required',
                ]);
            }

            if($validator->fails()){
                return response()->json([
                    'error'=> $validator->errors()
                ],422);
            }

            if($request->foto != null){
            $getIzinGuru->foto = $request->foto;
            }

            if($request->typeIzin == "Masuk"){
                $getIzinGuru->foto = $request->foto;
                $getIzinGuru->jamKeluar = null;
                $getIzinGuru->jamMasuk = $request->jamMasuk;
            }else if($request->typeIzin == "Keluar"){
                $getIzinGuru->foto = null;
                $getIzinGuru->jamKeluar = $request->jamKeluar;
                $getIzinGuru->jamMasuk = $request->jamMasuk;
            }else{
                $getIzinGuru->foto = null;
                $getIzinGuru->jamKeluar = $request->jamKeluar;
                $getIzinGuru->jamMasuk = null;
            }

            $getIzinGuru->idMapel = $request->idMapel;
            $getIzinGuru->guruPengajar = $request->guruPengajar;
            $getIzinGuru->keterangan = $request->keterangan;
            $getIzinGuru->typeIzin = $request->typeIzin;

            $getIzinGuru->save();
            return response()->json([
                'message'=> "Data berhasil diupdate"
            ],200);

            }catch(\Exception $e){
                return response()->json([
                    'message'=>$e
                ],505);
            }

        }
        return response()->json([
            'message' => "Izin Tidak Ditemukan"
        ],404);
    }

    public function tambahIzin(IzinRequest $request){
        try{
            if($request->typeIzin == 'Masuk'){
                $validator = Validator::make($request->all(),[
                    'idUser' => 'required',
                    'idMapel' => 'required',
                    'kelas' => 'required|string',
                    'guruPengajar' => 'required|string',
                    'kurikulum' => 'required|string',
                    'keterangan'=> 'required',
                    'jamMasuk' => 'required',
                    'typeIzin'=> 'required',
                ]);
            }else if($request->typeIzin == 'Keluar'){
                $validator = Validator::make($request->all(),[
                    'idUser' => 'required',
                    'idMapel' => 'required',
                    'kelas' => 'required|string',
                    'guruPengajar' => 'required|string',
                    'kurikulum' => 'required|string',
                    'jamKeluar'=> 'required',
                    'jamMasuk'=> 'required',
                    'keterangan'=> 'required',
                    'typeIzin'=> 'required',
                ]);
            }else if($request->typeIzin == 'Pulang'){
                $validator = Validator::make($request->all(),[
                    'idUser' => 'required',
                    'idMapel' => 'required',
                    'kelas' => 'required|string',
                    'guruPengajar' => 'required|string',
                    'kurikulum' => 'required|string',
                    'jamKeluar'=> 'required',
                    'keterangan'=> 'required',
                    'typeIzin'=> 'required',
                ]);
            }

            if($validator->fails()){
                return response()->json([
                    'error'=> $validator->errors()
                ],422);
            }

            if($request->foto != null){
                $add = Izin::create([
                    'idUser' => $request->idUser,
                    'idMapel'=> $request->idMapel,
                    'kelas'=> $request->kelas,
                    'foto' => $request->foto,
                    'guruPengajar'=> $request->guruPengajar,
                    'kurikulum'=> $request->kurikulum,
                    'jamKeluar'=> $request->jamKeluar,
                    'jamMasuk'=> $request->jamMasuk,
                    'keterangan'=> $request->keterangan,
                    'typeIzin'=> $request->typeIzin,
                    'responKurikulum' => "pending",
                ]);
            }else{
                $add = Izin::create([
                    'idUser' => $request->idUser,
                    'idMapel'=> $request->idMapel,
                    'kelas'=> $request->kelas,
                    'guruPengajar'=> $request->guruPengajar,
                    'kurikulum'=> $request->kurikulum,
                    'jamKeluar'=> $request->jamKeluar,
                    'jamMasuk'=> $request->jamMasuk,
                    'keterangan'=> $request->keterangan,
                    'typeIzin'=> $request->typeIzin,
                    'responGuruPengajar' => "pending",
                    'responKurikulum' => "pending",
                ]);
            }

            if($add){
                return response()->json([
                    "message" => "Izin Berhasil Diajukan"
                ],200);
            }
        }catch(\Exception $e){
            return response()->json([
                'message' => $e
            ],500);
        }
    }

        public function tambahIzinGuru(IzinRequest $request){
        try{
            if($request->typeIzin == 'Masuk'){
                $validator = Validator::make($request->all(),[
                    'idUser' => 'required',
                    'kurikulum' => 'required',
                    'keterangan'=> 'required',
                    'jamMasuk' => 'required',
                    'typeIzin'=> 'required',
                ]);
            }else if($request->typeIzin == 'Keluar'){
                $validator = Validator::make($request->all(),[
                    'idUser' => 'required',
                    'kurikulum' => 'required',
                    'jamKeluar'=> 'required',
                    'jamMasuk'=> 'required',
                    'keterangan'=> 'required',
                    'typeIzin'=> 'required',
                ]);
            }else if($request->typeIzin == 'Pulang'){
                $validator = Validator::make($request->all(),[
                    'idUser' => 'required',
                    'kurikulum' => 'required',
                    'jamKeluar'=> 'required',
                    'keterangan'=> 'required',
                    'typeIzin'=> 'required',
                ]);
            }

            if($validator->fails()){
                return response()->json([
                    'error'=> $validator->errors()
                ],422);
            }

            if($request->foto != null){
                $add = Izin::create([
                    'idUser' => $request->idUser,
                    'foto' => $request->foto,
                    'kurikulum'=> $request->kurikulum,
                    'jamKeluar'=> $request->jamKeluar,
                    'jamMasuk'=> $request->jamMasuk,
                    'keterangan'=> $request->keterangan,
                    'typeIzin'=> $request->typeIzin,
                    'responKurikulum' => "pending",
                ]);
            }else{
                $add = Izin::create([
                    'idUser' => $request->idUser,
                    'kurikulum'=> $request->kurikulum,
                    'jamKeluar'=> $request->jamKeluar,
                    'jamMasuk'=> $request->jamMasuk,
                    'keterangan'=> $request->keterangan,
                    'typeIzin'=> $request->typeIzin,
                    'responKurikulum' => "pending",
                ]);
            }

            if($add){
                return response()->json([
                    "message" => "Izin Berhasil Diajukan"
                ],200);
            }
        }catch(\Exception $e){
            return response()->json([
                'message' => $e
            ],500);
        }
    }

    public function EditIzinGuru($id, IzinRequest $request){
        $getIzinGuru = Izin::find($id);

            try{
                if(!$getIzinGuru){
                    return response()->json([
                        "message" => "Data Tidak Ditemukan"
                    ],404);
                }
        
                if($request->typeIzin == 'Masuk'){
                    $validator = Validator::make($request->all(),[
                        'idUser' =>'required',
                        'kurikulum' =>'required',
                        'jamMasuk' => 'required',
                        'keterangan'=> 'required',
                        'typeIzin'=> 'required',
                    ]);
                }else if($request->typeIzin == 'Keluar'){
                    $validator = Validator::make($request->all(),[
                        'idUser' =>'required',
                        'kurikulum' =>'required',
                        'jamKeluar'=> 'required',
                        'jamMasuk'=> 'required',
                        'keterangan'=> 'required',
                        'typeIzin'=> 'required',
                    ]);
                }else if($request->typeIzin == 'Pulang'){
                    $validator = Validator::make($request->all(),[
                        'idUser' =>'required',
                        'kurikulum' =>'required',
                        'jamKeluar'=> 'required',
                        'keterangan'=> 'required',
                        'typeIzin'=> 'required',
                    ]);
                }

                if($validator->fails()){
                    return response()->json([
                        'error'=> $validator->errors()
                    ],422);
                }
        
                if($request->foto != null){
                    $getIzinGuru->foto = $request->foto;
                    }
        
                    if($request->typeIzin == "Masuk"){
                        $getIzinGuru->foto = $request->foto;
                        $getIzinGuru->jamKeluar = null;
                        $getIzinGuru->jamMasuk = $request->jamMasuk;
                    }else if($request->typeIzin == "Keluar"){
                        $getIzinGuru->foto = null;
                        $getIzinGuru->jamKeluar = $request->jamKeluar;
                        $getIzinGuru->jamMasuk = $request->jamMasuk;
                    }else{
                        $getIzinGuru->foto = null;
                        $getIzinGuru->jamKeluar = $request->jamKeluar;
                        $getIzinGuru->jamMasuk = null;
                    }
        
                    $getIzinGuru->kurikulum = $request->kurikulum;
                    $getIzinGuru->keterangan = $request->keterangan;
                    $getIzinGuru->typeIzin = $request->typeIzin;
        
                    $getIzinGuru->save();

                return response()->json([
                    'message'=> "Data berhasil diupdate"
                ],200);
    
        
            }catch(\Exception $e){
                return response()->json([
                    'message'=>$e
                ],505);
            }
    }

    public function BeriIzin($id,$role){
        $getRecord = Izin::find($id);

        if(!$getRecord){
            return response()->json([
                'message' => "Data Tidak Ditemukan"
            ],404);
        }

        if($role == 2){
            $getRecord->responGuruPengajar = "Diizinkan";
        }else if($role == 5){
            $getRecord->responKurikulum = "Diizinkan";        
        }

        $getRecord->save();
        return response()->json([
            'message'=> "Data berhasil diupdate"
        ],200);
    }

    public function Tolak($id,$role){
        $getRecord = Izin::find($id);

        if(!$getRecord){
            return response()->json([
                'message' => "Data Tidak Ditemukan"
            ],404);
        }

        if($role == 2){
            $getRecord->responGuruPengajar = "Ditolak";
        }else if($role == 5){
            $getRecord->responKurikulum = "Ditolak";
        }

        $getRecord->save();
        return response()->json([
            'message'=> "Data berhasil diupdate"
        ],200);
    }
}