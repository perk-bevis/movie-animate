import React, { useState } from 'react'
import PropTypes from "prop-types";
import { Link } from 'react-router-dom';
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

const MovieList = ({ title, data }) => {
    return (
        <div className="mb-7">
            <div className="text-white px-4 sm:px-6 lg:px-8 py-6">
                <h2 className="uppercase text-2xl font-bold mb-6 tracking-wide border-l-4 border-sky-500 pl-3">{title}</h2>
                <Carousel responsive={responsive} className='flex space-x-4 pb-4 scrollbar-hide'  itemClass="max-w-[190px]">
                    {data && data.length > 0 && data.map((item, index) => {
                        let imgTemp;
                        const imagePath = item.poster_url || item.thumb_url;

                        if (imagePath) {

                            if (imagePath.startsWith('http://') || imagePath.startsWith('https://')) {
                                imgTemp = imagePath;
                            }

                            else if (import.meta.env.VITE_IMG_URL) {
                                const baseUrl = import.meta.env.VITE_IMG_URL;
                                if (baseUrl.endsWith('/') && imagePath.startsWith('/')) {
                                    imgTemp = baseUrl + imagePath.substring(1);
                                } else if (!baseUrl.endsWith('/') && !imagePath.startsWith('/')) {
                                    imgTemp = baseUrl + '/' + imagePath;
                                } else {
                                    imgTemp = baseUrl + imagePath;
                                }
                            }
                            else {
                                imgTemp = imagePath;
                            }
                        }
                        const ratingOutOf10 = parseFloat(item.vote_average);
                        const stars = isNaN(ratingOutOf10) ? 0 : Math.round(ratingOutOf10 / 2);
                        const displayRating = isNaN(ratingOutOf10) ? "N/A" : ratingOutOf10.toFixed(1);
                        // lấy ra tên và id của phim
                        const movieSlug = item.slug || item._id;
                        if (!movieSlug) {
                            return (
                                <div key={index} className="flex-shrink-0 w-[170px] bg-gray-800 rounded-lg shadow-lg overflow-hidden group transform transition-all duration-300 hover:scale-105 hover:shadow-sky-500/30">
                                    <div className="w-full h-[240px] bg-gray-700">
                                        <img src={imgTemp} alt="" srcSet="" className="w-full h-full object-cover" />
                                    </div>
                                    <div className="p-3 ">
                                        <div className="ml-4">
                                            <h3 className="text-white text-sm font-semibold truncate hover:text-clip hover:whitespace-normal" title={item.name || item.slug}>{item.name || item.slug}</h3>
                                            <div className="flex items-center mt-1.5">
                                                {[...Array(5)].map((_, i) => (<i key={i} className={`fa-solid fa-star text-xs ${i < stars ? 'text-amber-400' : 'text-gray-500'}`}                                           ></i>))}                                       <span className="text-xs text-gray-400 ml-1.5">({displayRating})</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )
                        }

                        return (
                            <Link
                                to={`/phim/${movieSlug}/${item._id}`}
                                key={movieSlug}
                                className="flex-shrink-0 w-[170px] bg-gray-800 rounded-lg shadow-lg overflow-hidden group transform transition-all duration-300 hover:scale-105 hover:shadow-sky-500/30 block"
                                title={item.name || item.slug}
                            >
                                <div className="w-full h-[240px] bg-gray-700">
                                    <img
                                        src={imgTemp}
                                        alt={item.name || item.slug || "Movie poster"}
                                        className="w-full h-full object-cover"
                                    />
                                </div>
                                <div className="p-3">
                                    <h3 className="text-white text-sm font-semibold truncate group-hover:text-clip group-hover:whitespace-normal" title={item.name || item.slug}>{item.name || item.slug || "Tên phim"}</h3>
                                    {item.year && <p className="text-xs text-gray-400 mt-1">{item.year}</p>}
                                </div>
                            </Link>
                        );
                    })}
                </Carousel>
            </div>
        </div>
        
    )
}
MovieList.propTypes = {
    title: PropTypes.string,
    data: PropTypes.array
};

export default MovieList
