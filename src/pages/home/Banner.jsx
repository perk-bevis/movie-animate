import React, { useEffect, useState } from 'react';
import bannerIcon from '../../assets/th1.jpg';
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import { useData } from '../data/fakeListfilm'
import { Link } from 'react-router-dom';


const responsive = {
  superLargeDesktop: {
    breakpoint: { max: 4000, min: 3000 },
    items: 11 // Tăng lên cho màn hình rất lớn
  },
  desktop: {
    breakpoint: { max: 3000, min: 1024 },
    items: 10 // Tăng số lượng phim hiển thị
  },
  tablet: {
    breakpoint: { max: 1024, min: 464 },
    items: 2
  },
  mobile: {
    breakpoint: { max: 464, min: 0 },
    items: 1
  }
};

const Banner = ({ title, data }) => {
  const { currentBannerVideo, loading } = useData();
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(0);

  // Set movie đầu tiên làm mặc định khi data load xong
  useEffect(() => {
    if (data && data.length > 0 && !selectedMovie) {
      setSelectedMovie(data[1]);
      setCurrentIndex(0);
    }
  }, [data, selectedMovie]);

  // Handle click trên poster để thay đổi movie được chọn
  const handleMovieClick = (movie, index) => {
    setSelectedMovie(movie);
    setCurrentIndex(index);
  };

  // Custom arrows cho carousel
  const CustomLeftArrow = ({ onClick }) => (
    <button
      onClick={() => {
        onClick();
        // Tính toán index mới khi click left arrow
        const newIndex = currentIndex > 0 ? currentIndex - 1 : data.length - 1;
        setCurrentIndex(newIndex);
        setSelectedMovie(data[newIndex]);
      }}
      className="absolute left-2 top-1/2 transform -translate-y-1/2 z-20 bg-black/50 hover:bg-black/70 text-white p-3 rounded-full transition-all duration-200"
    >
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
      </svg>
    </button>
  );

  const CustomRightArrow = ({ onClick }) => (
    <button
      onClick={() => {
        onClick();
        // Tính toán index mới khi click right arrow
        const newIndex = currentIndex < data.length - 1 ? currentIndex + 1 : 0;
        setCurrentIndex(newIndex);
        setSelectedMovie(data[newIndex]);
      }}
      className="absolute right-2 top-1/2 transform -translate-y-1/2 z-20 bg-black/50 hover:bg-black/70 text-white p-3 rounded-full transition-all duration-200"
    >
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
      </svg>
    </button>
  );

  if (loading || !selectedMovie || !data || data.length === 0) {
    return (
      <div className="w-full h-screen bg-gray-900 flex items-center justify-center">
        <div className="text-white">Đang tải...</div>
      </div>
    );
  }
  return (
    <section
      className="relative w-full h-screen bg-cover bg-center"
      style={{
        backgroundImage: `url(${import.meta.env.VITE_IMG_URL}${selectedMovie.poster_url || selectedMovie.thumb_url || bannerIcon})`
      }}
    >
      <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-black opacity-80"></div>

      <div className='absolute z-10 text-white top-24 left-0 w-[50%] mt-24 px-24'>
        <h1 className="text-5xl font-bold" id="title">{selectedMovie.name || selectedMovie.origin_name}</h1>
        <div className="mb-1.5 cursor-pointer flex space-x-0.5">
          {[...Array(5)].map((_, i) => (
            <span key={i} className="text-2xl text-amber-500">
              <i className="fa-solid fa-star"></i>
            </span>
          ))}

        </div>
        <div className="my-3.5 flex space-x-2">
          {selectedMovie.category && selectedMovie.category.slice(0, 3).map((cat, index) => (
            <span key={index} className="bg-black/80 px-[10px] py-[5px] rounded-[15px] text-[0.9em]">
              {cat.name}
            </span>
          ))}
        </div>
        
        <div className="my-4 flex items-center space-x-4">
          <Link  to={`/phim/${selectedMovie.slug}/${selectedMovie._id}`} key={selectedMovie._id}>
            <button className="px-[20px] py-[12px] rounded-[5px] text-[1.2em] bg-green-600 text-white hover:opacity-90 cursor-pointer flex items-center space-x-2">
              <i className="fa-solid fa-play"></i>
              <span>Play</span>
            </button>
          </Link>

          <button className="px-[20px] py-[12px] rounded-[5px] text-[1.2em] bg-[rgba(100,100,100,0.7)] text-white font-bold hover:opacity-90 cursor-pointer flex items-center justify-center">
            +
          </button>
        </div>

        <p className="mb-4 text-sm leading-relaxed max-w-lg" style={{ WebkitMaskImage: `linear-gradient(to bottom,rgba(0, 0, 0, 1) 0%,  rgba(0, 0, 0, 1) 30%, rgba(0, 0, 0, 0.6) 60%, rgba(0, 0, 0, 0.3) 80%, rgba(0, 0, 0, 0) 100%)`, WebkitMaskRepeat: 'no-repeat', WebkitMaskSize: '100% 100%', }}>
          Geralt of Rivia, a solitary monster hunter, struggles to find his place in a world where people often prove more wicked than beasts.
          Geralt of Rivia, a solitary monster hunter, struggles to find his place in a world where people often prove more wicked than beasts.
          Geralt of Rivia, a solitary monster hunter, struggles to find his place in a world where people often prove more wicked than beasts.
          Geralt of Rivia, a solitary monster hunter, struggles to find his place in a world where people often prove more wicked than beasts.
        </p>
      </div>

      <section className="absolute bottom-40 w-full h-[200px] px-12 z-10">
        <Carousel responsive={responsive}
          className="flex space-x-4 h-[350px] items-center pb-4 scrollbar-hide"

          customLeftArrow={<CustomLeftArrow />}
          customRightArrow={<CustomRightArrow />}
          infinite={true}
          autoPlay={false}
          keyBoardControl={true}
          containerClass="carousel-container"
          itemClass="max-w-[190px]"
        >
          {data && data.length > 0 && data.map((item, index) => {
            return (
              <div key={index} className="flex space-x-4 items-center pb-4 scrollbar-hide">
                <div className="flex-shrink-0 w-[170px] h-[280px]">
                  <img src={`${import.meta.env.VITE_IMG_URL}${item.poster_url || item.thumb_url}`} alt="The Witcher" className="w-full h-full object-cover rounded-md shadow-lg mb-2" />
                  <h3 className="text-white text-sm font-semibold truncate hover:text-clip hover:whitespace-normal">{item.name}</h3>
                </div>
              </div>
            )
          })}
        </Carousel>
      </section>
    </section>
  );
};

export default Banner;
