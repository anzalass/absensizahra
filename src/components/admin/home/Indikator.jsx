import { useEffect, useState } from "react";

import Frame4 from "../../../assets/Frame(4).png";
import axios from "axios";
import { useSelector } from "react-redux";
import AdminDetailCard from "./AdminDetailCard";
import { Link } from "react-router-dom";

export default function Indikator() {
  const { user } = useSelector((state) => state.user);

  return (
    <div className="">
      {user?.role === 1 ? (
        <div className="mt-3 p-3 w-full mx-auto bg-white rounded-lg h-[40vh]  block lg:flex xl:flex md:flex ">
          <div className=" grid grid-cols-2 gap-4  mx-auto lg:w-[50%] xl:w-[50%] md:w-[50%] w-full  px-4">
            <Link to={"/Izin"}>
              <div className="h-[100px] pl-3 pt-6 relative z-30 rounded-md w-[100%] bg-[#155f95]">
                <h1 className=" text-white font-[500] text-[20px]">5</h1>
                <h1 className=" text-white font-[500] text-[16px]">
                  Izin Masuk
                </h1>
              </div>
            </Link>
            <Link to={"/Izin"}>
              <div className="h-[100px] pl-3 pt-6 relative rounded-md w-[100%] bg-[#FDB022]">
                <h1 className=" text-white font-[500] text-[20px]">2</h1>
                <h1 className=" text-white font-[500] text-[16px]">
                  Izin Keluar
                </h1>
              </div>
            </Link>

            <Link to={"/Izin"}>
              <div className="h-[100px] pl-3 pt-6 relative rounded-md w-[100%] bg-[#36BFFA]">
                <h1 className=" text-white font-[500] text-[20px]">12</h1>
                <h1 className=" text-white font-[500] text-[16px]">
                  Izin Pulang
                </h1>
              </div>
            </Link>
            <Link to={"/Izin"}>
              <div className=" pl-8 py-2 h-[100px] relative rounded-md w-[100%] bg-[#F04438]">
                <h1 className=" text-white font-[500] text-[30px]">6</h1>
                <h1 className=" text-white font-[500] text-[16px]">
                  Izin Diterima
                </h1>
              </div>
            </Link>
            <Link to={"/Izin"}>
              <div className="h-[100px] pl-8 py-2 relative rounded-md w-[100%] bg-[#32D583]">
                <h1 className=" text-white font-[500] text-[30px]">10</h1>
                <h1 className=" text-white font-[500] text-[16px]">
                  Izin Ditolak
                </h1>
              </div>
            </Link>
          </div>

          <div className=" lg:w-[50%] xl:w-[50%] md:w-[50%] w-full  xl:px-10 lg:px-10 md:px-10 px-3 xl:-mt-3 lg:-mt-3 md:-mt-3 mt-10">
            <AdminDetailCard />
          </div>
        </div>
      ) : user?.role === 4 ? (
        <div className="mt-3 p-3 w-full mx-auto bg-white rounded-lg h-[40vh] md:flex  lg:flex xl:flex">
          <div className=" grid grid-cols-1 gap-4 md:w-[50%] lg:w-[50&] xl:w-[50%] w-full mx-auto  md:grid-cols-1 lg:grid-cols-1 ">
            <Link to={"/AllUsers"}>
              <div className="h-[100px] pl-3 pt-6 relative z-30 rounded-md w-[100%] bg-[#155f95]">
                <h1 className=" text-white font-[500] text-[20px]">200</h1>
                <h1 className=" text-white font-[500] text-[16px]">Siswa</h1>
              </div>
            </Link>
            <Link to={"/AllUsers"}>
              <div className="h-[100px] pl-3 pt-6 relative rounded-md w-[100%] bg-[#FDB022]">
                <h1 className=" text-white font-[500] text-[20px]">21</h1>
                <h1 className=" text-white font-[500] text-[16px]">Guru</h1>
              </div>
            </Link>
          </div>

          <div className=" lg:w-[50%] xl:w-[50%] md:w-[50%] w-full  xl:px-10 lg:px-10 md:px-10 px-3 xl:-mt-3 lg:-mt-3 md:-mt-3 mt-10">
            <AdminDetailCard />
          </div>
        </div>
      ) : user?.role === 2 ? (
        <div className="mt-3 p-3 w-full mx-auto bg-white rounded-lg h-[40vh]  block lg:flex xl:flex md:flex ">
          <div className=" grid grid-cols-2 gap-4  mx-auto lg:w-[50%] xl:w-[50%] md:w-[50%] w-full ">
            <Link to={"/PermintaanIzinGuru"}>
              <div className="h-[100px] pl-3 pt-6 relative z-30 rounded-md w-[100%] bg-[#155f95]">
                <h1 className=" text-white font-[500] text-[20px]">5</h1>
                <h1 className=" text-white font-[500] text-[16px]">
                  Izin Masuk
                </h1>
              </div>
            </Link>
            <Link to={"/PermintaanIzinGuru"}>
              <div className="h-[100px] pl-3 pt-6 relative rounded-md w-[100%] bg-[#FDB022]">
                <h1 className=" text-white font-[500] text-[20px]">2</h1>
                <h1 className=" text-white font-[500] text-[16px]">
                  Izin Keluar
                </h1>
              </div>
            </Link>
            <Link to={"/PermintaanIzinGuru"}>
              <div className="h-[100px] pl-3 pt-6 relative rounded-md w-[100%] bg-[#36BFFA]">
                <h1 className=" text-white font-[500] text-[20px]">12</h1>
                <h1 className=" text-white font-[500] text-[16px]">
                  Izin Pulang
                </h1>
              </div>
            </Link>
            <Link to={"/PermintaanIzinGuru"}>
              <div className=" pl-8 py-2 h-[100px] relative rounded-md w-[100%] bg-[#F04438]">
                <h1 className=" text-white font-[500] text-[30px]">6</h1>
                <h1 className=" text-white font-[500] text-[16px]">
                  Izin Diterima
                </h1>
              </div>
            </Link>
            <Link to={"/PermintaanIzinGuru"}>
              <div className="h-[100px] pl-8 py-2 relative rounded-md w-[100%] bg-[#32D583]">
                <h1 className=" text-white font-[500] text-[30px]">10</h1>
                <h1 className=" text-white font-[500] text-[16px]">
                  Izin Ditolak
                </h1>
              </div>
            </Link>
            <Link to={"/PermintaanIzin"}>
              <div className="h-[100px] pl-8 py-2 relative rounded-md w-[100%] bg-yellow-400">
                <h1 className=" text-white font-[500] text-[30px]">10</h1>
                <h1 className=" text-white font-[500] text-[16px]">
                  Permintaan Izin
                </h1>
              </div>
            </Link>
          </div>

          <div className=" lg:w-[50%] xl:w-[50%] md:w-[50%] w-full  xl:px-10 lg:px-10 md:px-10 px-3 xl:-mt-3 lg:-mt-3 md:-mt-3 mt-10">
            <AdminDetailCard />
          </div>
        </div>
      ) : user.role === 5 ? (
        <div className="mt-3 p-3 w-full mx-auto bg-white rounded-lg h-[40vh]  block lg:flex xl:flex md:flex ">
          <div className=" grid grid-cols-1 gap-4  mx-auto lg:w-[50%] xl:w-[50%] md:w-[50%] w-full ">
            <div className="h-[100px] pl-3 pt-6 relative z-30 rounded-md w-[100%] bg-[#155f95]">
              <h1 className=" text-white font-[500] text-[20px]">5</h1>
              <h1 className=" text-white font-[500] text-[16px]">
                Daftar Siswa
              </h1>
            </div>
            <div className="h-[100px] pl-3 pt-6 relative rounded-md w-[100%] bg-[#FDB022]">
              <h1 className=" text-white font-[500] text-[20px]">2</h1>
              <h1 className=" text-white font-[500] text-[16px]">
                Daftar Guru
              </h1>
            </div>

            <div className="h-[100px] pl-3 pt-6 relative rounded-md w-[100%] bg-[#32D583]">
              <h1 className=" text-white font-[500] text-[20px]">12</h1>
              <h1 className=" text-white font-[500] text-[16px]">
                Daftar Admin
              </h1>
            </div>
            <div className=" pl-8 py-2 h-[100px] relative rounded-md w-[100%] bg-[#F04438]">
              <h1 className=" text-white font-[500] text-[30px]">6</h1>
              <h1 className=" text-white font-[500] text-[16px]">
                Permintaan Izin Guru
              </h1>
              <img
                src={Frame4}
                className=" absolute  right-0 top-5 h-[80px] z-0"
                alt=""
              />
            </div>
          </div>

          <div className=" lg:w-[50%] xl:w-[50%] md:w-[50%] w-full  xl:px-10 lg:px-10 md:px-10 px-3 xl:-mt-3 lg:-mt-3 md:-mt-3 mt-10">
            <AdminDetailCard />
          </div>
        </div>
      ) : null}
    </div>
  );
}
