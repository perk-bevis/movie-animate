// Trang đăng ký
import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const Registerpage = () => {
    // Thêm state để quản lý hiệu ứng hover cho nút bấm
    const [isButtonHovered, setIsButtonHovered] = useState(false);

    // Định nghĩa các kiểu style cho nút bấm
    const buttonStyle = {
        backgroundColor: isButtonHovered ? '#854D0E' : '#A16207',
        transition: 'background-color 0.2s'
    };

    return (
        <div className="min-h-screen bg-[#121212] flex flex-col justify-center items-center p-4">

            <div className="w-full max-w-md mb-4">
                <p className="text-sm text-gray-400">
                    <Link to="/" className="hover:text-white">
                        🏠 Codemetech
                    </Link>
                    <span className="mx-2">&gt;</span>
                    <span>Đăng Ký</span>
                </p>
            </div>

            <div className="w-full max-w-md bg-[#1E1E1E] p-8 rounded-lg shadow-lg">

                <h1 className="text-3xl font-bold text-white text-center mb-6">Đăng Ký</h1>
                <form action="#" method="POST">
                    <div className="mb-4">
                        <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-1">Email</label>
                        <input type="email" id="email" name="email" placeholder="Email" className="w-full bg-[#333] border border-gray-600 text-white rounded-md p-3 focus:outline-none focus:ring-2 focus:ring-blue-500" />
                    </div>

                    <div className="mb-4">
                        <label htmlFor="password" className="block text-sm font-medium text-gray-300 mb-1">Password</label>
                        <input type="password" id="password" name="password" placeholder="••••••••" className="w-full bg-[#333] border border-gray-600 text-white rounded-md p-3 focus:outline-none focus:ring-2 focus:ring-blue-500" />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="password" className="block text-sm font-medium text-gray-300 mb-1">Comfirm Password</label>
                        <input type="password" id="password" name="password" placeholder="••••••••" className="w-full bg-[#333] border border-gray-600 text-white rounded-md p-3 focus:outline-none focus:ring-2 focus:ring-blue-500" />
                    </div>
                    <div>
                        <button
                            type="submit"
                            className="w-full text-white font-bold py-3 px-4 rounded-lg"
                            style={buttonStyle}
                            onMouseOver={() => setIsButtonHovered(true)}
                            onMouseOut={() => setIsButtonHovered(false)}
                        >
                            Đăng Ký
                        </button>
                    </div>
                    <div className="flex items-center justify-between mb-6 mt-1">
                        <div className="flex items-center">
                            <a href="#" className="font-medium text-gray-300 hover:text-white hover:underline">Bạn đã có tài khoản?</a>
                        </div>
                        <div className="text-sm">
                            <a href="#" className="font-medium text-gray-300 hover:text-white hover:underline">Đăng nhập</a>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default Registerpage
