import React, { useState } from "react";
import PropTypes from "prop-types";
import { NavLink } from "react-router-dom";

const Navbar = ( { onSearch }) => {
  const activeLink = "text-white text-base pb-1 border-b-2 border-green-500 transition-colors duration-300";
  const normalLink = "text-gray-400 hover:text-white text-base pb-1 border-b-2 border-transparent hover:border-green-500 transition-colors duration-300";
  const [textSearch, setTextSearch] = useState('')
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
              label: "Phim lẻ"
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
                label: "Thể Thao"
            }
          ].map(({ to, label }, i) => {
            return (
              <li key={i}>
                <NavLink
                  to={to}
                 className={({ isActive }) => isActive ? activeLink : normalLink}
                >
                  {label}
                </NavLink>
              </li>  
            );
          })}
        </ul>
      </nav>
      <div className="flex items-center space-x-4">
        <div className="hidden md:flex items-center space-x-2">
          <input
            type="text"
            placeholder="Tìm kiếm..."
            className="p-2 bg-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-red-600"
            onChange={(e) => setTextSearch(e.target.value)} value={textSearch} 
          />
          <button className="p-2 bg-red-600 text-white hover:bg-red-700 transition duration-300 -ml-[7px]" onClick={() => onSearch(textSearch)}>
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
Navbar.PropTypes = {
  onSearch: PropTypes.func
}
export default Navbar;
