import React, { useState } from "react";
import PropTypes from "prop-types";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { Dropdown, Modal} from 'antd';
import { FileAddOutlined, KeyOutlined, LoginOutlined, UserOutlined } from "@ant-design/icons";

const Navbar = ({ onSearch }) => {
  const activeLink = "text-white text-base pb-1 border-b-2 border-green-500 transition-colors duration-300";
  const normalLink = "text-gray-400 hover:text-white text-base pb-1 border-b-2 border-transparent hover:border-green-500 transition-colors duration-300";
  const [textSearch, setTextSearch] = useState('')
   const [isModalOpen, setIsModalOpen] = useState(false);
  // lấy thông tin user đã đăng nhập
  const userLogin = JSON.parse(localStorage.getItem("userLocal"))
  const navigate = useNavigate();

   const handleLogout = () => {
    localStorage.removeItem("userLocal")
    navigate("/")
  }

  // hàm hiển thị modal xác nhận đăng xuất
  const showLogoutModal = () => {
    setIsModalOpen(true);
  };

  // hàm xử lý khi nhấn OK trong modal
  const handleOk = () => {
    setIsModalOpen(false);
    handleLogout();
  };

  // hàm xử lý khi nhấn Cancel trong modal
  const handleCancel = () => {
    setIsModalOpen(false);
  };
  const items = [
    {
      key: '1',
      label: (
        <Link to="/profile ">
          <UserOutlined className="mr-2" />
          Thông tin cá nhân
        </Link>
      ),
    },
    {
      key: '2',
      label: (
        <Link to="/change-password">
          <KeyOutlined className="mr-2" />
          Thay đổi mật khẩu
        </Link>
      ),
    },
    {
      key: '3',
      label: (
        <Link to="/addlist">
          <FileAddOutlined className="mr-2"/>
          Bộ sưu tập của tôi
        </Link>
      ),
    },
    {
      key: '4',
      label: (
        <a onClick={showLogoutModal}>
          <LoginOutlined className="mr-2" />
          Đăng xuất
        </a>
      ),
    },
  ];
  return (
    <>
     <header className="fixed top-0 left-0 w-full bg-black bg-opacity-70 z-50 py-4 px-8 flex items-center justify-between">
      <Link to="/">
        <div className="text-2xl font-bold text-red-600">CODE METECH</div>
      </Link>
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
        {userLogin !== null ?
          (<>
            <Dropdown menu={{ items }} placement="bottomLeft" arrow>
              <button
                className="bg-sky-600 hover:bg-sky-700 text-white font-semibold py-2 px-4 rounded-lg transition-colors flex items-center space-x-2"
              >
                <img
                  className="w-[25px] h-[25px] rounded-full object-cover"
                  src={userLogin.image}
                  alt="User Avatar"
                />
                <span>{userLogin.userName}</span>
              </button>
            </Dropdown>
          </>) : (<>
            <div className="flex items-center space-x-[10px]">
              <Link
                to="/dang-nhap"
                className="bg-sky-600 hover:bg-sky-700 text-white font-semibold py-2 px-4 rounded-lg transition-colors"
              >
                Đăng Nhập
              </Link>
              <Link
                to="/dang-ky"
                className="bg-red-600 hover:bg-red-700 text-white font-semibold py-2 px-4 rounded-lg transition-colors"
              >
                Đăng Kí
              </Link>
            </div>
          </>)
        }
      </div>
    </header>
    <Modal
        title="Xác nhận đăng xuất"
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
        okText="Đăng xuất"
        cancelText="Hủy"
        centered
      >
        <p>Bạn có chắc chắn muốn đăng xuất khỏi tài khoản này?</p>
      </Modal>
    </>
    
  );
};
Navbar.PropTypes = {
  onSearch: PropTypes.func
}
export default Navbar;
