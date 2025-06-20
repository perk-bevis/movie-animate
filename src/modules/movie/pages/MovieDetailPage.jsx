import React, { useEffect, useState } from "react";
import Navbar from "../../../layout/Navbar";
import { Link, useNavigate, useParams } from "react-router-dom";

const MovieDetailPage = () => {
  const { slug } = useParams();
  const [movieDetails, setMovieDetails] = useState(null);
  console.log(movieDetails)
  const [episodes, setEpisodes] = useState([]);
  const [years, setYears] = useState([]);
  const [trendingMovies, setTrendingMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeTab, setActiveTab] = useState('info');
  const [trendingPeriod, setTrendingPeriod] = useState('day');

  const [selectedYear, setSelectedYear] = useState(movieDetails?.year || new Date().getFullYear());
  const navigate = useNavigate();

  const handleYearClick = (year) => {
    setSelectedYear(year);
    navigate(`/nam/${year}`);
  };

  // Function để handle tab click
  const handleTabClick = (tabName) => {
    setActiveTab(tabName);
  };

  // Function để handle trending period click
  const handleTrendingPeriodClick = (period) => {
    setTrendingPeriod(period);
  };

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError(null);

      try {
        // Fetch movie details
        if (slug) {
          const movieResponse = await fetch(`https://phimapi.com/phim/${slug}`);
          if (!movieResponse.ok) {
            throw new Error("Không thể tải dữ liệu phim.");
          }
          const movieData = await movieResponse.json();
          console.log("Movie data:", movieData);
          setMovieDetails(movieData.movie);

          if (movieData.episodes && movieData.episodes[0] && movieData.episodes[0].server_data) {
            setEpisodes(movieData.episodes[0].server_data);
          }

          // Tạo trending movies từ movieDetails thay vì gọi API riêng
          if (movieData.movie) {
            // Tạo danh sách phim liên quan/trending từ thông tin category của phim hiện tại
            const categories = movieData.movie.category || [];
            const trendingMoviesFromCurrent = Array.from({ length: 6 }, (_, index) => {
              const randomCategory = categories[Math.floor(Math.random() * categories.length)];
              return {
                name: `${randomCategory?.name || 'Phim'} ${index + 1}`,
                slug: `${movieData.movie.slug}-related-${index + 1}`,
                year: movieData.movie.year,
                viewCount: Math.floor(Math.random() * 500000) + 50000,
                rank: index + 1
              };
            });

            // Đặt phim hiện tại ở vị trí đầu tiên
            trendingMoviesFromCurrent[0] = {
              name: movieData.movie.name,
              slug: movieData.movie.slug,
              year: movieData.movie.year,
              viewCount: Math.floor(Math.random() * 500000) + 50000,
              rank: 1
            };

            setTrendingMovies(trendingMoviesFromCurrent);
          }
        }

        // Fetch years
        try {
          const yearsResponse = await fetch('https://phimapi.com/v1/api/nam/');
          if (yearsResponse.ok) {
            const yearsData = await yearsResponse.json();
            setYears(yearsData.years || []);
          } else {
            throw new Error('API không khả dụng');
          }
        } catch (yearError) {
          console.error('Lỗi khi lấy danh sách năm:', yearError);
          const currentYear = new Date().getFullYear();
          const yearList = [];
          for (let year = currentYear; year >= 2015; year--) {
            yearList.push(year);
          }
          setYears(yearList);
        }
      } catch (err) {
        setError(err.message);
        console.error("Lỗi khi fetch dữ liệu:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [slug]);

  // Function để format số view
  const formatViewCount = (count) => {
    if (count >= 1000000) {
      return (count / 1000000).toFixed(1) + 'M';
    } else if (count >= 1000) {
      return (count / 1000).toFixed(1) + 'K';
    }
    return count.toString();
  };

  // Function để render nội dung tab
  const renderTabContent = () => {
    switch (activeTab) {
      case 'info':
        return (
          <div>
            <h3 className="text-xl font-semibold mb-2">
              Nội Dung Phim
            </h3>
            <h4 className="text-lg font-semibold text-red-500 mb-2">
              {movieDetails.name}
            </h4>
            <p className="text-gray-300 text-sm leading-relaxed mb-4">
              {movieDetails.content || "Nội dung phim đang được cập nhật..."}
            </p>

            {movieDetails.category && movieDetails.category.length > 0 && (
              <div className="mb-4">
                <span className="font-semibold mr-2">Tags:</span>
                {movieDetails.category.map((cat, index) => (
                  <span
                    key={index}
                    className="bg-gray-700 text-gray-300 px-2 py-1 text-xs rounded hover:bg-gray-600 mr-1 mb-1 inline-block cursor-pointer"
                  >
                    {cat.name}
                  </span>
                ))}
              </div>
            )}

            <div className="flex items-center space-x-4">
              <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md text-sm flex items-center transition-colors">
                <i className="fas fa-thumbs-up mr-2"></i> Thích 0
              </button>
              <button className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-md text-sm flex items-center transition-colors">
                <i className="fas fa-share mr-2"></i> Chia sẻ
              </button>
            </div>
          </div>
        );

      case 'cast':
        return (
          <div>
            <h3 className="text-xl font-semibold mb-4">
              Diễn Viên
            </h3>
            {movieDetails.actor && movieDetails.actor.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {movieDetails.actor.map((actor, index) => (
                  <div key={index} className="flex items-center space-x-3 p-3 bg-gray-700 rounded-lg">
                    <div className="w-12 h-12 bg-gray-600 rounded-full flex items-center justify-center">
                      <i className="fas fa-user text-gray-400"></i>
                    </div>
                    <div>
                      <p className="font-semibold text-white">{actor}</p>
                      <p className="text-sm text-gray-400">Diễn viên</p>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-8">
                <i className="fas fa-users text-gray-500 text-4xl mb-4"></i>
                <p className="text-gray-400">Thông tin diễn viên đang được cập nhật...</p>
              </div>
            )}

            {movieDetails.director && movieDetails.director.length > 0 && (
              <div className="mt-6">
                <h4 className="text-lg font-semibold mb-3 text-red-500">Đạo Diễn</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {movieDetails.director.map((director, index) => (
                    <div key={index} className="flex items-center space-x-3 p-3 bg-gray-700 rounded-lg">
                      <div className="w-12 h-12 bg-gray-600 rounded-full flex items-center justify-center">
                        <i className="fas fa-film text-gray-400"></i>
                      </div>
                      <div>
                        <p className="font-semibold text-white">{director}</p>
                        <p className="text-sm text-gray-400">Đạo diễn</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        );

      case 'trailer':
        return (
          <div>
            <h3 className="text-xl font-semibold mb-4">
              Trailer
            </h3>
            {movieDetails.trailer_url ? (
              <div className="aspect-video bg-black rounded-lg overflow-hidden">
                <iframe
                  src={movieDetails.trailer_url}
                  title="Movie Trailer"
                  className="w-full h-full"
                  allowFullScreen
                ></iframe>
              </div>
            ) : (
              <div className="aspect-video bg-gray-700 rounded-lg flex items-center justify-center">
                <div className="text-center">
                  <i className="fas fa-play-circle text-gray-500 text-6xl mb-4"></i>
                  <p className="text-gray-400">Trailer chưa có sẵn</p>
                  <p className="text-sm text-gray-500 mt-2">
                    Trailer sẽ được cập nhật khi có thông tin mới
                  </p>
                </div>
              </div>
            )}
          </div>
        );

      default:
        return null;
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center">
        <div className="text-white text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-red-600 mx-auto mb-4"></div>
          <p>Đang tải...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center">
        <div className="text-red-500 text-center p-10">
          <h2 className="text-xl font-bold mb-2">Có lỗi xảy ra!</h2>
          <p>Lỗi: {error}</p>
          <button
            onClick={() => window.location.reload()}
            className="mt-4 bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
          >
            Thử lại
          </button>
        </div>
      </div>
    );
  }

  if (!movieDetails) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center">
        <div className="text-white text-center p-10">
          <h2 className="text-xl font-bold mb-2">Không tìm thấy phim</h2>
          <p>Không tìm thấy thông tin phim với slug: {slug}</p>
          <Link
            to="/"
            className="mt-4 inline-block bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
          >
            Về trang chủ
          </Link>
        </div>
      </div>
    );
  }

  const latestReversedEpisodes = episodes.slice(-3).reverse();

  return (
    <>
      <Navbar />
      <div className="bg-gray-900 text-gray-200 font-sans">
        <nav className="bg-gray-800 p-4 text-sm">
          <div className="container mx-auto flex items-center text-gray-400">
            <Link to="/" className="hover:text-white">
              Cod Metech
            </Link>
            <span className="mx-2">&gt;</span>
            <span className="hover:text-white">
              {movieDetails.country?.map((c) => c.name).join(", ") || "Phim"}
            </span>
            <span className="mx-2">&gt;</span>
            <span className="text-white">{movieDetails.name}</span>
          </div>
        </nav>

        <div className="container mx-auto p-4">
          <div className="flex flex-col lg:flex-row gap-6">
            <div className="lg:w-3/4">
              <div className="relative bg-gray-800 rounded-lg shadow-xl p-6 md:p-10 min-h-[400px] md:min-h-[500px] flex items-end">
                <div
                  className="absolute inset-0 bg-cover bg-center rounded-lg"
                  style={{
                    backgroundImage: `url(${movieDetails.thumb_url})`,
                    filter: 'blur(10px) brightness(0.3)'
                  }}
                ></div>
                <div className="relative z-10 flex flex-col md:flex-row gap-6 w-full">
                  <div className="w-full md:w-1/3 lg:w-1/4 flex-shrink-0">
                    <img
                      src={movieDetails.thumb_url}
                      alt={movieDetails.name}
                      className="rounded-lg w-full shadow-lg"
                    />
                  </div>
                  <div className="text-white flex-1">
                    <h1 className="text-3xl md:text-4xl font-bold mb-2">
                      {movieDetails.name}
                    </h1>
                    <p className="text-lg text-gray-300 mb-1">
                      {movieDetails.origin_name} ({movieDetails.year})
                    </p>
                    <p className="text-sm text-gray-400 mb-3">
                      {movieDetails.created?.time || "Ngày phát hành"}
                    </p>

                    {movieDetails.episode_current && (
                      <div className="bg-red-600 text-white px-3 py-1 inline-block rounded-md text-sm mb-4">
                        {movieDetails.episode_current}
                      </div>
                    )}

                    <p className="text-sm text-gray-300 mb-1">
                      <span className="font-semibold">
                        {movieDetails.year} - {movieDetails.country?.map((c) => c.name).join(", ")}
                      </span>
                    </p>

                    <div className="mb-2 text-sm">
                      <span className="font-semibold">Thể Loại: </span>
                      {movieDetails.category?.map((c) => c.name).join(", ") || "Chưa cập nhật"}
                    </div>

                    <p className="text-sm text-gray-300 mb-3">
                      Tổng số tập: <span className="font-semibold">{movieDetails.episode_total || "Chưa rõ"}</span>
                    </p>

                    <div className="flex items-center mb-4">
                      <div className="flex text-yellow-400">
                        {[...Array(5)].map((_, i) => (
                          <i key={i} className={`fas ${i < 4 ? 'fa-star' : 'fa-star-half-alt'}`}></i>
                        ))}
                      </div>
                      <span className="ml-2 text-gray-300">
                        ({movieDetails.tmdb?.vote_average || "8.0"} điểm / {movieDetails.tmdb?.vote_count || "1"} lượt)
                      </span>
                    </div>

                    <div className="flex space-x-3">
                      <Link
                        to={`/watchingtv/${slug}/tap-1`}
                        className="bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-6 rounded-lg flex items-center transition-colors"
                      >
                        <i className="fas fa-play mr-2"></i> Xem Phim
                      </Link>
                      <button className="bg-gray-700 hover:bg-gray-600 text-white font-bold py-2 px-6 rounded-lg flex items-center transition-colors">
                        <i className="fas fa-plus mr-2"></i> Follow
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              {episodes.length > 0 && (
                <div className="bg-gray-800 p-4 mt-6 rounded-lg shadow flex flex-wrap">
                  <span className="font-semibold mr-3 mb-2">Tập mới nhất:</span>
                  {latestReversedEpisodes.map((episode, index) => (
                    <Link
                      key={episode.slug || index}
                      to={`/watchingtv/${slug}/tap-${episode.name}`}
                      className="px-3 py-1 mr-2 mb-2 text-gray-300 hover:bg-gray-700 rounded transition-colors"
                    >
                      {episode.name}
                    </Link>
                  ))}
                </div>
              )}

              <div className="bg-gray-800 mt-6 rounded-lg shadow">
                <div className="border-b border-gray-700">
                  <nav className="flex space-x-1" aria-label="Tabs">
                    <button
                      onClick={() => handleTabClick('info')}
                      className={`px-4 py-3 font-medium text-sm focus:outline-none transition-colors ${activeTab === 'info'
                          ? 'bg-red-600 text-white border-b-2 border-red-600'
                          : 'text-gray-400 hover:text-gray-300 hover:border-gray-500'
                        }`}
                    >
                      THÔNG TIN PHIM
                    </button>
                    <button
                      onClick={() => handleTabClick('cast')}
                      className={`px-4 py-3 font-medium text-sm focus:outline-none transition-colors ${activeTab === 'cast'
                          ? 'bg-red-600 text-white border-b-2 border-red-600'
                          : 'text-gray-400 hover:text-gray-300 hover:border-gray-500'
                        }`}
                    >
                      DIỄN VIÊN
                    </button>
                    <button
                      onClick={() => handleTabClick('trailer')}
                      className={`px-4 py-3 font-medium text-sm focus:outline-none transition-colors ${activeTab === 'trailer'
                          ? 'bg-red-600 text-white border-b-2 border-red-600'
                          : 'text-gray-400 hover:text-gray-300 hover:border-gray-500'
                        }`}
                    >
                      TRAILER
                    </button>
                  </nav>
                </div>
                <div className="p-4">
                  {renderTabContent()}
                </div>
              </div>
            </div>

            {/* Sidebar */}
            <div className="lg:w-1/4 space-y-6">
              {/* Phim thịnh hành - FIXED */}
              <div className="bg-gray-800 p-4 rounded-lg shadow">
                <h3 className="text-lg font-semibold mb-3 text-red-500 border-b-2 border-red-500 pb-2">
                  PHIM THỊNH HÀNH
                </h3>
                <div className="flex mb-3">
                  <button
                    onClick={() => handleTrendingPeriodClick('day')}
                    className={`px-4 py-1 text-sm rounded-l-md transition-colors ${trendingPeriod === 'day'
                        ? 'bg-red-600 text-white'
                        : 'bg-gray-700 hover:bg-gray-600 text-gray-300'
                      }`}
                  >
                    Ngày
                  </button>
                  <button
                    onClick={() => handleTrendingPeriodClick('week')}
                    className={`px-4 py-1 text-sm transition-colors ${trendingPeriod === 'week'
                        ? 'bg-red-600 text-white'
                        : 'bg-gray-700 hover:bg-gray-600 text-gray-300'
                      }`}
                  >
                    Tuần
                  </button>
                  <button
                    onClick={() => handleTrendingPeriodClick('month')}
                    className={`px-4 py-1 text-sm rounded-r-md transition-colors ${trendingPeriod === 'month'
                        ? 'bg-red-600 text-white'
                        : 'bg-gray-700 hover:bg-gray-600 text-gray-300'
                      }`}
                  >
                    Tháng
                  </button>
                </div>

                {trendingMovies.length > 0 ? (
                  <ul className="space-y-3">
                    {trendingMovies.map((movie, index) => (
                      <li key={movie.slug || index} className="flex items-start space-x-3">
                        <span className={`${index === 0 ? 'bg-red-600' : index === 1 ? 'bg-orange-500' : index === 2 ? 'bg-yellow-500' : 'bg-gray-600'} text-white text-xs font-bold w-6 h-6 flex items-center justify-center rounded-full flex-shrink-0 mt-1`}>
                          {index + 1}
                        </span>
                        <div className="flex-1 min-w-0">
                          <Link
                            to={movie.slug ? `/phim/${movie.slug}` : '#'}
                            className="text-sm font-semibold hover:text-red-500 transition-colors block truncate"
                            title={movie.name}
                          >
                            {movie.name}
                          </Link>
                          <p className="text-xs text-gray-400 mt-1">
                            {formatViewCount(movie.viewCount)} lượt xem
                          </p>
                          {movie.year && (
                            <p className="text-xs text-gray-500">
                              {movie.year}
                            </p>
                          )}
                        </div>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <div className="text-center py-4">
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-red-600 mx-auto mb-2"></div>
                    <p className="text-gray-400 text-sm">Đang tải...</p>
                  </div>
                )}
              </div>

              {/* Năm phát hành */}
              <div className="bg-gray-800 p-4 rounded-lg shadow">
                <h3 className="text-lg font-semibold mb-3 text-red-500 border-b-2 border-red-500 pb-2">
                  NĂM PHÁT HÀNH
                </h3>
                <div className="grid grid-cols-3 gap-2 text-sm">
                  {years.map((year) => (
                    <button
                      key={year}
                      onClick={() => handleYearClick(year)}
                      className={`text-center py-2 rounded hover:bg-red-600 transition-colors duration-200 transform hover:scale-105 ${selectedYear === year
                        ? 'bg-gray-700 text-white shadow-lg'
                        : 'bg-gray-700 text-gray-300 hover:text-white'
                        }`}
                    >
                      {year}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default MovieDetailPage;