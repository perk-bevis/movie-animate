import Series from "../pages/Navbar/Series"
import Single from "../pages/Navbar/Single"
import Show from "../pages/Navbar/Show"
import Animates from "../pages/Navbar/Animates"
import Football from "../pages/Navbar/Football"
import Genre from "../pages/navbar/Genre"
import MovieDetailPage from "../layout/MovieDetailPage"
import Watchingtv from "../layout/Watchingtv"
const publicRouter = [
    { path: "/phim-bo", element: <Series /> },
    { path: "/phim-le", element: <Single /> },
    { path: "/tv-show", element: <Show /> },
    { path: "/hoat-hinh", element: <Animates /> },
    { path: "/the-thao", element: <Football /> },
    { path: "/the-loai", element: <Genre /> },
    { path: "/phim/:slug/:id", element: <MovieDetailPage /> },
    { path: "/watchingtv/:slug/:tap", element: <Watchingtv /> },
]

const privateRouter = [

]

export { publicRouter, privateRouter }