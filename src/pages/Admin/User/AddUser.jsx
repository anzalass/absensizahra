import React, { useState } from "react";
import Sidebar from "../../../components/layout/Sidebar";
import TopBar from "../../../components/layout/TopBar";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { BACKEND_BASE_URL } from "../../../config/base_url";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";

export default function AddUser() {
  const nav = useNavigate();
  const [open, setOpen] = useState(false);
  const [disableBtn, setDisableBtn] = useState(false);
  const [hiddenPass, setHiddenPass] = useState(false);
  const [data, setData] = useState({
    name: "",
    email: "",
    password: "",
    role: "",
    noHP: "",
    kelas: "",
  });

  const [err, setErr] = useState({
    name: "",
    email: "",
    password: "",
    role: "",
    noHP: "",
    kelas:""
  });
  const tambahPetugas = async () => {
    try {
      const res = await axios.post(`${BACKEND_BASE_URL}/api/Register`, data);

      if (res.status === 200) {
        nav("/AllUsers");
      }
    } catch (err) {
      console.log(err);
      setErr({
        name: err?.response?.data?.error?.name,
        email: err?.response?.data?.error?.email,
        password: err?.response?.data?.error?.password,
        role: err?.response?.data?.error?.role,
        noHP: err?.response?.data?.error?.noHP,
        kelas:err?.response?.data?.error?.kelas
      });
    }
  };

  const changeDataHandler = (e) => {
    setData({
      ...data,
      [e.target.name]: e.target.value,
    });

    console.log(data);
  };
  return (
    <div className="w-full px-3 min-h-screen mb-[100px]">
      <div className={``}>
        <Sidebar setSidebar={5} width={open} setWidth={setOpen} />
      </div>
      <div className={` `}>
        <TopBar>{"Pendaftaran Petugas"}</TopBar>
        <div className="w-[98%] mx-auto">
          <div className="w-[95%] h-[80px] justify-between flex mx-auto">
            <div className="w-[80%] mx-auto mt-10">
              <div className="w-full mt-4">
                <h1 className="font-abc pb-2">Nama Lengkap</h1>
                <input
                  type="text"
                  name="name"
                  onChange={(e) => changeDataHandler(e)}
                  className=" border-2 border-slate-500 rounded-xl pl-3 w-full h-[30px]"
                />
                {err.name ? <p>{err.name}</p> : null}
              </div>
              <div className="w-full mt-4">
                <h1 className="font-abc pb-2">Email</h1>
                <input
                  type="email"
                  name="email"
                  onChange={(e) => changeDataHandler(e)}
                  className=" border-2 border-slate-500 rounded-xl pl-3 w-full h-[30px]"
                />
                {err.email ? <p>{err.email}</p> : null}
              </div>
              <div className="w-full mt-4 relative">
                <h1 className="font-abc pb-2">Password</h1>
                <input
                  type={hiddenPass ? "text" : "password"}
                  name="password"
                  onChange={(e) => changeDataHandler(e)}
                  className=" border-2 border-slate-500 rounded-xl pl-3 w-full h-[30px]"
                />
                {hiddenPass ? (
                  <AiOutlineEyeInvisible
                    onClick={() => setHiddenPass(false)}
                    className="absolute right-[10px] top-[34px]"
                    size={24}
                  />
                ) : (
                  <AiOutlineEye
                    onClick={() => setHiddenPass(true)}
                    className="absolute right-[10px] top-[34px]"
                    size={24}
                  />
                )}
                {err.password ? <p>{err.password}</p> : null}
              </div>
              <div className="w-full mt-4">
                <h1 className="font-abc pb-2">No HP</h1>
                <input
                  type="number"
                  name="noHP"
                  onChange={(e) => changeDataHandler(e)}
                  className=" border-2 border-slate-500 rounded-xl pl-3 w-full h-[30px]"
                />
                {err.noHP ? <p>{err.noHP}</p> : null}
              </div>
              <div className="w-full mt-4">
                <h1 className="font-abc pb-2 ">Role</h1>
                <select
                  name="role"
                  className=" border-2 border-slate-500 rounded-xl pl-3 w-full h-[30px]"
                  onChange={(e) => changeDataHandler(e)}
                >
                  <option value="">Pilih Role</option>
                  <option value="4">Admin</option>
                  <option value="5">Kurikulum</option>
                  <option value="1">Siswa</option>
                  <option value="2">Guru Pengajar</option>
                  <option value="3">Guru Piket</option>
                </select>
                {err.role ? <p>{err.role}</p> : null}
              </div>
              {data.role === "1" ? (
                <div className="w-full mt-4">
                  <h1 className="font-abc pb-2">Kelas</h1>
                  <input
                    type="text"
                    name="kelas"
                    onChange={(e) => changeDataHandler(e)}
                    className=" border-2 border-slate-500 rounded-xl pl-3 w-full h-[30px]"
                  />
                  {err.kelas ? <p>{err.kelas}</p> : null}
                </div>
              ) : null}
              <div className="w-full justify-center mt-12 mb-12 flex items-center">
                <button
                  onClick={tambahPetugas}
                  className="bg-[#155f95] px-3 py-1 w-[140px] rounded-md text-[#E5D5F2] font-abc"
                >
                  Simpan
                </button>
                <button
                  onClick={() => nav("/home")}
                  className="bg-[#E5D5F2] px-3 py-1 w-[140px] rounded-md ml-2  text-[#155f95] font-abc"
                >
                  Batal
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
