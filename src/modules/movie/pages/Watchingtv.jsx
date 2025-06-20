import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import bannerIcon from '../../../assets/th1.jpg';


const Watchingtv = () => {
  const { slug, episode } = useParams(); // Lấy slug phim và số tập từ URL
  const [movieDetails, setMovieDetails] = useState(null);
  const [episodes, setEpisodes] = useState([]);
  const [currentEpisode, setCurrentEpisode] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchMovieData = async () => {
      if (!slug) return;
      setLoading(true);
      setError(null);

      try {
        // Gọi API để lấy thông tin phim và danh sách tập
        const response = await fetch(`https://phimapi.com/phim/${slug}`);

        if (!response.ok) {
          throw new Error('Không thể tải dữ liệu phim.');
        }

        const data = await response.json();
        setMovieDetails(data.movie);

        // Lưu danh sách tập phim
        if (data.episodes && data.episodes[0] && data.episodes[0].server_data) {
          setEpisodes(data.episodes[0].server_data);

          // Tìm tập hiện tại dựa trên episode param
          if (episode) {
            const episodeNumber = episode.replace('tap-', '');
            const foundEpisode = data.episodes[0].server_data.find(
              ep => ep.name === `Tập ${episodeNumber}` || ep.name === `${episodeNumber}`
            );
            setCurrentEpisode(foundEpisode || data.episodes[0].server_data[0]);
          } else {
            setCurrentEpisode(data.episodes[0].server_data[0]);
          }
        }
      } catch (err) {
        setError(err.message);
        console.error("Lỗi khi fetch dữ liệu phim:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchMovieData();
  }, [slug, episode]);
  // kiểm tra xem sdk fb đã đc tải chưa
  useEffect(() => {
    if (window.FB && movieDetails) {
      window.FB.XFBML.parse();
    }
  }, [movieDetails, currentEpisode]);

  const handleEpisodeSelect = (selectedEpisode) => {
    setCurrentEpisode(selectedEpisode);
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
      <div className="bg-black text-gray-300 font-sans min-h-screen flex items-center justify-center">
        <div className="text-red-500 text-center p-10">Lỗi: {error}</div>
      </div>
    );
  }

  if (!movieDetails) {
    return (
      <div className="bg-black text-gray-300 font-sans min-h-screen flex items-center justify-center">
        <div className="text-white text-center p-10">Không tìm thấy thông tin phim.</div>
      </div>
    );
  }

  const commentUrl = "https://developers.facebook.com/docs/plugins/comments#configurator";

  return (
    <div className="bg-black text-gray-300 font-sans min-h-screen">
      <div className="max-w-screen-xl mx-auto p-4 md:p-6">
        <div className="pt-20 flex flex-col lg:flex-row gap-8">
          <main className="w-full lg:w-2/3 xl:w-3/4">
            {/* Breadcrumb Navigation */}
            <nav className="text-sm mb-4">
              <ol className="flex items-center space-x-2 text-gray-400 flex-wrap">
                <li><Link to="/" className="hover:text-white">Trang chủ</Link></li>
                <li><span>&gt;</span></li>
                <li><Link to={`/phim/${slug}/${slug.episode_total}`} className="hover:text-white">{movieDetails.name}</Link></li>
                <li><span>&gt;</span></li>
                <li className="text-white">{currentEpisode?.name || 'Tập 01'}</li>
              </ol>
            </nav>

            {/* Video Player */}
            <div className="relative w-full aspect-video bg-black rounded-lg overflow-hidden group">
              {currentEpisode?.link_embed ? (
                <iframe
                  src={currentEpisode.link_embed}
                  className="w-full h-full"
                  // frameBorder="0"
                  allowFullScreen
                  title={`${movieDetails.name} - ${currentEpisode.name}`}
                />
              ) : (
                <div className="absolute inset-0 flex items-center justify-center">
                  <button className="w-20 h-20 bg-black/50 rounded-full flex items-center justify-center text-white group-hover:bg-red-600 transition-colors">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-10 h-10 ml-1">
                      <path fillRule="evenodd" d="M4.5 5.653c0-1.426 1.529-2.33 2.779-1.643l11.54 6.647c1.295.748 1.295 2.536 0 3.284L7.279 20.99c-1.25.722-2.779-.217-2.779-1.643V5.653Z" clipRule="evenodd" />
                    </svg>
                  </button>
                </div>
              )}
            </div>

            {/* Player Controls */}
            <div className="mt-4 p-4 bg-yellow-900/30 border-l-4 border-yellow-500 rounded text-sm">
              <p>Xin chào! Cảm ơn bạn đã ghé thăm website xem phim của chúng tôi. Chúc bạn có trải nghiệm xem phim thật thú vị!</p>
            </div>

            <div className="mt-4 flex flex-wrap gap-y-2 justify-between items-center text-sm">
              <div className="flex items-center gap-4">
                <button className="flex items-center gap-1.5 hover:text-white">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-5 h-5">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 3.75v4.5m0-4.5h4.5m-4.5 0L9 9M3.75 20.25v-4.5m0 4.5h4.5m-4.5 0L9 15M20.25 3.75h-4.5m4.5 0v4.5m0-4.5L15 9m5.25 11.25h-4.5m4.5 0v-4.5m0 4.5L15 15" />
                  </svg>
                  Phóng to
                </button>
                <button className="flex items-center gap-1.5 hover:text-white">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-5 h-5">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M3 3v1.5M3 21v-1.5m18 0v1.5M21 3v1.5M3 12h18M3 12a9 9 0 0118 0M3 12a9 9 0 0018 0m-9 6.75h.008v.008H12v-.008z" />
                  </svg>
                  Báo Lỗi
                </button>
              </div>
              <div className="flex items-center gap-4">
                <button className="flex items-center gap-1.5 hover:text-white">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-5 h-5">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v2.25m6.364.386l-1.591 1.591M21 12h-2.25m-.386 6.364l-1.591-1.591M12 18.75V21m-4.773-4.227l-1.591 1.591M5.25 12H3m4.227-4.773L5.636 5.636M15.75 12a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0z" />
                  </svg>
                  Tắt đèn
                </button>
                {/* Next Episode Button */}
                {episodes.length > 0 && currentEpisode && (
                  <Link
                    to={`/watchingtv/${slug}/tap-${parseInt(currentEpisode.name.replace(/\D/g, '')) + 1}`}
                    className="bg-zinc-700 px-4 py-2 rounded-md hover:bg-zinc-600 flex items-center gap-2"
                  >
                    Tập Tiếp
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-5 h-5">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
                    </svg>
                  </Link>
                )}
              </div>
            </div>

            {/* Server Selection */}
            <div className="mt-8">
              <h2 className="text-sm font-semibold uppercase text-gray-400 mb-2">ĐỔI SERVER (NẾU LAG)</h2>
              <div className="flex items-center gap-2">
                <button className="bg-red-600 text-white font-bold px-4 py-2 rounded-md">VIP1</button>
                <button className="bg-zinc-700 hover:bg-zinc-600 text-white font-bold px-4 py-2 rounded-md">VIP2</button>
              </div>
            </div>

            {/* Episode List */}
            {episodes.length > 0 && (
              <div className="mt-8">
                <div className="mb-6">
                  <div className="p-3 bg-zinc-800 rounded-t-md flex items-center gap-2 text-yellow-400 font-semibold">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5">
                      <path fillRule="evenodd" d="M2 3.5A1.5 1.5 0 013.5 2h1.148a1.5 1.5 0 011.465 1.175l.716 3.223a1.5 1.5 0 01-1.052 1.767l-.933.267c-.41.117-.643.555-.48.95a11.542 11.542 0 006.254 6.254c.395.163.833-.07.95-.48l.267-.933a1.5 1.5 0 011.767-1.052l3.223.716A1.5 1.5 0 0118 15.352V16.5A1.5 1.5 0 0116.5 18h-13A1.5 1.5 0 012 16.5v-13z" clipRule="evenodd" />
                    </svg>
                    <span>Danh Sách Tập - {movieDetails.name} (Vietsub)</span>
                  </div>
                  <div className="p-4 bg-zinc-900 rounded-b-md">
                    <div className="flex flex-wrap gap-2">
                      {episodes.map((ep, index) => (
                        <Link
                          key={index}
                          to={`/watchingtv/${slug}/tap-${ep.name.replace(/\D/g, '')}`}
                          onClick={() => handleEpisodeSelect(ep)}
                          className={`px-4 py-1.5 rounded text-sm transition-colors ${currentEpisode?.name === ep.name
                              ? 'bg-red-600 text-white font-semibold'
                              : 'bg-zinc-700 hover:bg-zinc-600 text-gray-300'
                            }`}
                        >
                          {ep.name}
                        </Link>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Movie Information */}
            <div className="mt-8 p-4 md:p-6 bg-zinc-800 rounded-lg text-gray-300">
              <h1 className="text-2xl md:text-3xl font-bold text-white mb-2">
                {movieDetails.name.toUpperCase()} {currentEpisode?.name?.toUpperCase() || 'TẬP 01'}
              </h1>
              <p className="text-sm text-gray-400">{movieDetails.name} - {movieDetails.origin_name} (HD - Vietsub)</p>
              <p className="text-sm text-gray-400 mb-3">{currentEpisode?.name || 'Tập 01'}</p>

              <div className="flex items-center mb-4">
                <div className="flex text-yellow-400 gap-0.5">
                  {[...Array(5)].map((_, i) => (
                    <svg key={i} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5">
                      <path fillRule="evenodd" d="M10.868 2.884c.321-.772 1.415-.772 1.736 0l1.681 4.06c.064.155.19.284.348.348l4.06 1.68c.772.321.772 1.415 0 1.736l-4.06 1.68a.502.502 0 00-.348.348l-1.681 4.06c-.321-.772-1.415-.772-1.736 0l-1.681-4.06a.502.502 0 00-.348-.348l-4.06-1.68c-.772-.321-.772-1.415 0-1.736l4.06-1.68a.502.502 0 00.348-.348l1.681-4.06z" clipRule="evenodd" />
                    </svg>
                  ))}
                </div>
                <span className="ml-2 text-sm text-gray-400">(8.0 điểm / 145 lượt)</span>
              </div>

              <div className="flex items-center gap-2 mb-4">
                <button className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-1 text-sm rounded flex items-center gap-2">
                  <i className="fas fa-thumbs-up mr-2"></i>
                  Thích 0
                </button>
                <button className="bg-sky-500 hover:bg-sky-600 text-white px-3 py-1 text-sm rounded">Chia sẻ</button>
              </div>

              <div className="text-sm text-gray-300 leading-relaxed border-t border-zinc-700 pt-4">
                <p>
                  <strong>{movieDetails.name}</strong><br />
                  {movieDetails.content ? (
                    <>
                      {movieDetails.content.substring(0, 300)}...
                      <button className="text-sky-400 font-semibold ml-1">Xem Thêm</button>
                    </>
                  ) : (
                    "Nội dung phim đang được cập nhật..."
                  )}
                </p>
              </div>

              <div className="flex items-center gap-3 mt-4">
                <span className="text-sm font-semibold">Chia sẻ:</span>
                <a href="#" className="w-8 h-8 flex items-center justify-center bg-zinc-700 hover:bg-blue-600 rounded-full transition-colors">
                  <svg fill="currentColor" className="w-4 h-4 text-white" viewBox="0 0 16 16">
                    <path d="M16 8.049c0-4.446-3.582-8.05-8-8.05C3.58 0-.002 3.603-.002 8.05c0 4.017 2.926 7.347 6.75 7.951v-5.625h-2.03V8.05H6.75V6.275c0-2.017 1.195-3.131 3.022-3.131.876 0 1.791.157 1.791.157v1.98h-1.009c-.993 0-1.303.621-1.303 1.258v1.51h2.218l-.354 2.326H9.25V16c3.824-.604 6.75-3.934 6.75-7.951z" />
                  </svg>
                </a>
                <a href="#" className="w-8 h-8 flex items-center justify-center bg-zinc-700 hover:bg-sky-500 rounded-full transition-colors">
                  <svg fill="currentColor" className="w-4 h-4 text-white" viewBox="0 0 16 16">
                    <path d="M5.026 15c6.038 0 9.341-5.003 9.341-9.334 0-.14 0-.282-.006-.422A6.685 6.685 0 0 0 16 3.542a6.658 6.658 0 0 1-1.889.518 3.301 3.301 0 0 0 1.447-1.817 6.533 6.533 0 0 1-2.087.793A3.286 3.286 0 0 0 7.875 6.03a9.325 9.325 0 0 1-6.767-3.429 3.289 3.289 0 0 0 1.018 4.382A3.323 3.323 0 0 1 .64 6.575v.045a3.288 3.288 0 0 0 2.632 3.218 3.203 3.203 0 0 1-.865.115 3.23 3.23 0 0 1-.614-.057 3.283 3.283 0 0 0 3.067 2.277A6.588 6.588 0 0 1 .78 13.58a6.32 6.32 0 0 1-.78-.045A9.344 9.344 0 0 0 5.026 15z" />
                  </svg>
                </a>
              </div>
            </div>
            <div className="mt-4 bg-white p-4 rounded">
              <div
                className="fb-comments"
                data-href={commentUrl}
                data-width="100%"
                data-numposts="5"
              ></div>
            </div>
          </main>

          {/* Sidebar */}
          <aside className="w-full lg:w-1/3 xl:w-1/4 flex-shrink-0">
            <div>
              <h2 className="text-white font-bold uppercase mb-4">Năm phát hành</h2>
              <div className="flex flex-wrap gap-2">
                <a href="#" className="px-3 py-1 bg-zinc-700 hover:bg-red-600 rounded text-sm">2025</a>
                <a href="#" className="px-3 py-1 bg-zinc-700 hover:bg-red-600 rounded text-sm">2024</a>
                <a href="#" className="px-3 py-1 bg-zinc-700 hover:bg-red-600 rounded text-sm">2023</a>
                <a href="#" className="px-3 py-1 bg-zinc-700 hover:bg-red-600 rounded text-sm">2022</a>
                <a href="#" className="px-3 py-1 bg-zinc-700 hover:bg-zinc-600 rounded text-sm">2021</a>
                <a href="#" className="px-3 py-1 bg-zinc-700 hover:bg-zinc-600 rounded text-sm">2020</a>
              </div>
            </div>

            <div className="mt-8">
              <h2 className="text-white font-bold uppercase mb-4">Có thể bạn muốn xem</h2>
              <div className="space-y-4">
                <div className="flex gap-3 items-start">
                  <a href="#" className="flex-shrink-0">
                    <img src={bannerIcon} alt="Movie Poster" className="w-20 h-auto rounded" />
                  </a>
                  <div>
                    <a href="#"><h3 className="font-semibold text-white leading-tight hover:text-red-500">Một gia đình gần</h3></a>
                    <p className="text-sm text-gray-400">2023</p>
                    <div className="flex items-center text-sm text-yellow-500 mt-1">
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4 mr-1">
                        <path fillRule="evenodd" d="M10.868 2.884c.321-.772 1.415-.772 1.736 0l1.681 4.06c.064.155.19.284.348.348l4.06 1.68c.772.321.772 1.415 0 1.736l-4.06 1.68a.502.502 0 00-.348.348l-1.681 4.06c-.321-.772-1.415-.772-1.736 0l-1.681-4.06a.502.502 0 00-.348-.348l-4.06-1.68c-.772-.321-.772-1.415 0-1.736l4.06-1.68a.502.502 0 00.348-.348l1.681-4.06z" clipRule="evenodd" />
                      </svg>
                      <span>8.0</span>
                    </div>
                  </div>
                </div>

                <div className="flex gap-3 items-start">
                  <a href="#" className="flex-shrink-0">
                    <img src={bannerIcon} alt="Movie Poster" className="w-20 h-auto rounded" />
                  </a>
                  <div>
                    <a href="#"><h3 className="font-semibold text-white leading-tight hover:text-red-500">Anh Em Nhà Grimm</h3></a>
                    <p className="text-sm text-gray-400">2014</p>
                    <div className="flex items-center text-sm text-yellow-500 mt-1">
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4 mr-1">
                        <path fillRule="evenodd" d="M10.868 2.884c.321-.772 1.415-.772 1.736 0l1.681 4.06c.064.155.19.284.348.348l4.06 1.68c.772.321.772 1.415 0 1.736l-4.06 1.68a.502.502 0 00-.348.348l-1.681 4.06c-.321-.772-1.415-.772-1.736 0l-1.681-4.06a.502.502 0 00-.348-.348l-4.06-1.68c-.772-.321-.772-1.415 0-1.736l4.06-1.68a.502.502 0 00.348-.348l1.681-4.06z" clipRule="evenodd" />
                      </svg>
                      <span>8.0</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
};

export default Watchingtv;
