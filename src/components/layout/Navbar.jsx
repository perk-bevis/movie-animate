import React from "react";
import { NavLink } from "react-router-dom";

const Navbar = () => {
  const activeLink = "text-white text-base pb-1 border-b-2";

  return (
    <header className="fixed top-0 left-0 w-full bg-black bg-opacity-70 z-50 py-4 px-8 flex items-center justify-between">
      <div className="text-2xl font-bold text-red-600">CODE METECH</div>
      <nav className="hidden md:flex">
        <ul className="flex space-x-8">
          {[
            {
              to: "/",
              label: "Trang Chủ",
            },
            {
              to: "/phim-bo",
              label: "Phim Bộ",
            },
            {
              to: "/phim-le",
              label: "Phim-le"
            },
            {
               to: "/tv-show",
               label: "Tv Show"
            },
            {
                to: "/hoat-hinh",
                label: "Hoạt Hình"
            },
            {
                to: "/the-thao",
                Label: "Thể Thao"
            },
            {
                to: "/the-loai",
                Label: "Thể Loại"
            },
          ].map(({ to, label }, i) => {
            return (
              <li key={i}>
                <NavLink
                  to={to}
                  className="text-white text-base pb-1 border-b-2 border-green-500"
                >
                  {label}
                </NavLink>
              </li>  
            );
          })}
          {/* <li>
            <NavLink
              to="/"
              className="text-white text-base pb-1 border-b-2 border-green-500"
            >
              Trang Chủ
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/phim-bo"
              className="no-underline text-gray-400 hover:text-white text-base pb-1 hover:border-b-2 hover:border-green-500"
            >
              Phim Bộ
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/phim-le"
              className="no-underline text-gray-400 text-base pb-1 hover:text-white hover:border-b-2 hover:border-green-500"
            >
              Phim lẻ
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/tv-show"
              className="no-underline text-gray-400 text-base pb-1 hover:text-white hover:border-b-2 hover:border-green-500"
            >
              Tv Show
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/hoat-hinh"
              className="no-underline text-gray-400 text-base pb-1 hover:text-white hover:border-b-2 hover:border-green-500"
            >
              Hoạt hình
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/the-thao"
              className="no-underline text-gray-400 text-base pb-1 hover:text-white hover:border-b-2 hover:border-green-500"
            >
              Thể Thao
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/the-loai"
              className="no-underline text-gray-400 text-base pb-1 hover:text-white hover:border-b-2 hover:border-green-500"
            >
              Thể Loại
            </NavLink>
          </li> */}
        </ul>
      </nav>
      <div className="flex items-center space-x-4">
        <div className="hidden md:flex items-center space-x-2">
          <input
            type="text"
            placeholder="Tìm kiếm..."
            className="p-2 bg-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-red-600"
          />
          <button className="p-2 bg-red-600 text-white hover:bg-red-700 transition duration-300 -ml-[7px]">
            <i className="fa-solid fa-magnifying-glass"></i>
          </button>
        </div>
        <div className="flex items-center space-x-[10px]">
          <button className="bg-sky-600 hover:bg-sky-700 text-white font-semibold py-2 px-4 rounded-lg transition-colors">
            Đăng Nhập
          </button>
          <button className="bg-red-600 hover:bg-red-700 text-white font-semibold py-2 px-4 rounded-lg transition-colors">
            Đăng Kí
          </button>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
