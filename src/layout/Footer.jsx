import React from 'react'

const Footer = () => {
  return (
    <footer className="bg-black text-gray-400 py-8">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="md:col-span-1">
            <h2 className="text-2xl font-bold text-white mb-4">
              <div className="text-2xl font-bold text-red-600">CODE METECH</div>
            </h2>
            <p className="text-sm">
              <span className="font-bold text-orange-500">CODE METECH</span> - Trang web xem phim trực tuyến miễn phí chất lượng cao với giao diện trực quan, tốc độ tải trang nhanh, cùng kho phim với hơn 69.669+ phim mới, phim hay, luôn cập nhật phim nhanh, hứa hẹn sẽ đem lại phút giây thư giãn cho bạn.
            </p>
          </div>

          <div>
            <h3 className="font-bold text-white uppercase mb-4">Danh mục</h3>
            <ul className="space-y-2">
              <li><a href="#" className="hover:text-white">Phim Mới</a></li>
              <li><a href="#" className="hover:text-white">Phim Chiếu Rạp</a></li>
              <li><a href="#" className="hover:text-white">Phim Bộ</a></li>
              <li><a href="#" className="hover:text-white">Phim Lẻ</a></li>
            </ul>
          </div>

          <div>
            <h3 className="font-bold text-white uppercase mb-4">Thể loại</h3>
            <ul className="space-y-2">
              <li><a href="#" className="hover:text-white">Phim Cổ Trang</a></li>
              <li><a href="#" className="hover:text-white">Phim Hành Động</a></li>
              <li><a href="#" className="hover:text-white">Phim Hoạt Hình</a></li>
              <li><a href="#" className="hover:text-white">Phim Viễn Tưởng</a></li>
            </ul>
          </div>

          <div>
            <h3 className="font-bold text-white uppercase mb-4">Điều khoản</h3>
            <ul className="space-y-2">
              <li><a href="#" className="hover:text-white">DMCA</a></li>
              <li><a href="#" className="hover:text-white">Liên Hệ</a></li>
              <li><a href="#" className="hover:text-white">Privacy</a></li>
              <li><a href="#" className="hover:text-white">Terms of Service</a></li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-4 flex justify-between items-center">
          <p className="text-sm">&copy; 2025 Codemete. All rights reserved.</p>
          <a href="#" className="bg-gray-800 p-2 rounded-sm hover:bg-gray-700">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 15l7-7 7 7" />
            </svg>
          </a>
        </div>
      </div>
    </footer>
  )
}

export default Footer