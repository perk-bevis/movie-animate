import React, { useState } from 'react'; // Bỏ useEffect vì không cần nữa
import { Link, useParams } from 'react-router-dom';

// ====> FIX 1: THÊM 2 DÒNG IMPORT QUAN TRỌNG <====
import { useData } from '../../pages/data/fakeListfilm'; 
import Pagination from '../../components/ui/Pagination';

const Series = () => {
  const { slug } = useParams();

  // 2. Tạo state cho việc phân trang, giống như trong App.js
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = 60; // Hoặc một giá trị bạn lấy từ API sau này

  // 3. Gọi hook useData để lấy dữ liệu PHIM BỘ và trạng thái LOADING
  // Chúng ta chỉ cần `movieSeries` và `loading` từ hook này
  const { movieSeries, loading } = useData(currentPage);

  const handlePageChange = (page) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // 4. Xử lý trạng thái đang tải (loading)
  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen text-white text-2xl">
        Đang tải phim...
      </div>
    );
  }

  return (
    <div class="bg-[#181818] text-white">
      <div class="p-4 sm:p-8 ">
        <div class="max-w-screen-xl mx-auto">
          <div class="bg-[#212121] p-4 sm:p-6 rounded-lg mb-8 mt-24">
            <h1 class="text-2xl font-bold mb-4">Phim bộ</h1>

            <div class="flex flex-col md:flex-row flex-wrap gap-4 items-end">

              <div class="w-full sm:w-auto flex-grow">
                <label for="movie-type" class="text-sm text-gray-400 mb-1 block">Loại phim:</label>
                <select id="movie-type" class="w-full bg-gray-700 border border-gray-600 rounded-md px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-blue-500">
                  <option class="bg-gray-800">Phim Bộ</option>
                  <option class="bg-gray-800">Phim Lẻ</option>
                </select>
              </div>

              <div class="w-full sm:w-auto flex-grow">
                <label for="genre" class="text-sm text-gray-400 mb-1 block">Thể loại:</label>
                <select id="genre" class="w-full bg-gray-700 border border-gray-600 rounded-md px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-blue-500">
                  <option class="bg-gray-800">- Tất cả -</option>
                  <option class="bg-gray-800">Hành Động</option>
                  <option class="bg-gray-800">Tình Cảm</option>
                  <option class="bg-gray-800">Hài Hước</option>
                </select>
              </div>

              <div class="w-full sm:w-auto flex-grow">
                <label for="country" class="text-sm text-gray-400 mb-1 block">Quốc gia:</label>
                <select id="country" class="w-full bg-gray-700 border border-gray-600 rounded-md px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-blue-500">
                  <option class="bg-gray-800">- Tất cả -</option>
                  <option class="bg-gray-800">Hàn Quốc</option>
                  <option class="bg-gray-800">Trung Quốc</option>
                  <option class="bg-gray-800">Mỹ</option>
                </select>
              </div>

              <div class="w-full sm:w-auto flex-grow">
                <label for="year" class="text-sm text-gray-400 mb-1 block">Năm:</label>
                <select id="year" class="w-full bg-gray-700 border border-gray-600 rounded-md px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-blue-500">
                  <option class="bg-gray-800">- Tất cả -</option>
                  <option class="bg-gray-800">2024</option>
                  <option class="bg-gray-800">2023</option>
                  <option class="bg-gray-800">2022</option>
                </select>
              </div>


              <div class="w-full md:w-auto flex flex-col sm:flex-row items-end gap-4 mt-4 md:mt-0 md:ml-auto">
                <div class="w-full sm:w-auto">
                  <label for="sort-by" class="text-sm text-gray-400 mb-1 block">Sắp xếp:</label>
                  <select id="sort-by" class="w-full bg-gray-700 border border-gray-600 rounded-md px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-blue-500">
                    <option class="bg-gray-800">Ngày phát hành</option>
                    <option class="bg-gray-800">Ngày cập nhật</option>
                    <option class="bg-gray-800">Xem nhiều nhất</option>
                  </select>
                </div>
                <div class="flex items-center self-end h-[42px]">
                  <span class="text-sm text-gray-400 mr-2">Hiển thị:</span>
                  <div class="flex bg-gray-700 rounded-md p-1 gap-1">
                    <button class="p-1.5 rounded text-gray-400 hover:text-white hover:bg-gray-600">
                      <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                        <path fill-rule="evenodd" d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clip-rule="evenodd" />
                      </svg>
                    </button>
                    <button class="p-1.5 rounded text-white bg-blue-600">
                      <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                        <path d="M5 3a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2V5a2 2 0 00-2-2H5zM5 11a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2v-2a2 2 0 00-2-2H5zM11 5a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V5zM11 13a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
                      </svg>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>


          <div class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-x-4 gap-y-8">
            {movieSeries.map((movie) => (
              <div key={movie._id} className="group cursor-pointer ">
                  <Link to={`/phim/${movie.slug}`}> {/* Thêm Link nếu cần */}
                  <div className="overflow-hidden rounded-lg">
                    <img 
                      // src={movie.poster_url}
                      src={`${import.meta.env.VITE_IMG_URL}${movie.poster_url}`}
                      alt={`Poster phim ${movie.name}`} 
                      className="w-full h-[418px] object-cover rounded-lg transform transition-transform duration-300 ease-in-out group-hover:scale-105" 
                    />
                  </div>
                  <div className="mt-2">
                    <h3 className="text-white text-base font-semibold truncate">{movie.name}</h3>
                    <p className="text-gray-400 text-sm truncate">{movie.origin_name}</p>
                  </div>
                </Link>
              </div>
            ))}
          </div>
           <div class="mt-8 flex flex-col sm:flex-row justify-center sm:justify-between items-center text-sm text-gray-300">
            
            <div class="flex items-center space-x-2 mb-4 sm:mb-0">
                <a href="#" class="px-3 py-1 rounded-md border border-gray-600 hover:bg-gray-700">1</a>
                <a href="#" class="px-3 py-1 rounded-md bg-blue-600 text-white border border-blue-600">2</a>
                <a href="#" class="px-3 py-1 rounded-md border border-gray-600 hover:bg-gray-700">3</a>
                <a href="#" class="px-3 py-1 rounded-md border border-gray-600 hover:bg-gray-700">4</a>
                <span class="px-1 text-gray-500">...</span>
                <a href="#" class="px-3 py-1 rounded-md border border-gray-600 hover:bg-gray-700">388</a>
                <a href="#" class="px-3 py-1 rounded-md border border-gray-600 hover:bg-gray-700">389</a>
            </div>

            <div class="flex items-center space-x-2">
                <a href="#" class="px-4 py-2 rounded-md border border-gray-600 hover:bg-gray-700">Trang trước</a>
                <a href="#" class="px-4 py-2 rounded-md border border-gray-600 hover:bg-gray-700">Trang kế</a>
            </div>

        </div>
        </div>
      </div>
    </div>
  )
}

export default Series;



