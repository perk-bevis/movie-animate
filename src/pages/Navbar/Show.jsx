import React, { useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { useData } from '../../pages/data/fakeListfilm';
const Show = ({ title }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const { currentBannerVideo: movieShow, loading } = useData(currentPage);
  const handlePageChange = (page) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };
  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen text-white text-2xl">
        Đang tải phim...
      </div>
    );
  }
  return (
    <div className="bg-[#181818] text-white">
      <div className="p-4 sm:p-8 ">
        <div className="max-w-screen-xl mx-auto">
          <div className="bg-[#212121] p-4 sm:p-6 rounded-lg mb-8 mt-24">
            <h1 className="text-2xl font-bold mb-4">Phim bộ</h1>

            <div className="flex flex-col md:flex-row flex-wrap gap-4 items-end">

              <div className="w-full sm:w-auto flex-grow">
                <label htmlFor="movie-type" className="text-sm text-gray-400 mb-1 block">Loại phim:</label>
                <select id="movie-type" className="w-full bg-gray-700 border border-gray-600 rounded-md px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-blue-500">
                  <option className="bg-gray-800">Phim Bộ</option>
                  <option className="bg-gray-800">Phim Lẻ</option>
                </select>
              </div>

              <div className="w-full sm:w-auto flex-grow">
                <label htmlFor="genre" className="text-sm text-gray-400 mb-1 block">Thể loại:</label>
                <select id="genre" className="w-full bg-gray-700 border border-gray-600 rounded-md px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-blue-500">
                  <option className="bg-gray-800">- Tất cả -</option>
                  <option className="bg-gray-800">Hành Động</option>
                  <option className="bg-gray-800">Tình Cảm</option>
                  <option className="bg-gray-800">Hài Hước</option>
                </select>
              </div>

              <div className="w-full sm:w-auto flex-grow">
                <label htmlFor="country" className="text-sm text-gray-400 mb-1 block">Quốc gia:</label>
                <select id="country" className="w-full bg-gray-700 border border-gray-600 rounded-md px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-blue-500">
                  <option className="bg-gray-800">- Tất cả -</option>
                  <option className="bg-gray-800">Hàn Quốc</option>
                  <option className="bg-gray-800">Trung Quốc</option>
                  <option className="bg-gray-800">Mỹ</option>
                </select>
              </div>

              <div className="w-full sm:w-auto flex-grow">
                <label htmlFor="year" className="text-sm text-gray-400 mb-1 block">Năm:</label>
                <select id="year" className="w-full bg-gray-700 border border-gray-600 rounded-md px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-blue-500">
                  <option className="bg-gray-800">- Tất cả -</option>
                  <option className="bg-gray-800">2024</option>
                  <option className="bg-gray-800">2023</option>
                  <option className="bg-gray-800">2022</option>
                </select>
              </div>


              <div className="w-full md:w-auto flex flex-col sm:flex-row items-end gap-4 mt-4 md:mt-0 md:ml-auto">
                <div className="w-full sm:w-auto">
                  <label htmlFor="sort-by" className="text-sm text-gray-400 mb-1 block">Sắp xếp:</label>
                  <select id="sort-by" className="w-full bg-gray-700 border border-gray-600 rounded-md px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-blue-500">
                    <option className="bg-gray-800">Ngày phát hành</option>
                    <option className="bg-gray-800">Ngày cập nhật</option>
                    <option className="bg-gray-800">Xem nhiều nhất</option>
                  </select>
                </div>
                <div className="flex items-center self-end h-[42px]">
                  <span className="text-sm text-gray-400 mr-2">Hiển thị:</span>
                  <div className="flex bg-gray-700 rounded-md p-1 gap-1">
                    <button className="p-1.5 rounded text-gray-400 hover:text-white hover:bg-gray-600">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clipRule="evenodd" />
                      </svg>
                    </button>
                    <button className="p-1.5 rounded text-white bg-blue-600">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                        <path d="M5 3a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2V5a2 2 0 00-2-2H5zM5 11a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2v-2a2 2 0 00-2-2H5zM11 5a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V5zM11 13a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
                      </svg>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>


          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-x-4 gap-y-8">
            {movieShow?.map((show) =>  (
                <div  key={show._id} className="group cursor-pointer">
                  <Link to={`/phim/${show.slug}/${show._id}`}>
                  <div className="overflow-hidden rounded-lg">
                    <img  src={`${import.meta.env.VITE_IMG_URL}${show.poster_url}`}
                    alt={`Poster phim ${show.name}`}
                    className="w-full h-auto object-cover rounded-lg transform transition-transform duration-300 ease-in-out group-hover:scale-105" 
                    />
                  </div>
                  <div className="mt-2">
                    <h3 className="text-white text-base font-semibold truncate">{show.name}</h3>
                    <p className="text-gray-400 text-sm truncate">{show.origin_name}</p>
                  </div>
                  </Link>
                </div>
              )
            )}
          </div>
          <div className="mt-8 flex flex-col sm:flex-row justify-center sm:justify-between items-center text-sm text-gray-300">

            <div className="flex items-center space-x-2 mb-4 sm:mb-0">
              <a href="#" className="px-3 py-1 rounded-md border border-gray-600 hover:bg-gray-700">1</a>
              <a href="#" className="px-3 py-1 rounded-md bg-blue-600 text-white border border-blue-600">2</a>
              <a href="#" className="px-3 py-1 rounded-md border border-gray-600 hover:bg-gray-700">3</a>
              <a href="#" className="px-3 py-1 rounded-md border border-gray-600 hover:bg-gray-700">4</a>
              <span className="px-1 text-gray-500">...</span>
              <a href="#" className="px-3 py-1 rounded-md border border-gray-600 hover:bg-gray-700">388</a>
              <a href="#" className="px-3 py-1 rounded-md border border-gray-600 hover:bg-gray-700">389</a>
            </div>

            <div className="flex items-center space-x-2">
              <a href="#" className="px-4 py-2 rounded-md border border-gray-600 hover:bg-gray-700">Trang trước</a>
              <a href="#" className="px-4 py-2 rounded-md border border-gray-600 hover:bg-gray-700">Trang kế</a>
            </div>

          </div>
        </div>
      </div>
    </div>
  )
}

export default Show