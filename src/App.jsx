import React, { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import { useData } from './pages/data/fakeListfilm';
import { publicRouter, privateRouter } from './routes/routes';

// Import các component và layout mới
import MainLayout from './layout/MainLayout';
import Homepage from './pages/home/Homepage';

const App = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = 60;
  const {
    movies,
    movieSeries,
    movieSingle,
    movieAnimated,
    currentBannerVideo,
    movieSearch,
    handleSearch
  } = useData(currentPage);

  const handlePageChange = (page) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className='bg-black text-white min-h-screen font-sans'>
      <Routes>
        <Route element={<MainLayout onSearch={handleSearch} />}>
          <Route
            path="/"
            element={
              <Homepage
                currentBannerVideo={currentBannerVideo}
                movieSearch={movieSearch}
                movies={movies}
                movieSeries={movieSeries}
                movieSingle={movieSingle}
                movieAnimated={movieAnimated}
                currentPage={currentPage}
                totalPages={totalPages}
                handlePageChange={handlePageChange}
              />
            }
          />
          {publicRouter.map((route, index) => (
            <Route key={index} path={route.path} element={route.element} />
          ))}
        </Route>
        {privateRouter.map((route, index) => (
          <Route key={index} path={route.path} element={route.element} />
        ))}
      </Routes>
    </div>
  );
};

export default App;