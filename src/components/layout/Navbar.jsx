import React from 'react'
import { Link } from 'react-router-dom';

const Navbar = () => {
    return (
        <header className="fixed top-0 left-0 w-full bg-black bg-opacity-70 z-50 py-4 px-8 flex items-center justify-between">
            <div className="text-2xl font-bold text-red-600">
                CODE METECH
            </div>
            <nav className="hidden md:flex">
                <ul className="flex space-x-8">
                    <li>
                        <Link to="/" className="text-white text-base pb-1 border-b-2 border-green-500">Trang Chủ</Link>
                    </li>
                    <li>
                        <Link to="/phim-bo" className="no-underline text-gray-400 hover:text-white text-base pb-1 hover:border-b-2 hover:border-green-500">Phim Bộ</Link>
                    </li>
                    <li>
                        <Link to="/phim-le" className="no-underline text-gray-400 text-base pb-1 hover:text-white hover:border-b-2 hover:border-green-500">Phim lẻ</Link>
                    </li>
                    <li>
                        <Link to="/tv-show" className="no-underline text-gray-400 text-base pb-1 hover:text-white hover:border-b-2 hover:border-green-500">Tv Show</Link>
                    </li>
                    <li>
                        <Link to="/hoat-hinh" className="no-underline text-gray-400 text-base pb-1 hover:text-white hover:border-b-2 hover:border-green-500">Hoạt hình</Link>
                    </li>
                    <li>
                        <Link to="/the-thao" className="no-underline text-gray-400 text-base pb-1 hover:text-white hover:border-b-2 hover:border-green-500">Thể Thao</Link>
                    </li>
                    <li>
                        <Link to="/the-loai" className="no-underline text-gray-400 text-base pb-1 hover:text-white hover:border-b-2 hover:border-green-500">Thể Loại</Link>
                    </li>
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
                    <button className="bg-sky-600 hover:bg-sky-700 text-white font-semibold py-2 px-4 rounded-lg transition-colors">Đăng Nhập</button>
                    <button className="bg-red-600 hover:bg-red-700 text-white font-semibold py-2 px-4 rounded-lg transition-colors">Đăng Kí</button>
                </div>
            </div>
        </header>
    );
}

export default Navbar