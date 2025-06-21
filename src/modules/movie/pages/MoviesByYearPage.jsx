import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import Navbar from "../../../layout/Navbar";
import { Footer } from "antd/es/layout/layout";

const MoviesByYearPage = () => {
  const { year } = useParams();
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    const fetchMoviesByYear = async () => {
      setLoading(true);
      setError(null);

      try {
        // API để lấy phim theo năm (thay đổi endpoint theo API thực tế)
        const response = await fetch(`https://phimapi.com/v1/api/danh-sach/phim-le?year=${year}&page=${currentPage}`);
        console.log(response)
        
        if (!response.ok) {
          throw new Error("Không thể tải danh sách phim");
        }

        const data = await response.json();
        setMovies(data.data?.items || []);
      } catch (err) {
        setError(err.message);
        console.error("Lỗi khi fetch phim theo năm:", err);
      } finally {
        setLoading(false);
      }
    };

    if (year) {
      fetchMoviesByYear();
    }
  }, [year, currentPage]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-900">
        <Navbar />
        <div className="flex items-center justify-center pt-20">
          <div className="text-white text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-red-600 mx-auto mb-4"></div>
            <p>Đang tải phim năm {year}...</p>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-900">
        <Navbar />
        <div className="flex items-center justify-center pt-20">
          <div className="text-red-500 text-center">
            <h2 className="text-xl font-bold mb-2">Có lỗi xảy ra!</h2>
            <p>{error}</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-900">
      <Navbar />
      <div className="container mx-auto px-4 py-20 md:pt-28 ">
        <div className="mb-8">
          <nav className="text-sm text-gray-400 mb-4">
            <Link to="/" className="hover:text-white">CodeMetech</Link>
            <span className="mx-2">&gt;</span>
            <span className="text-white">Phim năm {year}</span>
          </nav>
          
          <h1 className="text-3xl font-bold text-white mb-2">
            Phim năm {year}
          </h1>
          <p className="text-gray-400">
            Tìm thấy {movies.length} bộ phim được phát hành năm {year}
          </p>
        </div>

        {movies.length === 0 ? (
          <div className="text-center text-gray-400 py-12">
            <p className="text-xl mb-4">Không tìm thấy phim nào cho năm {year}</p>
            <Link 
              to="/" 
              className="bg-red-600 text-white px-6 py-2 rounded hover:bg-red-700 transition-colors"
            >
              Về trang chủ
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
            {movies.map((movie) => (
              <Link
                key={movie._id}
                to={`/phim/${movie.slug}`}
                className="group block bg-gray-800 rounded-lg overflow-hidden hover:scale-105 transition-transform duration-200"
              >
                <div className="relative">
                  <img
                    src={`https://img.phimapi.com/${movie.thumb_url}`}
                    alt={movie.name}
                    className="w-full h-64 object-cover"
                  />
                  <div className="absolute top-2 right-2 bg-red-600 text-white text-xs px-2 py-1 rounded">
                    {movie.year}
                  </div>
                  {movie.episode_current && (
                    <div className="absolute bottom-2 left-2 bg-black bg-opacity-70 text-white text-xs px-2 py-1 rounded">
                      {movie.episode_current}
                    </div>
                  )}
                </div>
                <div className="p-3">
                  <h3 className="text-white font-semibold text-sm mb-1 line-clamp-2 group-hover:text-red-500 transition-colors">
                    {movie.name}
                  </h3>
                  <p className="text-gray-400 text-xs">
                    {movie.origin_name}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        )}

        {/* Pagination */}
        {movies.length > 0 && (
          <div className="flex justify-center mt-8">
            <div className="flex space-x-2">
              <button
                onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                disabled={currentPage === 1}
                className="px-4 py-2 bg-gray-700 text-white rounded hover:bg-gray-600 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Trước
              </button>
              <span className="px-4 py-2 bg-red-600 text-white rounded">
                {currentPage}
              </span>
              <button
                onClick={() => setCurrentPage(prev => prev + 1)}
                className="px-4 py-2 bg-gray-700 text-white rounded hover:bg-gray-600"
              >
                Sau
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default MoviesByYearPage;
