import React, { useEffect, useState } from "react";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import { useData } from "../../../data/fakeListfilm";
import { Link } from "react-router-dom";

// Cấu hình responsive cho react-multi-carousel
const responsive = {
  superLargeDesktop: { breakpoint: { max: 4000, min: 1800 }, items: 8 },
  desktop: { breakpoint: { max: 1800, min: 1024 }, items: 6 },
  tablet: { breakpoint: { max: 1024, min: 464 }, items: 4 },
  mobile: { breakpoint: { max: 464, min: 0 }, items: 2 },
};

const Banner = ({ data }) => {
  const { loading } = useData();
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (data && data.length > 0) {
      setSelectedMovie(data[0]);
      setCurrentIndex(0);
    }
  }, [data]);

  const handleMovieClick = (movie, index) => {
    setSelectedMovie(movie);
    setCurrentIndex(index);
  };

  // SỬA LỖI Ở ĐÂY: Thêm logic cập nhật state khi bấm mũi tên
  const CustomLeftArrow = ({ onClick }) => (
    <button
      onClick={() => {
        // 1. Gọi hàm của thư viện để carousel di chuyển
        onClick();
        // 2. Tính toán index mới (lùi lại, quay vòng nếu ở đầu)
        const newIndex = currentIndex > 0 ? currentIndex - 1 : data.length - 1;
        // 3. Cập nhật state của component
        setCurrentIndex(newIndex);
        setSelectedMovie(data[newIndex]);
      }}
      className="absolute left-0 top-1/2 transform -translate-y-1/2 z-20 bg-black/50 hover:bg-black/70 text-white p-3 rounded-full transition-all duration-200"
    >
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" /></svg>
    </button>
  );

  const CustomRightArrow = ({ onClick }) => (
    <button
      onClick={() => {
        // 1. Gọi hàm của thư viện để carousel di chuyển
        onClick();
        // 2. Tính toán index mới (tiến lên, quay vòng nếu ở cuối)
        const newIndex = currentIndex < data.length - 1 ? currentIndex + 1 : 0;
        // 3. Cập nhật state của component
        setCurrentIndex(newIndex);
        setSelectedMovie(data[newIndex]);
      }}
      className="absolute right-0 top-1/2 transform -translate-y-1/2 z-20 bg-black/50 hover:bg-black/70 text-white p-3 rounded-full transition-all duration-200"
    >
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
    </button>
  );


  if (loading || !selectedMovie) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="text-white text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-red-500 mx-auto mb-4"></div>
          <p>Đang tải...</p>
        </div>
      </div>
    );
  }

  const backgroundImageUrl = selectedMovie.poster_url || selectedMovie.thumb_url;

  return (
    <div className="relative text-white font-sans overflow-hidden" 
      style={{
        backgroundImage: `url(${import.meta.env.VITE_IMG_URL}${selectedMovie.poster_url || selectedMovie.thumb_url || bannerIcon})`
      }}>
      <div className="absolute inset-0 z-0 h-[110vh] md:h-[120vh]">
        <img
          src={`${import.meta.env.VITE_IMG_URL}${backgroundImageUrl}`}
          alt="Background"
          className="w-full h-[10%] object-contain opacity-40"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-black"></div>
        <div className="absolute inset-0 bg-gradient-to-r from-black via-black/60 to-transparent"></div>
      </div>

      <main className="relative z-10 p-6 md:p-12 lg:p-16">
        <div className="pt-16 md:pt-24 w-full md:w-2/3 lg:w-1/2">
          <h1 className="text-4xl md:text-5xl font-bold">{selectedMovie.name || selectedMovie.origin_name}</h1>
          <div className="flex items-center mt-4">
            <div className="flex text-yellow-400 text-xl md:text-2xl">
              <i className="fas fa-star"></i>
              <i className="fas fa-star"></i>
              <i className="fas fa-star"></i>
              <i className="fas fa-star"></i>
              <i className="far fa-star text-gray-400"></i>
            </div>
          </div>
          <div className="flex items-center flex-wrap space-x-4 mt-4 text-sm md:text-base text-gray-300 ">
            {selectedMovie.category && selectedMovie.category.slice(0, 3).map((cat, index) => (
              <React.Fragment key={cat.id || index}>
                <span>{cat.name}</span>
                {index < selectedMovie.category.slice(0, 3).length - 1 && (
                  <span className="w-1 h-1 bg-gray-400 rounded-full"></span>
                )}
              </React.Fragment>
            ))}
          </div>
          <div className="flex items-center space-x-3 mt-6">
            <Link to={`/phim/${selectedMovie.slug}/${selectedMovie._id}`} key={selectedMovie._id}>
              <button className="flex items-center justify-center bg-green-500 text-white px-6 py-2 rounded font-bold hover:bg-gray-200 transition">
                <i className="fas fa-play mr-2"></i> Play
              </button>
            </Link>
            <button className="flex items-center justify-center bg-gray-700/80 text-white w-10 h-10 rounded-full border-2 border-gray-500 hover:border-white transition">
              <i className="fas fa-plus"></i>
            </button>
          </div>
          <p className="mt-6 text-gray-300 text-sm md:text-base leading-relaxed max-w-lg">
            {selectedMovie.content || "Mô tả cho phim này hiện không có sẵn."}
          </p>
        </div>

        <div className="mt-12 md:mt-16 lg:mt-20">
          <Carousel
            responsive={responsive}
            infinite={true}
            keyBoardControl={true}
            customLeftArrow={<CustomLeftArrow />}
            customRightArrow={<CustomRightArrow />}
            itemClass="px-2"
          >
            {data.map((movie, index) => (
              <div
                key={movie._id}
                className="cursor-pointer group"
                onClick={() => handleMovieClick(movie, index)}
              >
                <div className={currentIndex === index ? ' rounded-md p-0.5' : 'p-0.5'}>
                  <img
                    src={`${import.meta.env.VITE_IMG_URL}${movie.thumb_url}`}
                    alt={movie.name}
                    className="w-full h-[300px] object-cover rounded transform group-hover:scale-105 transition-transform duration-300 "
                  />
                </div>
                <p className={`text-center mt-2 text-sm ${currentIndex === index ? 'text-white font-bold' : 'text-gray-400'}`}>
                  {movie.name}
                </p>
              </div>
            ))}
          </Carousel>
        </div>
      </main>
    </div>
  );
};

export default Banner;