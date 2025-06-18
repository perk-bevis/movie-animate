// Trang đăng ký
import React from 'react';
import { Link } from 'react-router-dom';
import Registerform from '../components/Registerform';

const Registerpage = () => {

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
                <Registerform/>
            </div>
        </div>
    );
}

export default Registerpage
