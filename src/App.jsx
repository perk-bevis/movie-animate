import React, { useState } from 'react'
import Navbar from './components/layout/Navbar'
import { publicRouter } from './routes/routes'
import { Routes, Route } from 'react-router-dom'
import Banner from './features/Banner'
import MovieList from './features/MovieList'
import MainNews from './features/Mainnews'
import Footer from './components/layout/Footer'
import Home from './pages/navbar/Home'
import Show from './pages/Navbar/Show'
import { useData } from './pages/data/fakeListfilm'
import Pagination from './components/ui/Pagination' 

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
  } = useData(currentPage)
  const handlePageChange = (page) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };
  return (
    <>
      <div className='bg-black text-white min-h-screen font-sans'>
        <Navbar />
        <Routes>
          <Route path="/" element={
            <>
              <Home />
              <Banner data={currentBannerVideo} />
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