import logo from "../assets/ICON-1-2-1536x332.png";
import logo2 from "../assets/5260-high_school_class-1296x728-header.webp";
import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
export default function NotfoundPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <div className="flex-grow">
        <div className="w-full bg-[#155f95]">
          <div className="w-11/12 mx-auto bg-[#155f95]">
            {/* navbar */}
            <div className="w-full h-[12vh] flex justify-between">
              <div className="">
                <img
                  src={logo}
                  alt=""
                  className="object-contain my-auto h-[70px] w-[200px]"
                />
              </div>
            </div>
            {/* navbar */}
          </div>
        </div>
        <div className="flex w-full text-center items-center justify-center mt-[130px]">
          <div className="w-full text-center items-center justify-center flex-grow">
            <h1 className="text-[49px] font-abc font-bold">404 Not Found</h1>
            <Link to={"/home"}>
              <button className="px-3 mt-3 py-2 bg-[#155f95] text-white rounded-md">
                Kembali ke Home
              </button>
            </Link>
          </div>
        </div>
      </div>
      <div className="w-full mx-auto bg-[#155f95]">
        {/* footer */}
        <div className="w-full h-[15vh] flex items-center mx-auto">
          <h1 className="font-abc text-center w-full text-white font-bold">
            © 2023 ICT SMKN 1
          </h1>
        </div>
        {/* footer */}
      </div>
    </div>
  );
}
