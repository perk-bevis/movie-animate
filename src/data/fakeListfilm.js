import React, { useEffect, useState } from 'react';

// Custom hook để fetch data với pagination
export function useData(currentPage = 1) {
    // trả về danh sách phim mới cập nhật
    const [movies, setMovies] = useState([]);
    // trả về danh sách phim bộ
    const [movieSeries, setMovieSeries] = useState([]);
     // trả về danh sách phim lẻ
    const [movieSingle, setMovieSingle] = useState([]);
    // trả về danh sách hoạt hình
    const [movieAnimated, setMovieAnimated] = useState([]);
     // trả về danh sách tv show
    const [currentBannerVideo, setCurrentBannerVideo] = useState(null);
    // trả thái tải dữ liệu trang 
    const [loading, setLoading] = useState(false);
    // trả về kết quả tìm kiếm
    const [movieSearch, setMovieSearch] = useState([])
    useEffect(() => {
        const fetchLatestMovies = async () => {
            setLoading(true);
            try {
                const pageParam = `page=${currentPage}`;
                
                const url1 = `https://phimapi.com/danh-sach/phim-moi-cap-nhat?${pageParam}`;
                const url2 = `https://phimapi.com/v1/api/danh-sach/phim-bo?limit=60&${pageParam}`;
                const url3 = `https://phimapi.com/v1/api/danh-sach/phim-le?limit=60&${pageParam}`;
                const url4 = `https://phimapi.com/v1/api/danh-sach/hoat-hinh?limit=60&${pageParam}`;
                const url5 = `https://phimapi.com/v1/api/danh-sach/tv-shows?limit=60&${pageParam}`;

                const [res1, res2, res3, res4, res5] = await Promise.all([
                    fetch(url1),
                    fetch(url2),
                    fetch(url3),
                    fetch(url4),
                    fetch(url5),
                ]);

                const data1 = await res1.json();
                const data2 = await res2.json();
                const data3 = await res3.json();
                const data4 = await res4.json();
                const data5 = await res5.json();
                setMovies(data1.items || []);
                setMovieSeries(data2.data?.items || []);
                setMovieSingle(data3.data?.items || []);
                setMovieAnimated(data4.data?.items || []);
                setCurrentBannerVideo(data5.data?.items || []);
            } catch (error) {
                console.error('Error fetching movies:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchLatestMovies();
    }, [currentPage]);

    const handleSearch = async (keywords) => {
        setMovieSearch([]);
        try {
            const url = `https://phimapi.com/v1/api/tim-kiem?keyword=${keywords}&limit=50`;
            const response = await fetch(url);
            const datas = await response.json();
            setMovieSearch(datas.data.items)
        } 
        catch (error) {
            console.error("Lỗi khi tìm kiếm phim:", error);
        }
    };
    return {
        movies,
        movieSeries,
        movieSingle,
        movieAnimated,
        currentBannerVideo,
        loading,
        movieSearch,
        handleSearch
    };
}
