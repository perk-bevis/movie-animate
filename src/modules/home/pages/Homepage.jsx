import React from "react";
import Banner from "../components/Banner";
import MovieList from "../../movie/components/MovieList";
import MainNews from "../components/Mainnews";
import Moviesearch from "../../movie/components/Moviesearch";
import Pagination from "../../../components/ui/Pagination";
const Homepage = ({
  currentBannerVideo,
  movieSearch,
  movies,
  movieSeries,
  movieSingle,
  movieAnimated,
  currentPage,
  totalPages,
  handlePageChange,
}) => {
  return (
    <>
      <Banner data={currentBannerVideo} />
      {movieSearch.length > 0 ? (
        <Moviesearch title={"Kết quả tìm kiếm"} data={movieSearch} />
      ) : (
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
        </>
      )}
    </>
  );
};

export default Homepage;
