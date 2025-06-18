import { auth, provider } from '../../../firebase/FilebaseConfig';
import { signInWithPopup } from 'firebase/auth';
import { Link, useNavigate } from 'react-router-dom';
import Loginform from '../components/Loginform';


const Loginpage = () => {
    // hook 
    const navigate = useNavigate()

    // đăng nhập vs api

    // đăng nhập với google
    const signinWidthGoogle = () => {
        signInWithPopup(auth ,provider)
        .then(response =>{
            const userLocal = {
                email: response.user.email,
                userName: response.user.displayName,
                image: response.user.photoURL,
                userId: response.user.uid
            }

            // lưu thông tin lên local
            localStorage.setItem("userLocal", JSON.stringify(userLocal))
            // chuyển hướng về trang home
            navigate("/")
        })
        .catch(error =>{
            console.log(error)
        })
    }
  return (
        <div className="min-h-screen bg-[#121212] flex flex-col justify-center items-center p-4">

            <div className="w-full max-w-md mb-4">
                <p className="text-sm text-gray-400">
                    <Link to="/" className="hover:text-white">
                    🏠 Codemetech
                    </Link>
                    <span className="mx-2">&gt;</span>
                    <span>Đăng Nhập</span>
                </p>
            </div>

            <div className="w-full max-w-md bg-[#1E1E1E] p-8 rounded-lg shadow-lg">
                
                <h1 className="text-3xl font-bold text-white text-center mb-6">Đăng Nhập</h1>

                <button onClick={signinWidthGoogle} className="w-full bg-white text-gray-800 font-semibold py-3 px-4 rounded-lg flex items-center justify-center gap-3 transition-colors hover:bg-gray-200 mb-6">
                    <svg className="w-5 h-5" viewBox="0 0 48 48">
                        <path fill="#FFC107" d="M43.611,20.083H42V20H24v8h11.303c-1.649,4.657-6.08,8-11.303,8c-6.627,0-12-5.373-12-12s5.373-12,12-12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C12.955,4,4,12.955,4,24s8.955,20,20,20s20-8.955,20-20C44,22.659,43.862,21.35,43.611,20.083z"></path>
                        <path fill="#FF3D00" d="M6.306,14.691l6.571,4.819C14.655,15.108,18.961,12,24,12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C16.318,4,9.656,8.337,6.306,14.691z"></path>
                        <path fill="#4CAF50" d="M24,44c5.166,0,9.86-1.977,13.409-5.192l-6.19-5.238C29.211,35.091,26.715,36,24,36c-5.222,0-9.619-3.317-11.283-7.946l-6.522,5.025C9.505,39.556,16.227,44,24,44z"></path>
                        <path fill="#1976D2" d="M43.611,20.083H42V20H24v8h11.303c-0.792,2.237-2.231,4.166-4.087,5.571l6.19,5.238C43.021,36.251,44,30.638,44,24C44,22.659,43.862,21.35,43.611,20.083z"></path>
                    </svg>
                    Đăng nhập bằng Google
                </button>
                <Loginform/>
            </div>
        </div>
    );
}

export default Loginpage
