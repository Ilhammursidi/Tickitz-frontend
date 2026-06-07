import React from 'react';

function MovieCard({ id, poster, title, release, genre, onDetail, onBuyTicket }) {
    return (
        /* Tetap pertahankan layout geser (shrink-0 w-62) di sini */
        <div className="snap-center shrink-0 w-62 flex flex-col">
            
            {/* Pembungkus Poster dengan Efek Hover Tombol */}
            <div className="group relative h-105 w-full rounded-2xl overflow-hidden shadow-md cursor-pointer">
                
                {/* Gambar Poster */}
                <img
                    src={poster}
                    alt={title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />

                {/* Lapisan Hitam Gelap & Tombol Aksi saat di-Hover */}
                <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-center items-center gap-4 px-6">
                    
                    {/* Tombol Details */}
                    <button 
                        onClick={() => onDetail ? onDetail(id) : console.log(`Detail ${id}`)}
                        className="w-full py-2.5 border-2 border-white text-white font-semibold rounded-xl hover:bg-white/10 transition-colors duration-200 text-sm"
                    >
                        Details
                    </button>

                    {/* Tombol Buy Ticket */}
                    <button 
                        onClick={() => onBuyTicket ? onBuyTicket(id) : console.log(`Beli tiket ${id}`)}
                        className="w-full py-3 bg-blue-600 text-white font-semibold rounded-xl hover:bg-blue-700 transition-colors duration-200 text-sm shadow-lg"
                    >
                        Buy Ticket
                    </button>
                    
                </div>
            </div>
            
            {/* Deskripsi Film di Bawah Poster */}
            <p className="font-bold text-lg mt-3 text-gray-900 line-clamp-1">{title}</p>
            <p className="font-bold text-primary my-2">{release}</p>
            
            <div className="flex gap-2 mt-1">
                {genre.map((g, index) => (
                    <span 
                        key={index} 
                        className="text-xs bg-gray-100 px-3 py-1 rounded-full text-gray-500 font-medium"
                    >
                        {g}
                    </span>
                ))}
            </div>
        </div>
    );
}

export default MovieCard;
