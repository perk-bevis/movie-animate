import React, { useEffect, useState } from 'react';

// Custom hook để fetch data với pagination
export function useData(currentPage = 1) {
    const [movies, setMovies] = useState([]);
    const [movieSeries, setMovieSeries] = useState([]);
    const [movieSingle, setMovieSingle] = useState([]);
    const [movieAnimated, setMovieAnimated] = useState([]);
    const [currentBannerVideo, setCurrentBannerVideo] = useState(null);
    const [tvshow, setTvshow] = useState(null);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const fetchLatestMovies = async () => {
            setLoading(true);
            try {
                const pageParam = `page=${currentPage}`;
                
                const url1 = `https://phimapi.com/danh-sach/phim-moi-cap-nhat?${pageParam}`;
                const url2 = `https://phimapi.com/v1/api/danh-sach/phim-bo?limit=60&${pageParam}`;
                const url3 = `https://phimapi.com/v1/api/danh-sach/phim-le?limit=10&${pageParam}`;
                const url4 = `https://phimapi.com/v1/api/danh-sach/hoat-hinh?limit=60&${pageParam}`;
                const url5 = `https://phimapi.com/v1/api/danh-sach/tv-shows?limit=10&${pageParam}`;
                const url6 = `https://phimapi.com/v1/api/danh-sach/tv-shows?limit=50&${pageParam}`;

                const [res1, res2, res3, res4, res5, res6] = await Promise.all([
                    fetch(url1),
                    fetch(url2),
                    fetch(url3),
                    fetch(url4),
                    fetch(url5),
                    fetch(url6),
                ]);

                const data1 = await res1.json();
                const data2 = await res2.json();
                const data3 = await res3.json();
                const data4 = await res4.json();
                const data5 = await res5.json();
                const data6 = await res6.json();
                setMovies(data1.items || []);
                setMovieSeries(data2.data?.items || []);
                setMovieSingle(data3.data?.items || []);
                setMovieAnimated(data4.data?.items || []);
                setCurrentBannerVideo(data5.data?.items || []);
                setTvshow(data6.data?.items || []);
            } catch (error) {
                console.error('Error fetching movies:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchLatestMovies();
    }, [currentPage]);

    return {
        movies,
        movieSeries,
        movieSingle,
        movieAnimated,
        currentBannerVideo,
        tvshow,
        loading,
    };
}
