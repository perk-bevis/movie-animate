// import React from 'react'

// const Actor = () => {
//   return (
//    <div>
//         <h3 className="text-xl font-semibold mb-4">Diễn Viên</h3>
//         <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
//             {actors && actors.length > 0 ? (
//                 actors.map((actor, index) => (
//                     <div key={index} className="text-center">
//                         <img src={`https://ui-avatars.com/api/?name=${actor.replace(/\s/g, "+")}&background=1F2937&color=FFFFFF`} alt={actor} className="rounded-full mx-auto w-24 h-24 object-cover mb-2" />
//                         <p className="text-sm text-gray-300">{actor}</p>
//                     </div>
//                 ))
//             ) : (
//                 <p>Không có thông tin diễn viên.</p>
//             )}
//         </div>
//     </div>
//   )
// }

// export default Actor
import React from 'react';
import { Link } from 'react-router-dom'; // 1. Import Link vào đây

// Hàm tiện ích để chuyển tên thành slug (ví dụ: "Lưu Diệc Phi" -> "luu-diec-phi")
const slugify = (text) => {
    return text
        .toString()
        .toLowerCase()
        .normalize('NFD') // Chuẩn hóa Unicode
        .replace(/[\u0300-\u036f]/g, '') // Bỏ dấu
        .replace(/\s+/g, '-') // Thay khoảng trắng bằng gạch ngang
        .replace(/[^\w\-]+/g, '') // Bỏ các ký tự đặc biệt
        .replace(/\-\-+/g, '-') // Bỏ các gạch ngang thừa
        .replace(/^-+/, '') // Bỏ gạch ngang ở đầu
        .replace(/-+$/, ''); // Bỏ gạch ngang ở cuối
};

const Actor = ({ actors }) => { // Component nhận props `actors`
    return (
        <div>
            <h3 className="text-xl font-semibold mb-4">Diễn Viên</h3>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
                {actors && actors.length > 0 ? (
                    actors.map((actorName, index) => (
                        // 2. Bọc mỗi diễn viên bằng thẻ Link
                        <Link 
                            to={`/dien-vien/${slugify(actorName)}`} // 3. Tạo đường dẫn động
                            key={index} 
                            className="text-center group"
                        >
                            <img 
                                src={`https://ui-avatars.com/api/?name=${actorName.replace(/\s/g, "+")}&background=1F2937&color=FFFFFF`} 
                                alt={actorName} 
                                className="rounded-full mx-auto w-24 h-24 object-cover mb-2 transition-transform duration-300 group-hover:scale-110" 
                            />
                            <p className="text-sm text-gray-300 group-hover:text-red-500 transition-colors">
                                {actorName}
                            </p>
                        </Link>
                    ))
                ) : (
                    <p>Không có thông tin diễn viên.</p>
                )}
            </div>
        </div>
    );
};

export default Actor;