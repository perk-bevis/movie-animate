import Series from "../pages/Navbar/Series"
import Single from "../pages/Navbar/Single"
import Show from "../pages/Navbar/Show"
import Animates from "../pages/Navbar/Animates"
import Football from "../pages/Navbar/Football"
import Genre from "../pages/Navbar/Genre"
import MovieDetailPage from "../layout/MovieDetailPage"
import Watchingtv from "../layout/Watchingtv"
import Actor from "../components/layout/Actor"
import Loginpage from "../modules/auth/pages/Loginpage"
import Registerpage from "../modules/auth/pages/Registerpage"

const publicRouter = [
    { path: "/phim-bo", element: <Series /> },
    { path: "/phim-le", element: <Single /> },
    { path: "/tv-show", element: <Show /> },
    { path: "/hoat-hinh", element: <Animates /> },
    { path: "/the-thao", element: <Football /> },
    { path: "/the-loai", element: <Genre /> },
    { path: "/phim/:slug/:id", element: <MovieDetailPage /> },
    { path: "/watchingtv/:slug/:tap", element: <Watchingtv /> },
    { path: "/dien-vien/:actorSlug", element: <Actor/>}
]

const privateRouter = [
    { path: "/dang-nhap", element: <Loginpage /> },
    { path: "/dang-ky", element: <Registerpage /> } 
]

export { publicRouter, privateRouter }