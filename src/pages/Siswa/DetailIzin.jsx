import React, { useEffect, useState } from "react";
import Sidebar from "../../components/layout/Sidebar";
import TopBar from "../../components/layout/TopBar";
import TableTambahBarang from "../../components/admin/pengadaanbarang/TabelBarang.jsx";
import axios from "axios";
import { BACKEND_BASE_URL, BASE_URL } from "../../config/base_url";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";


export default function DetailIzin() {
    const { id } = useParams();
    const { user } = useSelector((state) => state.user);
    const [open, setOpen] = useState(false);
    const [allUser, setAllUser] = useState([]);
    const [izin, setIzin] = useState([]);
    const [mapel, setMapel] = useState([]);
    const [pengaju, setPengaju] = useState('');

    useEffect(() => {
        fetchData()
        console.log("ini id : ", id);
    }, [id])

    useEffect(() => {
        if (izin != undefined && allUser.length != 0) {
            const filterUser = allUser.filter((item) => item.id == izin.idUser);
            console.log(filterUser[0].id);
            setPengaju(filterUser[0].name);
        }
    }, [izin])

    const BeriIzin = async (e) => {
        try {
            const add = await axios.put(`${BACKEND_BASE_URL}/api/BeriIzin/${id}/${user.role}`)

            if (add.status == 200) {
                window.location.href = `${BASE_URL}/PermintaanIzin`;
            }
        } catch (err) {
            console.log(err);
        }
    }

    const TolakPermintaan = async () => {
        try {
            const update = await axios.put(`${BACKEND_BASE_URL}/api/TolakPengajuan/${id}/${user.role}`)

            if (update.status == 200) {
                window.location.href = `${BASE_URL}/PermintaanIzin`;
            }
        } catch (err) {
            console.log(err);
        }
    }

    const fetchData = async () => {
        const getAllUser = await axios.get(`${BACKEND_BASE_URL}/api/getUser`);
        const getIzinById = await axios.get(`${BACKEND_BASE_URL}/api/getIzinById/` + id);
        const getMapel = await axios.get(`${BACKEND_BASE_URL}/api/getMataPelajaran`);

        setAllUser(getAllUser.data.results);
        setIzin(getIzinById.data.results);
        setMapel(getMapel.data.results);
    }

    return (
        <div className="w-full h-screen flex">
            <div className={` `}>
                <Sidebar setSidebar={3} width={open} setWidth={setOpen} />
            </div>
            <div className={`w-11/12 mx-auto`}>
                <TopBar>{"Detail Izin " + izin.typeIzin + " " + new Date(izin.created_at).toDateString()}</TopBar>
                <div className="w-[95%] mx-auto mt-2 h-[50px] flex">
                    <div className="block w-full font-abc">
                        <div className="flex w-full ">
                            <div className="w-[20%]">
                                {" "}
                                <h1 className="my-3">Nama</h1>
                            </div>
                            <div className="w-[5%]">
                                {" "}
                                <h1 className="my-3">:</h1>
                            </div>
                            <div className="w-[65%]">
                                {" "}
                                <h1 className="my-3">{pengaju}</h1>
                            </div>
                        </div>
                        <div className="flex w-full ">
                            <div className="w-[20%]">
                                {" "}
                                <h1 className="my-3">Kelas</h1>
                            </div>
                            <div className="w-[5%]">
                                {" "}
                                <h1 className="my-3">:</h1>
                            </div>
                            <div className="w-[65%]">
                                {" "}
                                <h1 className="my-3">{izin.kelas}</h1>
                            </div>
                        </div>
                        {izin.typeIzin == 'Keluar' ?
                            <>
                                <div className="flex w-full ">
                                    <div className="w-[20%]">
                                        {" "}
                                        <h1 className="my-3">Jam Keluar</h1>
                                    </div>
                                    <div className="w-[5%]">
                                        {" "}
                                        <h1 className="my-3">:</h1>
                                    </div>
                                    <div className="w-[65%]">
                                        {" "}
                                        <h1 className="my-3">{izin.jamKeluar}</h1>
                                    </div>
                                </div>
                                <div className="flex w-full ">
                                    <div className="w-[20%]">
                                        {" "}
                                        <h1 className="my-3">Jam Masuk</h1>
                                    </div>
                                    <div className="w-[5%]">
                                        {" "}
                                        <h1 className="my-3">:</h1>
                                    </div>
                                    <div className="w-[65%]">
                                        {" "}
                                        <h1 className="my-3">{izin.jamMasuk}</h1>
                                    </div>
                                </div>
                            </> : izin.typeIzin == 'Pulang' ?
                                <div className="flex w-full ">
                                    <div className="w-[20%]">
                                        {" "}
                                        <h1 className="my-3">Jam Keluar</h1>
                                    </div>
                                    <div className="w-[5%]">
                                        {" "}
                                        <h1 className="my-3">:</h1>
                                    </div>
                                    <div className="w-[65%]">
                                        {" "}
                                        <h1 className="my-3">{izin.jamKeluar}</h1>
                                    </div>
                                </div> : null
                        }
                        <div className="flex w-full ">
                            <div className="w-[20%]">
                                {" "}
                                <h1 className="my-3">Tanggal</h1>
                            </div>
                            <div className="w-[5%]">
                                {" "}
                                <h1 className="my-3">:</h1>
                            </div>
                            <div className="w-[65%]">
                                {" "}
                                <h1 className="my-3">{new Date(izin.created_at).toDateString()}</h1>
                            </div>
                        </div>
                        <div className="flex w-full ">
                            <div className="w-[20%]">
                                {" "}
                                <h1 className="my-3">Guru Pengajar</h1>
                            </div>
                            <div className="w-[5%]">
                                {" "}
                                <h1 className="my-3">:</h1>
                            </div>
                            <div className="w-[65%]">
                                {" "}
                                <h1 className="my-3">{izin.guruPengajar}</h1>
                            </div>
                        </div>
                        <div className="flex w-full ">
                            <div className="w-[20%]">
                                {" "}
                                <h1 className="my-3">Status Guru Pengajar</h1>
                            </div>
                            <div className="w-[5%]">
                                {" "}
                                <h1 className="my-3">:</h1>
                            </div>
                            <div className="w-[65%]">
                                {" "}
                                <h1 className="my-3">{izin.responGuruPengajar}</h1>
                            </div>
                        </div>
                        <div className="flex w-full ">
                            <div className="w-[20%]">
                                {" "}
                                <h1 className="my-3">Guru Piket</h1>
                            </div>
                            <div className="w-[5%]">
                                {" "}
                                <h1 className="my-3">:</h1>
                            </div>
                            <div className="w-[65%]">
                                {" "}
                                <h1 className="my-3">{izin.guruPiket}</h1>
                            </div>
                        </div>
                        <div className="flex w-full ">
                            <div className="w-[20%]">
                                {" "}
                                <h1 className="my-3">Status Guru Piket</h1>
                            </div>
                            <div className="w-[5%]">
                                {" "}
                                <h1 className="my-3">:</h1>
                            </div>
                            <div className="w-[65%]">
                                {" "}
                                <h1 className="my-3">{izin.responGuruPiket}</h1>
                            </div>
                        </div>
                        <div className="flex w-full ">
                            <div className="w-[20%]">
                                {" "}
                                <h1 className="my-3">Keterangan</h1>
                            </div>
                            <div className="w-[5%]">
                                {" "}
                                <h1 className="my-3">:</h1>
                            </div>
                            <div className="w-[65%]">
                                {" "}
                                <h1 className="my-3">{izin.keterangan}</h1>
                            </div>
                        </div>
                        {user.role == 2 || user.role == 3 ?
                            (user.role == 3 && izin.responGuruPiket == "pending") || (user.role == 2 && izin.responGuruPengajar == "pending") ?
                                <div className="w-full justify-center mt-12 mb-12 flex items-center">
                                    <button
                                        onClick={(e) => BeriIzin(e)}
                                        className="bg-[#7B2CBF] px-3 py-1 w-[140px] rounded-md text-[#E5D5F2] font-abc"
                                    >
                                        Izinkan
                                    </button>
                                    <button
                                        onClick={() => TolakPermintaan()}
                                        className="bg-[#E5D5F2] px-3 py-1 w-[140px] rounded-md ml-2  text-[#7B2CBF] font-abc"
                                    >
                                        Tolak
                                    </button>
                                </div> : null
                            :
                            izin.responGuruPiket == 'pending' && izin.responGuruPengajar == 'pending' ?
                                <div className="w-full justify-center mt-12 mb-12 flex items-center">
                                    <button
                                        onClick={(e) => BeriIzin(e)}
                                        className="bg-[#7B2CBF] px-3 py-1 w-[140px] rounded-md text-[#E5D5F2] font-abc"
                                    >
                                        Edit
                                    </button>
                                    <button
                                        onClick={() => setPengadaanBarang(!pengadaanBarang)}
                                        className="bg-[#E5D5F2] px-3 py-1 w-[140px] rounded-md ml-2  text-[#7B2CBF] font-abc"
                                    >
                                        Batal
                                    </button>
                                </div> : null
                        }
                        {/* {izin.responGuruPiket == 'pending' && izin.responGuruPengajar == 'pending' ?
                            <div className="w-full justify-center mt-12 mb-12 flex items-center">
                                <button
                                    onClick={(e) => TambahPengadaan(e)}
                                    className="bg-[#7B2CBF] px-3 py-1 w-[140px] rounded-md text-[#E5D5F2] font-abc"
                                >
                                    Edit
                                </button>
                                <button
                                    onClick={() => setPengadaanBarang(!pengadaanBarang)}
                                    className="bg-[#E5D5F2] px-3 py-1 w-[140px] rounded-md ml-2  text-[#7B2CBF] font-abc"
                                >
                                    Batal
                                </button>
                            </div> : null
                        } */}
                    </div>
                </div>
            </div>
        </div>
    );
}