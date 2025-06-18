import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function validateEmail(email) {
    return String(email)
        .toLowerCase()
        .match(
            /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        );
};

const Registerform = () => {
    // --- State cho Form (đã xóa userName) ---
    const [formData, setFormData] = useState({
        email: '',
        password: '',
        rePassword: '',
        address: ''
    });

    const [errors, setErrors] = useState({});
    const [successMessage, setSuccessMessage] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [isButtonHovered, setIsButtonHovered] = useState(false);
    
    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevData => ({ ...prevData, [name]: value }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const newErrors = {};
        const userLocal = JSON.parse(localStorage.getItem("users")) || [];

        // --- Validate (đã xóa validation cho userName) ---
        if (!formData.email) {
            newErrors.email = "Email không được để trống";
        } else if (!validateEmail(formData.email)) {
            newErrors.email = "Email không đúng định dạng";
        } else {
            const isEmailExist = userLocal.find(user => user.email === formData.email);
            if (isEmailExist) newErrors.email = "Email này đã được sử dụng";
        }

        if (!formData.password) newErrors.password = "Mật khẩu không được để trống";
        else if (formData.password.length < 6) newErrors.password = "Mật khẩu phải có ít nhất 6 ký tự";

        if (!formData.rePassword) newErrors.rePassword = "Vui lòng nhập lại mật khẩu";
        else if (formData.password !== formData.rePassword) newErrors.rePassword = "Mật khẩu không khớp";

        setErrors(newErrors);

        if (Object.keys(newErrors).length > 0) return;

        setIsLoading(true);

        // --- Xử lý logic đăng ký (tự động tạo userName) ---
        const user = {
            userId: crypto.randomUUID(),
            userName: formData.email.split('@')[0], 
            email: formData.email,
            password: formData.password,
        };

        userLocal.push(user);
        localStorage.setItem("users", JSON.stringify(userLocal));
        setSuccessMessage("Đăng ký thành công! Đang chuyển hướng đến trang đăng nhập...");

        setTimeout(() => {
            setIsLoading(false);
            navigate("/dang-nhap");
        }, 2000);
    };

    const buttonStyle = {
        backgroundColor: isButtonHovered ? '#854D0E' : '#A16207',
        transition: 'background-color 0.2s',
        cursor: isLoading ? 'not-allowed' : 'pointer',
        opacity: isLoading ? 0.7 : 1,
    };

    return (
        // --- JSX (đã xóa input userName) ---
        <form onSubmit={handleSubmit} noValidate>
            {successMessage && <div className="mb-4 text-center text-green-500">{successMessage}</div>}
            
            <div className="mb-4">
                <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-1">Email</label>
                <input type="email" id="email" name="email" placeholder="Email" className="w-full bg-[#333] border border-gray-600 text-white rounded-md p-3 focus:outline-none focus:ring-2 focus:ring-yellow-600" value={formData.email} onChange={handleChange} />
                {errors.email && <div className="mt-1 text-red-400 text-sm">{errors.email}</div>}
            </div>

            <div className="mb-4">
                <label htmlFor="password" className="block text-sm font-medium text-gray-300 mb-1">Mật khẩu</label>
                <input type="password" id="password" name="password" placeholder="••••••••" className="w-full bg-[#333] border border-gray-600 text-white rounded-md p-3 focus:outline-none focus:ring-2 focus:ring-yellow-600" value={formData.password} onChange={handleChange} />
                {errors.password && <div className="mt-1 text-red-400 text-sm">{errors.password}</div>}
            </div>

            <div className="mb-4">
                <label htmlFor="rePassword" className="block text-sm font-medium text-gray-300 mb-1">Nhập lại Mật khẩu</label>
                <input type="password" id="rePassword" name="rePassword" placeholder="••••••••" className="w-full bg-[#333] border border-gray-600 text-white rounded-md p-3 focus:outline-none focus:ring-2 focus:ring-yellow-600" value={formData.rePassword} onChange={handleChange} />
                {errors.rePassword && <div className="mt-1 text-red-400 text-sm">{errors.rePassword}</div>}
            </div>
            <div>
                <button type="submit" className="w-full text-white font-bold py-3 px-4 rounded-lg" style={buttonStyle} onMouseOver={() => setIsButtonHovered(true)} onMouseOut={() => setIsButtonHovered(false)} disabled={isLoading} >
                    {isLoading ? 'Đang xử lý...' : 'Đăng Ký'}
                </button>
            </div>
        </form>
    )
}

export default Registerform;