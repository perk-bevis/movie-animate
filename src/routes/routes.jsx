import Series from "../modules/movie/pages/Series";
import Single from "../modules/movie/pages/Single";
import Show from "../modules/movie/pages/Show";
import Animates from "../modules/movie/pages/Animates";
import Football from "../modules/movie/pages/Football";
import MovieDetailPage from "../modules/movie/pages/MovieDetailPage";
import Watchingtv from "../modules/movie/pages/Watchingtv";
import MoviesByYearPage from "../modules/movie/pages/MoviesByYearPage";
import Loginpage from "../modules/auth/pages/LoginPage";
import Registerpage from "../modules/auth/pages/RegisterPage";

const publicRouter = [
  { path: "/phim-bo", element: <Series /> },
  { path: "/phim-le", element: <Single /> },
  { path: "/tv-show", element: <Show /> },
  { path: "/hoat-hinh", element: <Animates /> },
  { path: "/the-thao", element: <Football /> },
  { path: "/phim/:slug/:id", element: <MovieDetailPage /> },
  { path: "/watchingtv/:slug/:tap", element: <Watchingtv /> },
  { path: "/nam/:year", element:<MoviesByYearPage />}
];

const privateRouter = [
  { path: "/dang-nhap", element: <Loginpage /> },
  { path: "/dang-ky", element: < Registerpage /> },
];

export { publicRouter, privateRouter };
