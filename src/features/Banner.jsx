
import React from 'react';
import bannerIcon from '../assets/th.jpg';
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";

const responsive = {
    superLargeDesktop: {
        // the naming can be any, depends on you.
        breakpoint: { max: 4000, min: 3000 },
        items: 5
    },
    desktop: {
        breakpoint: { max: 3000, min: 1024 },
        items: 3
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
  return (
    <section
      className="relative w-full h-screen bg-cover bg-center"
      style={{ backgroundImage: `url(${bannerIcon})` }}
    >
      <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-black opacity-80"></div>
      <div className='absolute z-10 text-white top-24 left-0 w-[50%] mt-24 px-24'>
        <h1 className="text-5xl font-bold" id="title"> Hắc thần thoại ngộ không</h1>
        <div className="mb-1.5 cursor-pointer flex space-x-0.5">
          <span className="text-2xl text-amber-500"><i className="fa-solid fa-star"></i></span>
          <span className="text-2xl text-amber-500"><i className="fa-solid fa-star"></i></span>
          <span className="text-2xl text-amber-500"><i className="fa-solid fa-star"></i></span>
          <span className="text-2xl text-amber-500"><i className="fa-solid fa-star"></i></span>
          <span className="text-2xl text-amber-500"><i className="fa-solid fa-star"></i></span>
        </div>
        <div className="my-3.5 flex space-x-2">
          <span className="bg-black/80 px-[10px] py-[5px] rounded-[15px] text-[0.9em]">Action</span>
          <span className="bg-black/80 px-[10px] py-[5px] rounded-[15px] text-[0.9em]">Adventure</span>
          <span className="bg-black/80 px-[10px] py-[5px] rounded-[15px] text-[0.9em]">Fantasy</span>
        </div>

        <div className="my-4 flex items-center space-x-4">
          <button className="px-[20px] py-[12px] rounded-[5px] text-[1.2em] bg-green-600 text-white hover:opacity-90 cursor-pointer flex items-center space-x-2">
            <i className="fa-solid fa-play"></i>
            <span>Play</span>
          </button>
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
        {/* <Carousel responsive={responsive} className="flex space-x-4 h-[350px] items-center pb-4 scrollbar-hide">
            {data && data.length > 0 && data.map((item,index) => {
            return (
              <div  key={item.id || index} className="flex space-x-4 items-center pb-4 scrollbar-hide">
                <div className="flex-shrink-0 w-[170px] h-[280px]">
                  <img src={`${import.meta.env.VITE_IMG_URL}${item.poster_url||item.thumb_url}`} alt="The Witcher" className="w-full h-full object-cover rounded-md shadow-lg mb-2" />
                  <h3 className="text-white text-sm font-semibold truncate hover:text-clip hover:whitespace-normal">{item.name}</h3>
                </div>
              </div>
            )
          })}
        </Carousel> */}
        <div className="flex space-x-4 h-[350px] items-center pb-4 scrollbar-hide">
            
          {data && data.length > 0 && data.map((item,index) => {
            return (
              <div  key={ index} className="flex space-x-4 items-center pb-4 scrollbar-hide">
                <div className="flex-shrink-0 w-[170px] h-[280px]">
                  <img src={`${import.meta.env.VITE_IMG_URL}${item.poster_url||item.thumb_url}`} alt="The Witcher" className="w-full h-full object-cover rounded-md shadow-lg mb-2" />
                  <h3 className="text-white text-sm font-semibold truncate hover:text-clip hover:whitespace-normal">{item.name}</h3>
                </div>
              </div>
            )
          })}
        </div>
      </section>
    </section>
  );
};

export default Banner;