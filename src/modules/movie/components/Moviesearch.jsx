import React from 'react'
import PropTypes from "prop-types";
import { Link } from 'react-router-dom'

const Moviesearch = ({ title, data }) => {

  return (
    <div className="text-white p-10 mb-10">
      <h2 className="uppercase text-xl font-bold mb-4">{title}</h2>
      <div className='grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-8'>
        {data && data.map((item) => {
          return (
            <div key={item.id} className="w-[200px] h-[300px] relative gap-2 group" onClick={() => handleTrailer(item.id)}>
              <Link  to={`/phim/${item.slug || item._id}/${item._id}`}>
                <div className="group-hover:scale-105 transition-transform duration-500 ease-in-out w-full h-full cursor-pointer">
                  <div className="absolute top-0 left-0 w-full h-full bg-black/40 " />
                  <img src={`${import.meta.env.VITE_IMG_URL}${item.poster_url}`} alt={item.title} className="w-full h-full object-cover" />

                  <div className="absolute bottom-4 left-2">
                    <p className="uppercase text-md">
                      {item.name || item.origin_name}
                    </p>
                  </div>
                </div>
              </Link>
            </div>
          )
        })}
      </div>
    </div>
  )
}

Moviesearch.propTypes = {
  title: PropTypes.string,
  data: PropTypes.array
}

export default Moviesearch
