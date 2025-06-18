import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function validateEmail(email) {
    return String(email)
        .toLowerCase()
        .match(
            /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        );
};

const LoginForm = () => {
    const [isButtonHovered, setIsButtonHovered] = useState(false);
    const buttonStyle = {
        backgroundColor: isButtonHovered ? '#854D0E' : '#A16207',
        transition: 'background-color 0.2s'
    };

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [emailError, setEmailError] = useState('');
    const [passwordError, setPasswordError] = useState('');
    const [loginError, setLoginError] = useState('');
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault(); 
        let isValid = true; 
        
        // Clear lỗi cũ
        setEmailError('');
        setPasswordError('');
        setLoginError('');

        // Validate email
        if (!email) {
            setEmailError('Email không được để trống');
            isValid = false;
        } else if (!validateEmail(email)) {
            setEmailError('Email không đúng định dạng');
            isValid = false;
        }

        // Validate password
        if (!password) {
            setPasswordError('Password không được để trống');
            isValid = false;
        }
        
        if (!isValid) return;

        // Xử lý logic đăng nhập
        const userLocal = JSON.parse(localStorage.getItem("users")) || [];
        const findUser = userLocal.find(user => user.email === email && user.password === password);

        if (findUser) {
            localStorage.setItem("userLogin", JSON.stringify(findUser));
            navigate("/"); 
        } else {
            setLoginError("Email hoặc mật khẩu không chính xác.");
        }
    };

    return (
        <form onSubmit={handleSubmit} noValidate>
            {loginError && <div className='mb-4 text-center text-red-500'>{loginError}</div>}
            
            <div className="mb-4">
                <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-1">Email</label>
                <input
                    type="email"
                    id="email"
                    name="email"
                    placeholder="Email"
                    className="w-full bg-[#333] border border-gray-600 text-white rounded-md p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    value={email} 
                    onChange={(e) => setEmail(e.target.value)}
                />
                {emailError && <div className='mt-1 text-red-400'>{emailError}</div>}
            </div>

            <div className="mb-4">
                <label htmlFor="password" className="block text-sm font-medium text-gray-300 mb-1">Password</label>
                <input
                    type="password"
                    id="password"
                    name="password"
                    placeholder="••••••••"
                    className="w-full bg-[#333] border border-gray-600 text-white rounded-md p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)} 
                />
                {passwordError && <div className='mt-1 text-red-400'>{passwordError}</div>}
            </div>

            <div className="flex items-center justify-between mb-6">
                <div className="flex items-center">
                    <input id="remember-me" name="remember-me" type="checkbox" className="h-4 w-4 bg-gray-600 border-gray-500 rounded text-blue-600 focus:ring-blue-500" />
                    <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-300">Ghi nhớ</label>
                </div>
                <div className="text-sm">
                    <a href="#" className="font-medium text-gray-300 hover:text-white hover:underline">Quên mật khẩu?</a>
                </div>
            </div>

            <div>
                <button
                    type="submit"
                    className="w-full text-white font-bold py-3 px-4 rounded-lg"
                    style={buttonStyle}
                    onMouseOver={() => setIsButtonHovered(true)}
                    onMouseOut={() => setIsButtonHovered(false)}
                >
                    Đăng nhập
                </button>
            </div>

            <div className="flex items-center justify-between mb-6 mt-1">
                <div className="text-sm">
                    <a href="#" className="font-medium text-gray-300 hover:text-white hover:underline">Bạn chưa có tài khoản?</a>
                </div>
            </div>
        </form>
    );
}

export default LoginForm;