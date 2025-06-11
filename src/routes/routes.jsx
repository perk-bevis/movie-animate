import Home from "../pages/navbar/Home"
import Series from "../pages/Navbar/Series"
import Single from "../pages/navbar/Single"
import Show from "../pages/Navbar/Show"
import Animates from "../pages/navbar/Animates"
import Football from "../pages/navbar/Football"
import Genre from "../pages/navbar/Genre"
import MovieDetailPage from "../layout/MovieDetailPage"
import Watchingtv from "../layout/Watchingtv"
import Banner from "../features/Banner"
const publicRouter = [
    { path: "/", element: <Home /> },
    { path: "/Series", element: <Series /> },
    { path: "/Single", element: <Single /> },
    { path: "/tv-show", element: <Show /> },
    { path: "/Animates", element: <Animates /> },
    { path: "/Football", element: <Football /> },
    { path: "/Genre", element: <Genre /> },
    { path: "/phim/:slug/:id", element: <MovieDetailPage /> },
    { path: "/watchingtv/:slug/:tap", element: <Watchingtv /> },
]

const privateRouter = [

]

export { publicRouter, privateRouter }