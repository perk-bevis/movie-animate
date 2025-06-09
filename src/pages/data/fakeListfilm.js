import { useEffect, useState } from 'react'

export function useData() {
    // lưu trữ phim mới cập nhật
    const [movies, setMovies] = useState([]);
    const [movieSeries, setMovieSeries] = useState([]);
    const [movieSingle, setMovieSingle] = useState([]);
    const [movieAnimated, setMovieAnimated] = useState([]);
    const [currentBannerVideo, setCurrentBannerVideo] = useState(null);
    const [tvshow,setTvshow] = useState(null)
    useEffect(() => {
        const fetchLatestMovies = async () => {
            const url1 = 'https://phimapi.com/danh-sach/phim-moi-cap-nhat?page=1'
            const url2 = 'https://phimapi.com/v1/api/danh-sach/phim-bo?limit=60&page=1'
            const url3 = 'https://phimapi.com/v1/api/danh-sach/phim-le?limit=10&page=1&year=2024'
            const url4 = 'https://phimapi.com/v1/api/danh-sach/hoat-hinh?limit=60&page=1&year=2025'
            const url5 = 'https://phimapi.com/v1/api/danh-sach/tv-shows?limit=10&page=1'
            const url6 = 'https://phimapi.com/v1/api/danh-sach/tv-shows?limit=50'


            const [res1, res2, res3, res4, res5 ,res6] = await Promise.all([
                fetch(url1),
                fetch(url2),
                fetch(url3),
                fetch(url4),
                fetch(url5),
                fetch(url6),

            ])
            const data1 = await res1.json();
            const data2 = await res2.json();
            const data3 = await res3.json();
            const data4 = await res4.json();
            const data5 = await res5.json();
            const data6 = await res6.json();
            console.log("data1",data2)
            // console.log(data2)
            // console.log(data3)
            // console.log(data4)
            // console.log(data5)
            setMovies(data1.items)
            setMovieSeries(data2.data.items)
            setMovieSingle(data3.data.items)
            setMovieAnimated(data4.data.items)
            setCurrentBannerVideo(data5.data.items)
            setTvshow(data6.data.items)
        }
        fetchLatestMovies()
    }, [])
    return {
        movies,
        movieSeries,
        movieSingle,
        movieAnimated,
        currentBannerVideo,
        tvshow,
    }
}
