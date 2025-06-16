import React from 'react'

const Trailer = () => {
  return (
    <div>
        <h3 className="text-xl font-semibold mb-4">Trailer</h3>
        {trailerUrl ? (
            <div className="aspect-w-16 aspect-h-9">
                <iframe
                    src={trailerUrl.replace("watch?v=", "embed/")}
                    title="Trailer"
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    className="w-full h-full rounded-lg"
                ></iframe>
            </div>
        ) : (
            <p>Không có trailer.</p>
        )}
    </div>
  )
}

export default Trailer
