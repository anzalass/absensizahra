import React, { useEffect, useState } from "react";
import Sidebar from "../components/layout/Sidebar";
import axios from "axios";
import { BACKEND_BASE_URL, BASE_URL } from "../config/base_url";

import { Link, useNavigate } from "react-router-dom";
import TopBar from "../components/layout/TopBar";
import { useSelector } from "react-redux";

export default function EditProfilePage({ children }) {
  const nav = useNavigate();
  const { user } = useSelector((state) => state.user);
  const [open, setOpen] = useState(false);
  const [dataUser, setDataUser] = useState({
    name: "",
    email: "",
    noHP: "",
  });

  const [err, setErr] = useState({
    name: "",
    email: "",
    noHP: "",
  });

  useEffect(() => {
    setDataUser({
      name: user?.name,
      email: user?.email,
      noHP: user?.noHP,
    });
    console.log();
  }, [user]);

  const changeDataHandler = (e) => {
    setDataUser({
      ...dataUser,
      [e.target.name]: e.target.value,
    });
    console.log(dataUser);
  };

  const UpdateUser = async () => {
    try {
      const res = await axios.put(
        `${BACKEND_BASE_URL}/api/updateDataUser/` + user?.id,
        dataUser
      );
      if (res.status === 200) {
        window.location.href = `${BASE_URL}/home`;
      }
    } catch (e) {
      console.log("wkwk error :", e);
      setErr({
        name: e.response.data.error.name,
        noHP: e.response.data.error.noHP,
      });
    }
  };
  return (
    <div className="w-full h-[160vh] flex">
      <div className={``}>
        <Sidebar setSidebar={1} width={open} setWidth={setOpen} />
      </div>
      <div className={`w-11/12 mx-auto`}>
        <TopBar>{`${
          user?.role === 4 ? `Profile ${user?.name}` : `Profile ${user?.name}`
        } `}</TopBar>
        {children}
        <div className="w-[94%] mx-auto">
          <div className="w-full mt-6">
            <h1 className="font-abc font-[500]">Nama</h1>
            <input
              type="text"
              name="name"
              value={dataUser.name}
              disabled={true}
              onChange={(e) => changeDataHandler(e)}
              className="w-full h-[35px] border-2 pl-2 border-slate-500 rounded-md"
            />
            {err.name ? <p>{err.name}</p> : null}
          </div>
          <div className="w-full mt-6">
            <h1 className="font-abc font-[500]">Email</h1>
            <input
              type="text"
              name="email"
              value={dataUser.email}
              onChange={(e) => changeDataHandler(e)}
              disabled={true}
              className="w-full h-[35px] border-2 pl-2 border-slate-500 rounded-md"
            />
          </div>
          <div className="w-full mt-6">
            <h1 className="font-abc font-[500]">No Telephone</h1>
            <input
              type="text"
              name="noHP"
              disabled={true}
              value={dataUser.noHP}
              onChange={(e) => changeDataHandler(e)}
              className="w-full h-[35px] border-2 pl-2 border-slate-500 rounded-md"
            />
            {err.noHP ? <p>{err.noHP}</p> : null}
          </div>
        </div>
      </div>
    </div>
  );
}
