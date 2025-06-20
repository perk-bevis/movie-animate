// Cài đặt axios trước bằng lệnh: npm install axios
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

// Component Loading, không thay đổi
const LoadingSpinner = () => (
  <div className="min-h-screen bg-gray-900 flex items-center justify-center">
    <div className="text-white text-center">
      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-red-600 mx-auto mb-4"></div>
      <p>Đang tải...</p>
    </div>
  </div>
);
const Single = () => {
  const [filters, setFilters] = useState({
    type: "phim-le",
    category: "",
    country: "",
    year: "",
    sort_field: "modified.time",
  });

  const [title, setTitle] = useState("");
  const [movies, setMovies] = useState([]);
  const [genres, setGenres] = useState([]);
  const [countries, setCountries] = useState([]);
  const [pagination, setPagination] = useState({});
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(true);
  
  // BƯỚC 1: Thêm state để quản lý chế độ xem (grid/list)
  const [view, setView] = useState("grid"); // Mặc định là 'grid'

  useEffect(() => {
    const fetchFilterData = async () => {
      try {
        const [genresRes, countriesRes] = await Promise.all([
          axios.get("https://phimapi.com/the-loai"),
          axios.get("https://phimapi.com/quoc-gia"),
        ]);
        setGenres(genresRes.data);
        setCountries(countriesRes.data);
      } catch (error) {
        console.error("Lỗi khi tải dữ liệu cho bộ lọc:", error);
      }
    };
    fetchFilterData();
  }, []);

  useEffect(() => {
    const fetchMovies = async () => {
      setLoading(true);
      try {
        const API_BASE_URL = "https://phimapi.com/v1/api/danh-sach/";
        let apiUrl = `${API_BASE_URL}${filters.type}`;

        const params = new URLSearchParams({
          page: currentPage,
          sort_field: filters.sort_field,
          limit: 20,
        });

        if (filters.category) params.append("category", filters.category);
        if (filters.country) params.append("country", filters.country);
        if (filters.year) params.append("year", filters.year);
        
        apiUrl = `${apiUrl}?${params.toString()}`;

        const response = await axios.get(apiUrl);

        setMovies(response.data.data.items);
        setPagination(response.data.data.params.pagination);
        setTitle(response.data.data.titlePage);

      } catch (error) {
        console.error("Lỗi khi tải danh sách phim:", error);
        setMovies([]);
      } finally {
        setLoading(false);
        window.scrollTo({ top: 0, behavior: "smooth" });
      }
    };

    fetchMovies();
  }, [filters, currentPage])

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters(prevFilters => ({
      ...prevFilters,
      [name]: value,
    }));
    setCurrentPage(1); 
  };

  const handlePageChange = (page) => {
    if (page >= 1 && page <= pagination.totalPages) {
      setCurrentPage(page);
    }
  };

  if (loading && movies.length === 0) {
    return <LoadingSpinner />;
  }

  return (
    <div className="bg-[#181818] text-white">
      <div className="p-4 sm:p-8 ">
        <div className="max-w-screen-xl mx-auto">
          <div className="bg-[#212121] p-4 sm:p-6 rounded-lg mb-8 mt-24">
            <h1 className="text-2xl font-bold mb-4">{title}</h1>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 items-end">
              {/* Loại phim */}
              <div className="w-full">
                <label htmlFor="type" className="text-sm text-gray-400 mb-1 block">Loại phim:</label>
                <select name="type" id="type" value={filters.type} onChange={handleFilterChange} className="w-full bg-gray-700 border border-gray-600 rounded-md px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-blue-500">
                  <option value="phim-bo" className="bg-gray-800">Phim Bộ</option>
                  <option value="phim-le" className="bg-gray-800">Phim Lẻ</option>
                  <option value="hoat-hinh" className="bg-gray-800">Hoạt Hình</option>
                  <option value="tv-shows" className="bg-gray-800">TV Shows</option>
                </select>
              </div>

              {/* Thể loại */}
              <div className="w-full">
                <label htmlFor="category" className="text-sm text-gray-400 mb-1 block">Thể loại:</label>
                <select name="category" id="category" value={filters.category} onChange={handleFilterChange} className="w-full bg-gray-700 border border-gray-600 rounded-md px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-blue-500">
                  <option value="" className="bg-gray-800">- Tất cả -</option>
                  {genres.map((genre) => (
                    <option key={genre._id} value={genre.slug} className="bg-gray-800">{genre.name}</option>
                  ))}
                </select>
              </div>

              {/* Quốc gia */}
              <div className="w-full">
                <label htmlFor="country" className="text-sm text-gray-400 mb-1 block">Quốc gia:</label>
                <select name="country" id="country" value={filters.country} onChange={handleFilterChange} className="w-full bg-gray-700 border border-gray-600 rounded-md px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-blue-500">
                  <option value="" className="bg-gray-800">- Tất cả -</option>
                  {countries.map((country) => (
                    <option key={country._id} value={country.slug} className="bg-gray-800">{country.name}</option>
                  ))}
                </select>
              </div>

              {/* Năm */}
              <div className="w-full">
                <label htmlFor="year" className="text-sm text-gray-400 mb-1 block">Năm:</label>
                <select name="year" id="year" value={filters.year} onChange={handleFilterChange} className="w-full bg-gray-700 border border-gray-600 rounded-md px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-blue-500">
                  <option value="" className="bg-gray-800">- Tất cả -</option>
                  {Array.from({ length: new Date().getFullYear() - 1989 }, (_, i) => new Date().getFullYear() - i).map(year => (
                    <option key={year} value={year} className="bg-gray-800">{year}</option>
                  ))}
                </select>
              </div>

              {/* Sắp xếp */}
              <div className="w-full">
                <label htmlFor="sort_field" className="text-sm text-gray-400 mb-1 block">Sắp xếp:</label>
                <select name="sort_field" id="sort_field" value={filters.sort_field} onChange={handleFilterChange} className="w-full bg-gray-700 border border-gray-600 rounded-md px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-blue-500">
                  <option value="modified.time" className="bg-gray-800">Mới cập nhật</option>
                  <option value="year" className="bg-gray-800">Năm sản xuất</option>
                  <option value="_id" className="bg-gray-800">Mới đăng</option>
                </select>
              </div>

              {/* BƯỚC 2: Gắn sự kiện onClick và cập nhật class cho nút Hiển thị */}
              <div className="flex items-center self-end h-[42px] justify-self-end">
                <span className="text-sm text-gray-400 mr-2">Hiển thị:</span>
                <div className="flex bg-gray-700 rounded-md p-1 gap-1">
                  {/* Nút hiển thị dạng List */}
                  <button 
                    onClick={() => setView('list')}
                    className={`p-1.5 rounded ${view === 'list' ? 'text-white bg-blue-600' : 'text-gray-400 hover:text-white hover:bg-gray-600'}`}
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clipRule="evenodd" />
                    </svg>
                  </button>
                  {/* Nút hiển thị dạng Grid (mặc định) */}
                  <button 
                    onClick={() => setView('grid')}
                    className={`p-1.5 rounded ${view === 'grid' ? 'text-white bg-blue-600' : 'text-gray-400 hover:text-white hover:bg-gray-600'}`}
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                      <path d="M5 3a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2V5a2 2 0 00-2-2H5zM5 11a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2v-2a2 2 0 00-2-2H5zM11 5a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V5zM11 13a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          </div>
          {loading ? (
             <LoadingSpinner />
          ) : movies && movies.length > 0 ? (
            // BƯỚC 3: Thay đổi class của container cha dựa trên state `view`
            <div className={
              view === 'grid' 
              ? "grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-x-4 gap-y-8" 
              : "flex flex-col gap-5" // Class cho chế độ list
            }>
              {movies.map((movie) => (
                // BƯỚC 3.1: Thay đổi cấu trúc và class của từng movie item
                view === 'grid' ? (
                  // Giao diện Grid (như cũ)
                  <div key={movie._id} className="group cursor-pointer">
                    <Link to={`/phim/${movie.slug}/${movie._id}`}>
                      <div className="relative overflow-hidden rounded-lg">
                        <img
                          src={`https://img.phimapi.com/${movie.poster_url}`} 
                          alt={`Poster phim ${movie.name}`}
                          className="w-full h-[320px] sm:h-[400px] object-cover rounded-lg transform transition-transform duration-300 ease-in-out group-hover:scale-105"
                        />
                         <div className="absolute top-2 left-2 bg-black bg-opacity-70 text-white text-xs px-2 py-1 rounded">
                           {movie.episode_current}
                         </div>
                      </div>
                      <div className="mt-2">
                        <h3 className="text-white text-base font-semibold truncate group-hover:text-blue-400">{movie.name}</h3>
                        <p className="text-gray-400 text-sm truncate">{movie.origin_name}</p>
                      </div>
                    </Link>
                  </div>
                ) : (
                  // Giao diện List (mới)
                  <div key={movie._id} className="group cursor-pointer">
                     <Link to={`/phim/${movie.slug}/${movie._id}`} className="flex gap-4 p-3 bg-[#212121] rounded-lg hover:bg-gray-800 transition-colors duration-300">
                        <div className="w-1/4 sm:w-[120px] flex-shrink-0">
                          <img
                            src={`https://img.phimapi.com/${movie.thumb_url}`}
                            alt={`Poster phim ${movie.name}`}
                            className="w-full h-full object-cover rounded-md"
                          />
                        </div>
                        <div className="w-3/4 sm:w-auto flex flex-col justify-between">
                            <div>
                                <h3 className="text-white text-lg font-bold group-hover:text-blue-400">{movie.name}</h3>
                                <p className="text-gray-400 text-sm mb-2">{movie.origin_name}</p>
                                <p className="text-gray-300 text-xs hidden md:block">
                                    <span className="font-semibold">Thời lượng:</span> {movie.time}
                                </p>
                                 <p className="text-gray-300 text-xs hidden md:block">
                                    <span className="font-semibold">Tập:</span> {movie.episode_current}
                                </p>
                            </div>
                            <div className="text-xs text-gray-400 mt-auto pt-2">
                               Năm: {movie.year}
                            </div>
                        </div>
                     </Link>
                  </div>
                )
              ))} 
            </div>
          ) : (
            <div className="text-center py-16">
              <p className="text-gray-400 text-lg">Không tìm thấy phim phù hợp.</p>
            </div>
          )}
          {pagination.totalPages > 1 && (
             <div className="mt-8 flex flex-col sm:flex-row justify-center sm:justify-between items-center text-sm text-gray-300">
               <div className="flex items-center space-x-2 mb-4 sm:mb-0">
                 <button onClick={() => handlePageChange(currentPage - 1)} disabled={currentPage === 1} className="px-4 py-2 rounded-md border border-gray-600 hover:bg-gray-700 disabled:opacity-50 disabled:cursor-not-allowed">Trang trước</button>
                 <button onClick={() => handlePageChange(currentPage + 1)} disabled={currentPage === pagination.totalPages} className="px-4 py-2 rounded-md border border-gray-600 hover:bg-gray-700 disabled:opacity-50 disabled:cursor-not-allowed">Trang kế</button>
               </div>
               <div className="hidden sm:block">
                 Trang {pagination.currentPage}/{pagination.totalPages}
               </div>
             </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Single;