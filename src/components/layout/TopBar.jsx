import axios from "axios";
import React, { useEffect, useState } from "react";
import { BsFillBellFill } from "react-icons/bs";
import { FaUserCircle } from "react-icons/fa";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { BASE_URL } from "../../config/base_url";

export default function TopBar({ children }) {
  const nav = useNavigate();
  const [topbarheader, setTopbarHeader] = useState("");
  const { user } = useSelector((state) => state.user);

  const topBarHeader = () => {
    if (user?.role === 1) {
      setTopbarHeader("Siswa");
    }
  };

  useEffect(() => {
    const delay = 2000;

    const timer = setTimeout(() => {
      if (user == undefined) {
        window.location.href = `${BASE_URL}`;
      }
    }, delay);

    return () => clearTimeout(timer);
  }, [user]);

  useEffect(() => {
    topBarHeader();
  }, [user]);

  return (
    <div>
      <div className="w-full h-[80px] flex p-6 lg:justify-between xl:justify-between justify-end">
        <div className="w-[50%] text-[25px] hidden  md:hidden lg:block xl:block font-abc font-[500]">
          <h1>{children}</h1>
        </div>
        <div className="w-[50%] flex justify-end  ">
          <div className="flex">
            <img
              src={user?.fotoprofile}
              className="w-[25px] h-[25px] object-cover rounded-full"
              alt=""
            />
            <h1
              onClick={() => nav("/Profile")}
              className="ml-2 font-abc font-[500] cursor-pointer"
            >
              {user?.name}
            </h1>
          </div>
        </div>
      </div>
      <div className="w-[95%] opacity-25 mx-auto mt-0 h-[1px] bg-slate-600"></div>
    </div>
  );
}
