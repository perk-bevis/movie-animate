import React from 'react'
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

const App = () => {
  const {
    movies,
    movieSeries,
    movieSingle,
    movieAnimated,
    currentBannerVideo,
    tvshow,
  } = useData()
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
              <Show title={"tv show"} />
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