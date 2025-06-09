import React from 'react'

const MainNews = () => {
   return(
        <section className="text-white py-8 md:py-12 px-4 md:px-12 bg-black">
        <div className="container mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 md:gap-8">
                {/* Popular Column */}
                <div className="lg:col-span-3 space-y-6">
                    <h3 className="text-xl font-semibold uppercase border-l-4 border-red-500 pl-3 mb-4">Phổ biến</h3>
                    <ul className="space-y-3">
                        <li className="pb-3 border-b border-gray-700 last:border-b-0">
                            <a href="#" className="group">
                                <span className="text-red-500 font-bold text-2xl mr-2">01</span>
                                <span className="text-gray-300 group-hover:text-white transition-colors">Oscar 2025: Nominees Announced</span>
                                <p className="text-xs text-gray-500 ml-8 group-hover:text-red-400">Awards</p>
                            </a>
                        </li>
                        <li className="pb-3 border-b border-gray-700 last:border-b-0">
                            <a href="#" className="group">
                                <span className="text-red-500 font-bold text-2xl mr-2">02</span>
                                <span className="text-gray-300 group-hover:text-white transition-colors">The Lord of the Rings Series Teaser Drops</span>
                                <p className="text-xs text-gray-500 ml-8 group-hover:text-red-400">TV Shows</p>
                            </a>
                        </li>
                        <li className="pb-3 border-b border-gray-700 last:border-b-0">
                            <a href="#" className="group">
                                <span className="text-red-500 font-bold text-2xl mr-2">03</span>
                                <span className="text-gray-300 group-hover:text-white transition-colors">Tom Holland's New Role: Indiana Jones?</span>
                                <p className="text-xs text-gray-500 ml-8 group-hover:text-red-400">Movies</p>
                            </a>
                        </li>
                         <li className="pb-3 border-b border-gray-700 last:border-b-0">
                            <a href="#" className="group">
                                <span className="text-red-500 font-bold text-2xl mr-2">04</span>
                                <span className="text-gray-300 group-hover:text-white transition-colors">10 Film Adaptations Worth Waiting For</span>
                                <p className="text-xs text-gray-500 ml-8 group-hover:text-red-400">Features</p>
                            </a>
                        </li>
                         <li className="pb-3 border-b border-gray-700 last:border-b-0">
                            <a href="#" className="group">
                                <span className="text-red-500 font-bold text-2xl mr-2">05</span>
                                <span className="text-gray-300 group-hover:text-white transition-colors">ClassNclassNameic Romcoms to Watch</span>
                                <p className="text-xs text-gray-500 ml-8 group-hover:text-red-400">Recommendations</p>
                            </a>
                        </li>
                        <li className="pb-3 border-b border-gray-700 last:border-b-0">
                            <a href="#" className="group">
                                <span className="text-red-500 font-bold text-2xl mr-2">05</span>
                                <span className="text-gray-300 group-hover:text-white transition-colors">ClassNclassNameic Romcoms to Watch</span>
                                <p className="text-xs text-gray-500 ml-8 group-hover:text-red-400">Recommendations</p>
                            </a>
                        </li>
                        <li className="pb-3 border-b border-gray-700 last:border-b-0">
                            <a href="#" className="group">
                                <span className="text-red-500 font-bold text-2xl mr-2">05</span>
                                <span className="text-gray-300 group-hover:text-white transition-colors">ClassNclassNameic Romcoms to Watch</span>
                                <p className="text-xs text-gray-500 ml-8 group-hover:text-red-400">Recommendations</p>
                            </a>
                        </li>
                        <li className="pb-3 border-b border-gray-700 last:border-b-0">
                            <a href="#" className="group">
                                <span className="text-red-500 font-bold text-2xl mr-2">05</span>
                                <span className="text-gray-300 group-hover:text-white transition-colors">ClassNclassNameic Romcoms to Watch</span>
                                <p className="text-xs text-gray-500 ml-8 group-hover:text-red-400">Recommendations</p>
                            </a>
                        </li>
                    </ul>
                </div>

                {/* Main News Column */}
                <div className="lg:col-span-6 space-y-6">
                    <h3 className="text-xl font-semibold uppercase border-l-4 border-red-500 pl-3 mb-4">Tin tức chính</h3>
                    <div className="bg-gray-800 rounded-lg shadow-xl overflow-hidden group">
                        <img src="https://placehold.co/600x400/333333/FFFFFF?text=News+Img" alt="Main news title" className="w-full h-64 md:h-80 object-cover group-hover:opacity-90 transition-opacity" />
                        <div className="p-4 md:p-6">
                            <span className="text-xs text-red-400 uppercase font-semibold">TV Review</span>
                            <h4 className="text-xl md:text-2xl font-bold my-2 hover:text-red-400 transition-colors cursor-pointer">The series 'It will hurt': Ben Whishaw as a tortured obstetrician-gynecologist</h4>
                            <p className="text-gray-400 text-sm leading-relaxed">A gripping portrayal of the pressures within the healthcare system, Ben Whishaw delivers a stunning performance...</p>
                        </div>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div className="bg-gray-800 rounded-lg shadow-lg overflow-hidden group flex items-start space-x-3 p-3">
                            <img src="https://placehold.co/200x120/444444/FFFFFF?text=News" alt="Sub article 1" className="w-24 h-20 object-cover rounded flex-shrink-0 group-hover:opacity-90 transition-opacity" />
                            <div>
                                <span className="text-xs text-red-400 uppercase font-semibold">Movies</span>
                                <h5 className="text-sm font-semibold mt-1 hover:text-red-400 transition-colors cursor-pointer">'Death on the Nile': Director Branagh spoils the film</h5>
                            </div>
                        </div>
                        <div className="bg-gray-800 rounded-lg shadow-lg overflow-hidden group flex items-start space-x-3 p-3">
                            <img src="https://placehold.co/200x120/444444/FFFFFF?text=News" alt="Sub article 2" className="w-24 h-20 object-cover rounded flex-shrink-0 group-hover:opacity-90 transition-opacity" />
                            <div>
                                <span className="text-xs text-red-400 uppercase font-semibold">Series</span>
                                <h5 className="text-sm font-semibold mt-1 hover:text-red-400 transition-colors cursor-pointer">'Jack Reacher': The perfect adaptation of the cult thriller</h5>
                            </div>
                        </div>
                        <div className="bg-gray-800 rounded-lg shadow-lg overflow-hidden group flex items-start space-x-3 p-3">
                            <img src="https://placehold.co/200x120/444444/FFFFFF?text=News" alt="Sub article 3" className="w-24 h-20 object-cover rounded flex-shrink-0 group-hover:opacity-90 transition-opacity" />
                            <div>
                                <span className="text-xs text-red-400 uppercase font-semibold">Biopic</span>
                                <h5 className="text-sm font-semibold mt-1 hover:text-red-400 transition-colors cursor-pointer">'King Richard': A laudatory biopic about fatherhood</h5>
                            </div>
                        </div>
                    </div>
                </div>

                {/* New Video Column */}
                <div className="lg:col-span-3 space-y-6">
                    <h3 className="text-xl font-semibold uppercase border-l-4 border-red-500 pl-3 mb-4">Video Mới</h3>
                    <ul className="space-y-4">
                        <li className="flex items-center space-x-3 group cursor-pointer bg-gray-800 p-2 rounded-lg hover:bg-gray-700 transition-colors">
                            <div className="relative flex-shrink-0">
                                <img src="https://placehold.co/250x150/222222/FFFFFF?text=Video" alt="Video 1" className="w-32 h-20 object-cover rounded-md" />
                                <div className="absolute inset-0 bg-black bg-opacity-30 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                                    <i className="fa-solid fa-play text-white text-2xl"></i>
                                </div>
                            </div>
                            <div>
                                <h5 className="text-sm font-semibold text-gray-200 group-hover:text-white">How to Love (Trailer)</h5>
                                <p className="text-xs text-gray-500">2:30</p>
                            </div>
                        </li>
                        <li className="flex items-center space-x-3 group cursor-pointer bg-gray-800 p-2 rounded-lg hover:bg-gray-700 transition-colors">
                            <div className="relative flex-shrink-0">
                                <img src="https://placehold.co/250x150/222222/FFFFFF?text=Video" alt="Video 2" className="w-32 h-20 object-cover rounded-md" />
                                <div className="absolute inset-0 bg-black bg-opacity-30 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                                    <i className="fa-solid fa-play text-white text-2xl"></i>
                                </div>
                            </div>
                            <div>
                                <h5 className="text-sm font-semibold text-gray-200 group-hover:text-white">How the Film Was Shot (Behind the Scenes)</h5>
                                <p className="text-xs text-gray-500">15:00</p>
                            </div>
                        </li>
                        <li className="flex items-center space-x-3 group cursor-pointer bg-gray-800 p-2 rounded-lg hover:bg-gray-700 transition-colors">
                            <div className="relative flex-shrink-0">
                                <img src="https://placehold.co/250x150/222222/FFFFFF?text=Video" alt="Video 3" className="w-32 h-20 object-cover rounded-md" />
                                <div className="absolute inset-0 bg-black bg-opacity-30 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                                    <i className="fa-solid fa-play text-white text-2xl"></i>
                                </div>
                            </div>
                            <div>
                                <h5 className="text-sm font-semibold text-gray-200 group-hover:text-white">Trailer Movie - You Drive!</h5>
                                <p className="text-xs text-gray-500">1:45</p>
                            </div>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    </section>
     )
}

export default MainNews