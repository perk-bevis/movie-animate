import React from 'react';
const Pagination = ({ currentPage, totalPages = 10, onPageChange }) => {
    const getVisiblePages = () => {
        const delta = 2; // Số trang hiển thị xung quanh trang hiện tại
        const range = [];
        const rangeWithDots = [];

        for (let i = Math.max(2, currentPage - delta); 
             i <= Math.min(totalPages - 1, currentPage + delta); 
             i++) {
            range.push(i);
        }

        if (currentPage - delta > 2) {
            rangeWithDots.push(1, '...');
        } else {
            rangeWithDots.push(1);
        }

        rangeWithDots.push(...range);

        if (currentPage + delta < totalPages - 1) {
            rangeWithDots.push('...', totalPages);
        } else {
            rangeWithDots.push(totalPages);
        }

        return rangeWithDots;
    };

    const visiblePages = getVisiblePages();

    return (
        <div className="flex justify-center py-4">
            <nav aria-label="Page navigation">
                <ul className="flex items-center -space-x-px h-10 text-base">
                    <li>
                        <button
                            onClick={() => currentPage > 1 && onPageChange(currentPage - 1)}
                            disabled={currentPage === 1}
                            className={`flex items-center justify-center px-4 h-10 ms-0 leading-tight border border-e-0 border-gray-300 rounded-s-lg transition-colors ${
                                currentPage === 1
                                    ? 'text-gray-400 bg-gray-200 cursor-not-allowed'
                                    : 'text-gray-700 bg-white hover:bg-indigo-100 hover:text-indigo-700'
                            }`}
                        >
                            <span className="sr-only">Previous</span>
                            &lt; Previous
                        </button>
                    </li>

                    {visiblePages.map((page, index) => (
                        <li key={index}>
                            {page === '...' ? (
                                <span className="flex items-center justify-center px-4 h-10 leading-tight text-gray-700 bg-white border border-gray-300">
                                    ...
                                </span>
                            ) : (
                                <button
                                    onClick={() => onPageChange(page)}
                                    className={`flex items-center justify-center px-4 h-10 leading-tight border border-gray-300 transition-colors ${
                                        currentPage === page
                                            ? 'z-10 text-white bg-indigo-500 border-indigo-500 hover:bg-indigo-600 hover:text-white'
                                            : 'text-gray-700 bg-white hover:bg-indigo-100 hover:text-indigo-700'
                                    }`}
                                >
                                    {page}
                                </button>
                            )}
                        </li>
                    ))}

                    <li>
                        <button
                            onClick={() => currentPage < totalPages && onPageChange(currentPage + 1)}
                            disabled={currentPage === totalPages}
                            className={`flex items-center justify-center px-4 h-10 leading-tight border border-s-0 border-gray-300 rounded-e-lg transition-colors ${
                                currentPage === totalPages
                                    ? 'text-gray-400 bg-gray-200 cursor-not-allowed'
                                    : 'text-gray-700 bg-white hover:bg-indigo-100 hover:text-indigo-700'
                            }`}
                        >
                            <span className="sr-only">Next</span>
                            Next &gt;
                        </button>
                    </li>
                </ul>
            </nav>
        </div>
    );
};

export default Pagination;