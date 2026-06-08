import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../components/organism/Header';
import { Button } from '../components/atoms/Button';

function ListMovie() {
  const navigate = useNavigate();

  const [movies, setMovies] = useState([
    {
      id: 1,
      no: 1,
      thumbnail: 'https://static.wikia.nocookie.net/marvelcinematicuniverse/images/2/2b/Spider_Man_Homecoming_One_Sheet_1.jpg/revision/latest/scale-to-width-down/1000?cb=20170524101741', 
      title: 'Spiderman HomeComing',
      category: 'Action, Adventure',
      releasedDate: '07/05/2023',
      duration: '2 Hours 15 Minute'
    },
    {
      id: 2,
      no: 2,
      thumbnail: 'https://upload.wikimedia.org/wikipedia/id/0/0d/Avengers_Endgame_poster.jpg',
      title: 'Avengers End Game',
      category: 'Sci-fi, Adventure',
      releasedDate: '10/06/2023',
      duration: '2 Hours 15 Minute'
    },
    {
      id: 3,
      no: 3,
      thumbnail: 'https://static.wikia.nocookie.net/marvelcinematicuniverse/images/2/2b/Spider_Man_Homecoming_One_Sheet_1.jpg/revision/latest/scale-to-width-down/1000?cb=20170524101741',
      title: 'Spiderman HomeComing',
      category: 'Action, Adventure',
      releasedDate: '02/03/2023',
      duration: '2 Hours 15 Minute'
    },
    {
      id: 4,
      no: 4,
      thumbnail: 'https://upload.wikimedia.org/wikipedia/id/0/0d/Avengers_Endgame_poster.jpg',
      title: 'Avengers End Game',
      category: 'Sci-fi, Adventure',
      releasedDate: '01/09/2023',
      duration: '2 Hours 15 Minute'
    },
    {
      id: 5,
      no: 5,
      thumbnail: 'https://static.wikia.nocookie.net/marvelcinematicuniverse/images/2/2b/Spider_Man_Homecoming_One_Sheet_1.jpg/revision/latest/scale-to-width-down/1000?cb=20170524101741',
      title: 'Spiderman HomeComing',
      category: 'Action, Adventure',
      releasedDate: '07/08/2023',
      duration: '2 Hours 15 Minute'
    },
  ]);

  const [currentPage, setCurrentPage] = useState(1);

  const handleView = (id) => alert(`Melihat detail film ID: ${id}`);
  
  const handleEdit = (movie) => {
    navigate(`/admin/edit-movie/${movie.id}`, { state: { movieData: movie } });
  };

  const handleDelete = (id) => {
    if (confirm('Apakah Anda yakin ingin menghapus film ini?')) {
      setMovies(movies.filter(movie => movie.id !== id));
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 font-sans text-gray-700 ">
      <Header />

      <main className="px-4 py-8 md:px-20 md:py-12">
        
        <div className="rounded-2xl bg-white p-6 md:p-10">
          
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8">
            
            <div className="flex items-center justify-between w-full md:w-auto">
              <h2 className="text-xl md:text-2xl font-bold text-[#14142B]">List Movie</h2>
              
              <div className="block md:hidden">
                {/* Modifikasi Klik Button Add Mobile */}
                <Button 
                  onClick={() => navigate('/admin/add-movie')}
                  color="blue" 
                  className="w-22.75 h-11 rounded-xl text-sm font-semibold text-white flex items-center justify-center gap-1"
                >
                  <span className="text-lg font-light leading-none">+</span> Add
                </Button>
              </div>
            </div>
            
            <div className="flex flex-col md:flex-row items-center gap-3 w-full md:w-auto">
              <div className="relative w-full md:w-71">
                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                </span>
                <select className="w-full h-14 appearance-none rounded-xl bg-[#F0F1F9] pl-11 pr-10 py-3 text-sm font-medium text-gray-600 outline-none border border-transparent focus:border-purple-400 transition-colors">
                  <option>November 2023</option>
                  <option>December 2023</option>
                  <option>January 2024</option>
                </select>
                <div className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-gray-400">
                  <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                  </svg>
                </div>
              </div>

              <div className="hidden md:block">
                {/* Modifikasi Klik Button Add Desktop */}
                <Button 
                  onClick={() => navigate('/admin/add-movie')}
                  color="blue" 
                  className="w-35 h-14 rounded-xl bg-[#1D4ED8] px-6 py-3 text-sm font-semibold text-white shadow-md shadow-blue-100 hover:bg-blue-700 transition-all active:scale-98"
                >
                  Add Movies
                </Button>
              </div>
            </div>
          </div>

          <div className="w-full overflow-x-auto pb-4 custom-scrollbar">
            <table className="w-full min-w-200 border-collapse text-left text-sm">
              <thead>
                <tr className="border-b border-gray-100 text-[11px] font-bold uppercase tracking-wider text-gray-400">
                  <th className="py-4 pl-4 text-center w-12">No</th>
                  <th className="py-4 px-4">Thumbnail</th>
                  <th className="py-4 px-4">Movie Name</th>
                  <th className="py-4 px-4">Category</th>
                  <th className="py-4 px-4">Released Date</th>
                  <th className="py-4 px-4">Duration</th>
                  <th className="py-4 pr-4 text-center w-36">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50 font-medium text-gray-600">
                {movies.map((movie) => (
                  <tr key={movie.id} className="hover:bg-gray-50/50 transition-colors">
                    <td className="py-4 pl-4 text-center text-gray-400">{movie.no}</td>
                    
                    <td className="py-3 px-4">
                      <img 
                        src={movie.thumbnail} 
                        alt={movie.title} 
                        className="h-12 w-12 rounded-lg object-cover shadow-sm bg-gray-200"
                      />
                    </td>
                    
                    <td className="py-4 px-4 text-[#1D4ED8] hover:underline cursor-pointer whitespace-nowrap">
                      {movie.title}
                    </td>

                    <td className="py-4 px-4 text-gray-500 whitespace-nowrap">{movie.category}</td>
                    
                    <td className="py-4 px-4 text-gray-500 whitespace-nowrap">{movie.releasedDate}</td>

                    <td className="py-4 px-4 text-gray-500 whitespace-nowrap">{movie.duration}</td>
                    
                    <td className="py-4 pr-4">
                      <div className="flex items-center justify-center gap-1.5">
                        <button 
                          onClick={() => handleView(movie.id)}
                          className="flex justify-center w-7.75 h-7.75 p-2 rounded-md bg-[#1D4ED8] text-white hover:bg-blue-700 transition-colors"
                          title="View"
                        >
                          <img src="/src/assets/icons/eye_movie.svg" alt="icon eye" />
                        </button>

                        <button 
                          onClick={() => handleEdit(movie)}
                          className="flex justify-center w-7.75 h-7.75 p-2 rounded-md bg-[#5F63F2] text-white hover:opacity-90 transition-opacity"
                          title="Edit"
                        >
                          <img src="/src/assets/icons/edit_movie.svg" alt="icon edit" />
                        </button>

                        <button 
                          onClick={() => handleDelete(movie.id)}
                          className="flex justify-center w-7.75 h-7.75 p-2 rounded-md bg-[#FF4D4F] text-white hover:bg-red-600 transition-colors"
                          title="Delete"
                        >
                          <img src="/src/assets/icons/delete_movie.svg" alt="icon delete" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="flex justify-center items-center gap-2 mt-10">
            {[1, 2, 3, 4].map((page) => (
              <button
                key={page}
                onClick={() => setCurrentPage(page)}
                className={`w-10 h-10 flex items-center justify-center rounded-lg text-sm font-semibold border transition-all ${
                  currentPage === page
                    ? 'bg-[#1D4ED8] text-white border-[#1D4ED8] shadow-md shadow-blue-100'
                    : 'bg-white text-gray-400 border-gray-200 hover:border-gray-300 hover:text-gray-600'
                }`}
              >
                {page}
              </button>
            ))}
          </div>

        </div>
      </main>

      <style dangerouslySetInnerHTML={{__html: `
        .custom-scrollbar::-webkit-scrollbar {
          height: 5px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: #F3F4F6;
          border-radius: 999px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: #E5E7EB;
          border-radius: 999px;
        }
      `}} />
    </div>
  );
}

export default ListMovie;