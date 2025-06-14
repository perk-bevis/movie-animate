import React, { useState } from 'react'
import Navbar from './components/layout/Navbar'
import { publicRouter } from './routes/routes'
import { Routes, Route } from 'react-router-dom'
import Banner from './features/Banner'
import MovieList from './features/MovieList'
import MainNews from './features/Mainnews'
import Footer from './components/layout/Footer'
import { useData } from './pages/data/fakeListfilm'
import Pagination from './components/ui/Pagination' 
import Moviesearch from './features/Moviesearch'

const App = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = 60;
  const {
    movies,
    movieSeries,
    movieSingle,
    movieAnimated,
    currentBannerVideo,
    tvshow,
    movieSearch,
    handleSearch
  } = useData(currentPage)
  const handlePageChange = (page) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };
  
  return (
    <>
      <div className='bg-black text-white min-h-screen font-sans'>
        <Navbar onSearch={handleSearch}/>
        <Routes>
          <Route path="/" element={
            <>
              <Banner data={currentBannerVideo} />
              {movieSearch.length > 0 ? <Moviesearch title={"kết quả tìm kiếm"} data={movieSearch}/> : (
                <>
                <MovieList title={"Phim mới cập nhật"} data={movies} />
              <MovieList title={"Phim Bộ"} data={movieSeries} />
              <MovieList title={"Phim Lẻ"} data={movieSingle} />
              <MovieList title={"Hoạt Hình"} data={movieAnimated} />
              <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={handlePageChange}
              />
              <MainNews />
              <Footer />
                </>
              )}
            </>
          } />
          {publicRouter.map((route, index) => (
            <Route key={index} path={route.path} element={route.element} />
          ))}
        </Routes>
      </div>
    </>

  )
}

export default App