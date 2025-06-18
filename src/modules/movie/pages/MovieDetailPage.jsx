import React, { useEffect, useState } from "react";
import Navbar from "../../../layout/Navbar";
import { Link, useParams } from "react-router-dom";
const MovieDetailPage = () => {
  //Lấy giá trị slug từ URL. Ví dụ, nếu URL là /phim/cu-an-may, thì slug sẽ có giá trị là "cu-an-may".
  const { slug } = useParams();
  // State để lưu danh sách phim
  const [movieDetails, setMovieDetails] = useState(null);
  console.log(movieDetails)
  // State để lưu danh sách tập phim
  const [episodes, setEpisodes] = useState([])
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  useEffect(() => {
    // --- Bắt đầu hàm để tải dữ liệu chi tiết phim ---
    const fetchMovieBySlug = async () => {
      // Bước 1: Kiểm tra xem biến 'slug' có tồn tại không. Nếu không, dừng hàm lại.
      if (!slug) return;
      // Bước 2: Chuẩn bị cho việc tải dữ liệu.
      setLoading(true); // Bật trạng thái "đang tải" để UI có thể hiển thị thông báo.
      setError(null); // Xóa đi các lỗi cũ từ lần tải trước.
      try {
        // Bước 3: Thực hiện gọi API bằng hàm fetch.
        // Dùng `await` để đợi cho đến khi có phản hồi từ server.
        const response = await fetch(`https://phimapi.com/phim/${slug}`);
        // Bước 4: Kiểm tra xem phản hồi từ server có thành công không (status code 200-299)
        if (!response.ok) {
          // Nếu không thành công, tạo một lỗi và chuyển quyền xử lý cho khối `catch`.
          throw new Error("Không thể tải dữ liệu phim.");
        }
        // Bước 5: Nếu phản hồi thành công, chuyển đổi dữ liệu từ chuỗi JSON thành một đối tượng JavaScript.
        const data = await response.json();
        // Bước 6: Cập nhật state của component bằng dữ liệu vừa nhận được.
        // Việc này sẽ khiến React render lại giao diện với thông tin mới.
        setMovieDetails(data.movie);
        // Cẩn thận kiểm tra xem dữ liệu tập phim có tồn tại không trước khi cập nhật state.
        if (data.episodes && data.episodes[0] && data.episodes[0].server_data) {
          setEpisodes(data.episodes[0].server_data);
        }
      } catch (err) {
        // Bước 7: Bắt và xử lý bất kỳ lỗi nào xảy ra trong khối `try`.
        // Cập nhật state `error` để thông báo lỗi này có thể được hiển thị cho người dùng.
        setError(err.message);
        console.error("Lỗi khi fetch chi tiết phim:", err);
      } finally {
        // Bước 8: Khối `finally` sẽ luôn được thực thi sau cùng.
        // Tắt trạng thái "đang tải" đi, vì quá trình đã kết thúc.
        setLoading(false);
      }
    };

    fetchMovieBySlug();
  }, [slug]);

  if (loading) {
    return <div className="text-white text-center p-10">Đang tải...</div>;
  }

  if (error) {
    return <div className="text-red-500 text-center p-10">Lỗi: {error}</div>;
  }

  if (!movieDetails) {
    return (
      <div className="text-white text-center p-10">
        Không tìm thấy thông tin phim.
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
            <a href="#" className="hover:text-white">
              Motchill
            </a>
            <span className="mx-2">&gt;</span>
            <a href="#" className="hover:text-white">
              Trung Quốc
            </a>
            <span className="mx-2">&gt;</span>
            <span className="text-white">{movieDetails.name}</span>
          </div>
        </nav>
        <div className="container mx-auto p-4">
          <div className="flex flex-col lg:flex-row gap-6">
            <div className="lg:w-3/4">
              <div className="relative bg-movie-hero rounded-lg shadow-xl p-6 md:p-10 min-h-[400px] md:min-h-[500px] flex items-end">
                <div
                  className="absolute inset-0 bg-black opacity-50 rounded-lg"
                  style={{ backgroundImage: `url(${movieDetails.thumb_url})` }}
                ></div>
                <div className="relative z-10 flex flex-col md:flex-row gap-6">
                  <div className="w-full md:w-1/3 lg:w-1/4 flex-shrink-0">
                    <img
                      src={movieDetails.thumb_url}
                      alt="Upcoming Movie"
                      className="rounded-lg w-full"
                    />
                  </div>
                  <div className="text-white">
                    <h1 className="text-3xl md:text-4xl font-bold mb-2">
                      {movieDetails.name}
                    </h1>
                    <p className="text-lg text-gray-300 mb-1">
                      Destiny of Love (2025)
                    </p>
                    <p className="text-sm text-gray-400 mb-3">Jun 05, 2025</p>
                    <div className="bg-red-600 text-white px-3 py-1 inline-block rounded-md text-lg mb-4">
                      Tập 20
                    </div>

                    <p className="text-sm text-gray-300 mb-1">
                      <span className="font-semibold">
                        {movieDetails.year} -{" "}
                        {movieDetails.country.map((c) => c.name).join(", ")}
                      </span>
                    </p>
                    <div className="mb-2 text-sm">
                      <span className="font-semibold">Thể Loại: </span>
                      {movieDetails.category.map((c) => c.name).join(", ")}
                    </div>
                    <p className="text-sm text-gray-300 mb-3">
                      Tổng số tập: <span className="font-semibold">24 Tập</span>
                    </p>
                    <div className="flex items-center mb-4">
                      <div className="flex text-yellow-400">
                        <i className="fas fa-star"></i>
                        <i className="fas fa-star"></i>
                        <i className="fas fa-star"></i>
                        <i className="fas fa-star"></i>
                        <i className="fas fa-star-half-alt"></i>{" "}
                      </div>
                      <span className="ml-2 text-gray-300">
                        (8.0 điểm / 1 lượt)
                      </span>
                    </div>
                    <div className="flex space-x-3">
                      <Link
                        to={`/watchingtv/${slug}/tap-${movieDetails.episode_total}`}
                      >
                        <button className="bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-6 rounded-lg flex items-center">
                          <i className="fas fa-play mr-2"></i> Xem Phim
                        </button>
                      </Link>
                      <button className="bg-gray-700 hover:bg-gray-600 text-white font-bold py-2 px-6 rounded-lg flex items-center">
                        <i className="fas fa-plus mr-2"></i> Follow
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-gray-800 p-4 mt-6 rounded-lg shadow flex flex-wrap">
                <span className="font-semibold mr-3">Tập mới nhất:</span>
                {latestReversedEpisodes.map((practice) => {
                  return (
                    <Link
                      key={practice.slug}
                      to={`/watchingtv/${slug}/tap-${practice.episode_total}`}
                      className="px-3 py-1 text-gray-300 hover:bg-gray-700 rounded"
                    >
                      {practice.name}
                    </Link>
                  );
                })}
              </div>

              <div className="bg-gray-800 mt-6 rounded-lg shadow">
                <div className="border-b border-gray-700">
                  <nav className="flex space-x-1" aria-label="Tabs">
                    <button className="tab-active px-4 py-3 font-medium text-sm focus:outline-none">
                      THÔNG TIN PHIM
                    </button>
                    <button className="tab-inactive hover:text-gray-300 hover:border-gray-500 px-4 py-3 font-medium text-sm focus:outline-none">
                      DIỄN VIÊN
                    </button>
                    <button className="tab-inactive hover:text-gray-300 hover:border-gray-500 px-4 py-3 font-medium text-sm focus:outline-none">
                      TRAILER
                    </button>
                  </nav>
                </div>
                <div className="p-4">
                  <div>
                    <h3 className="text-xl font-semibold mb-2">
                      Nội Dung Phim
                    </h3>
                    <h4 className="text-lg font-semibold text-red-500 mb-2">
                      {movieDetails.name || movie.slug}
                    </h4>
                    <p className="text-gray-300 text-sm leading-relaxed mb-4">
                      {movieDetails.content}
                    </p>
                    <div className="mb-4">
                      <span className="font-semibold mr-2">Tags:</span>
                      <a
                        href="#"
                        className="bg-gray-700 text-gray-300 px-2 py-1 text-xs rounded hover:bg-gray-600 mr-1 mb-1 inline-block"
                      >
                        Tag 1
                      </a>
                      <a
                        href="#"
                        className="bg-gray-700 text-gray-300 px-2 py-1 text-xs rounded hover:bg-gray-600 mr-1 mb-1 inline-block"
                      >
                        Tag 2
                      </a>
                    </div>
                    <div className="flex items-center space-x-4">
                      <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md text-sm flex items-center">
                        <i className="fas fa-thumbs-up mr-2"></i> Thích 0
                      </button>
                      <button className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-md text-sm flex items-center">
                        <i className="fas fa-share mr-2"></i> Chia sẻ
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="lg:w-1/4 space-y-6">
              <div className="bg-gray-800 p-4 rounded-lg shadow">
                <h3 className="text-lg font-semibold mb-3 text-red-500 border-b-2 border-red-500 pb-2">
                  PHIM THỊNH HÀNH
                </h3>
                <div className="flex mb-3">
                  <button className="bg-red-600 text-white px-4 py-1 text-sm rounded-l-md">
                    Ngày
                  </button>
                  <button className="bg-gray-700 hover:bg-gray-600 text-gray-300 px-4 py-1 text-sm">
                    Tuần
                  </button>
                  <button className="bg-gray-700 hover:bg-gray-600 text-gray-300 px-4 py-1 text-sm rounded-r-md">
                    Tháng
                  </button>
                </div>
                <ul className="space-y-3">
                  <li className="flex items-start space-x-3">
                    <span className="bg-red-600 text-white text-xs font-bold w-6 h-6 flex items-center justify-center rounded-full flex-shrink-0 mt-1">
                      1
                    </span>
                    <div>
                      <a
                        href="#"
                        className="text-sm font-semibold hover:text-red-500"
                      >
                        Sa Vào Vòng Yêu Cưỡng ...
                      </a>
                      <p className="text-xs text-gray-400">326,444 lượt xem</p>
                    </div>
                  </li>
                  <li className="flex items-start space-x-3">
                    <span className="bg-gray-600 text-white text-xs font-bold w-6 h-6 flex items-center justify-center rounded-full flex-shrink-0 mt-1">
                      2
                    </span>
                    <div>
                      <a href="#" className="text-sm hover:text-red-500">
                        Khom Lưng
                      </a>
                      <p className="text-xs text-gray-400">13,629 lượt xem</p>
                    </div>
                  </li>
                  <li className="flex items-start space-x-3">
                    <span className="bg-gray-600 text-white text-xs font-bold w-6 h-6 flex items-center justify-center rounded-full flex-shrink-0 mt-1">
                      3
                    </span>
                    <div>
                      <a href="#" className="text-sm hover:text-red-500">
                        Thiêu Hoa Nhuốm Cẩm
                      </a>
                      <p className="text-xs text-gray-400">13,287 lượt xem</p>
                    </div>
                  </li>
                  <li className="flex items-start space-x-3">
                    <span className="bg-gray-600 text-white text-xs font-bold w-6 h-6 flex items-center justify-center rounded-full flex-shrink-0 mt-1">
                      4
                    </span>
                    <div>
                      <a href="#" className="text-sm hover:text-red-500">
                        Khi Anh Chạy Về Phía Em
                      </a>
                      <p className="text-xs text-gray-400">12,114 lượt xem</p>
                    </div>
                  </li>
                  <li className="flex items-start space-x-3">
                    <span className="bg-gray-600 text-white text-xs font-bold w-6 h-6 flex items-center justify-center rounded-full flex-shrink-0 mt-1">
                      5
                    </span>
                    <div>
                      <a href="#" className="text-sm hover:text-red-500">
                        Tàng Hải Truyện
                      </a>
                      <p className="text-xs text-gray-400">11,828 lượt xem</p>
                    </div>
                  </li>
                  <li className="flex items-start space-x-3">
                    <span className="bg-gray-600 text-white text-xs font-bold w-6 h-6 flex items-center justify-center rounded-full flex-shrink-0 mt-1">
                      6
                    </span>
                    <div>
                      <a href="#" className="text-sm hover:text-red-500">
                        Thử Thách Thần Tượng
                      </a>
                      <p className="text-xs text-gray-400">7,877 lượt xem</p>
                    </div>
                  </li>
                </ul>
              </div>

              <div className="bg-gray-800 p-4 rounded-lg shadow">
                <h3 className="text-lg font-semibold mb-3 text-red-500 border-b-2 border-red-500 pb-2">
                  NĂM PHÁT HÀNH
                </h3>
                <div className="grid grid-cols-3 gap-2 text-sm">
                  <a
                    href="#"
                    className="bg-red-600 text-white text-center py-2 rounded"
                  >
                    2025
                  </a>
                  <a
                    href="#"
                    className="bg-gray-700 hover:bg-gray-600 text-center py-2 rounded"
                  >
                    2024
                  </a>
                  <a
                    href="#"
                    className="bg-gray-700 hover:bg-gray-600 text-center py-2 rounded"
                  >
                    2023
                  </a>
                  <a
                    href="#"
                    className="bg-gray-700 hover:bg-gray-600 text-center py-2 rounded"
                  >
                    2022
                  </a>
                  <a
                    href="#"
                    className="bg-gray-700 hover:bg-gray-600 text-center py-2 rounded"
                  >
                    2021
                  </a>
                  <a
                    href="#"
                    className="bg-gray-700 hover:bg-gray-600 text-center py-2 rounded"
                  >
                    2020
                  </a>
                  <a
                    href="#"
                    className="bg-gray-700 hover:bg-gray-600 text-center py-2 rounded"
                  >
                    2019
                  </a>
                  <a
                    href="#"
                    className="bg-gray-700 hover:bg-gray-600 text-center py-2 rounded"
                  >
                    2018
                  </a>
                  <a
                    href="#"
                    className="bg-gray-700 hover:bg-gray-600 text-center py-2 rounded"
                  >
                    2017
                  </a>
                  {}
                </div>
              </div>

              <div className="bg-gray-800 p-4 rounded-lg shadow">
                <h3 className="text-lg font-semibold mb-3 text-red-500 border-b-2 border-red-500 pb-2">
                  PHIM SẮP CHIẾU
                </h3>
                <div>
                  <div className="relative">
                    <img
                      src="https://via.placeholder.com/300x180/222/fff?text=Upcoming+Movie"
                      alt="Upcoming Movie"
                      className="rounded-lg w-full"
                    />
                    <div className="absolute bottom-0 left-0 bg-black bg-opacity-70 text-white p-2 w-full rounded-b-lg">
                      <h4 className="text-sm font-semibold">
                        Golf Thủ Kỳ Tài - S...
                      </h4>
                      <div className="flex items-center text-xs">
                        <i className="fas fa-star text-yellow-400 mr-1"></i> 8.0
                        <span className="ml-2">2025</span>
                      </div>
                    </div>
                  </div>
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
