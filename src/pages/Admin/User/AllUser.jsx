import Sidebar from "../../../components/layout/Sidebar.jsx";
import TopBar from "../../../components/layout/TopBar.jsx";
import TableTambahBarang from "../../../components/admin/pengadaanbarang/TabelBarang.jsx";
import axios, { all } from "axios";
import { useEffect, useState } from "react";
import { DataGrid } from "@mui/x-data-grid";
import { AiOutlineArrowRight } from "react-icons/ai";
import { BsTrash3 } from "react-icons/bs";
import { BiEditAlt } from "react-icons/bi";
import { data } from "autoprefixer";
import { BASE_URL, BACKEND_BASE_URL } from "../../../config/base_url.jsx";
import TabelUser from "../../../components/admin/Admin/TabelUser.jsx";
import { useNavigate } from "react-router-dom";

export default function AllUser() {
    const [user, setUser] = useState([]);
    const nav = useNavigate();

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        try {
            const result = await axios.get(`${BACKEND_BASE_URL}/api/getUser`);
            setUser(result.data.results);
            console.log(result.data.results);

            await new Promise((resolve) => setTimeout(resolve, 1000)); // 1000 milliseconds
        } catch (err) {
            console.log(err);
        }
    };

    const [addIzin, setAddIzin] = useState(false);
    const [open, setOpen] = useState(false);

    return (
        <div className="w-full h-[100vh] flex">
            <div className={``}>
                <Sidebar setSidebar={2} width={open} setWidth={setOpen} />
            </div>
            <div className={`w-11/12 mx-auto`}>
                <TopBar>{"Semua Pengguna"}</TopBar>
                <div className="w-[95%] h-[80px] lg:justify-between justify-center xl:justify-between mx-auto flex">
                    <div className="">
                        <button
                            onClick={() => nav("/AddUser")}
                            className="bg-[#7B2CBF] mt-5 px-3 text-center py-1 w-[200px] rounded-md text-[#E5D5F2] font-abc"
                        >
                            Tambah Pengguna +
                        </button>
                    </div>
                    {/* {addIzin ? null : (
                        <div className=" mt-5 px-3 py-1 w-[200px] h-[40px] rounded-md  font-abc">
                            <input
                                type="text"
                                className="w-full h-full pl-2 rounded-lg"
                                placeholder="Search"
                            />
                        </div>
                    )} */}
                </div>
                <div className="w-[95%] opacity-25 mx-auto mt-0 h-[1px] bg-slate-600"></div>

                {!addIzin ? <TabelUser data={user} /> : null}

            </div>
        </div>
    );
}
