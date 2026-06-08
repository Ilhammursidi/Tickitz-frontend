import { useState, useRef } from 'react';
import { useLocation, useParams } from 'react-router-dom';
import Joi from 'joi';
import Header from '../components/organism/Header';
import { Button } from '../components/atoms/Button';

function AddMovie() {
  const { id } = useParams();
  const location = useLocation();
  const editData = location.state?.movieData;
  const isEditMode = Boolean(id);

  const fileInputRef = useRef(null);

  const [selectedImage, setSelectedImage] = useState(null);

  let initialMovieName = '';
  let initialCategory = '';
  let initialReleaseDate = '';
  let initialDurationHour = '';
  let initialDurationMinute = '';
  let initialDirectorName = '';
  let initialCast = '';
  let initialSynopsis = '';
  let initialAddLocation = '';

  if (isEditMode && editData) {
    initialMovieName = editData.title || '';
    initialCategory = editData.category || '';
    
    if (editData.releasedDate && editData.releasedDate.includes('/')) {
      const [day, month, year] = editData.releasedDate.split('/');
      initialReleaseDate = `${year}-${month}-${day}`;
    } else {
      initialReleaseDate = editData.releasedDate || '';
    }

    initialDurationHour = '2';
    initialDurationMinute = '15';
    initialDirectorName = 'Jon Watts';
    initialCast = 'Tom Holland, Zendaya';
    initialSynopsis = 'Peter Parker balances his life as an ordinary high school student in Queens with his superhero alter-ego Spider-Man.';
    initialAddLocation = 'Purwokerto, Bandung, Bekasi';
  }

  const [formData, setFormData] = useState({
    movieName: initialMovieName,
    category: initialCategory,
    releaseDate: initialReleaseDate,
    durationHour: initialDurationHour,
    durationMinute: initialDurationMinute,
    directorName: initialDirectorName,
    cast: initialCast,
    synopsis: initialSynopsis,
    addLocation: initialAddLocation,
  });

  const [errors, setErrors] = useState({});

  const schema = Joi.object({
    movieName: Joi.string().trim().required().messages({
      'string.empty': 'Nama film tidak boleh kosong',
      'any.required': 'Nama film wajib diisi',
    }),
    category: Joi.string().trim().required().messages({
      'string.empty': 'Kategori tidak boleh kosong',
    }),
    releaseDate: Joi.string().required().messages({
      'string.empty': 'Tanggal rilis wajib dipilih',
    }),
    durationHour: Joi.number().min(1).required().messages({
      'number.base': 'Durasi jam harus berupa angka',
      'any.required': 'Durasi jam wajib diisi',
    }),
    durationMinute: Joi.number().min(0).max(59).required().messages({
      'number.base': 'Durasi menit harus berupa angka',
      'any.required': 'Durasi menit wajib diisi',
    }),
    directorName: Joi.string().trim().required().messages({
      'string.empty': 'Nama sutradara tidak boleh kosong',
    }),
    cast: Joi.string().trim().required().messages({
      'string.empty': 'Daftar pemeran tidak boleh kosong',
    }),
    synopsis: Joi.string().trim().required().messages({
      'string.empty': 'Sinopsis tidak boleh kosong',
    }),
    addLocation: Joi.string().trim().required().messages({
      'string.empty': 'Lokasi penayangan wajib diisi',
    }),
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: null }));
    }
  };

  const handleUploadClick = () => {
    fileInputRef.current.click();
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedImage(file);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const { error } = schema.validate(formData, { abortEarly: false });

    if (error) {
      const validationErrors = {};
      error.details.forEach((detail) => {
        validationErrors[detail.path[0]] = detail.message;
      });
      setErrors(validationErrors);
      return;
    }

    if (!selectedImage && !isEditMode) {
      alert('Silakan pilih gambar poster film terlebih dahulu!');
      return;
    }

    if (isEditMode) {
      alert(`[MOCK ACTION] Film ID ${id} Berhasil Diperbarui!`);
    } else {
      alert('[MOCK ACTION] Film Baru Berhasil Ditambahkan!');
    }
    console.log("Data Valid yang Siap Dikirim:", formData, "File Poster:", selectedImage);
  };

  return (
    <div className="min-h-screen bg-gray-50 font-sans text-gray-700">
      <Header />

      <main className="mx-auto max-w-212.5 px-4 py-8 md:py-12">
        <div className="rounded-2xl bg-white p-6 md:p-12">
          <h2 className="text-xl md:text-2xl font-bold text-[#14142B] mb-8">
            {isEditMode ? 'Edit Movie' : 'Add New Movie'}
          </h2>
          
          <form onSubmit={handleSubmit} className="space-y-6">
            
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-500 block">Upload Image</label>
              <div className="flex items-center gap-4">
                <input 
                  type="file" 
                  ref={fileInputRef}
                  onChange={handleFileChange}
                  className="hidden" 
                  accept="image/*" 
                />
                <button 
                  type="button" 
                  onClick={handleUploadClick}
                  className="rounded-lg bg-[#1D4ED8] px-6 py-2.5 text-xs font-semibold text-white hover:bg-blue-700 transition-colors shadow-sm"
                >
                  {selectedImage ? 'Ubah Gambar' : 'Pilih Gambar'}
                </button>
                <span className="text-xs text-gray-500 truncate max-w-xs">
                  {selectedImage ? selectedImage.name : 'Belum ada berkas yang dipilih'}
                </span>
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-500 block">Movie Name</label>
              <input 
                type="text"
                name="movieName"
                value={formData.movieName}
                onChange={handleChange}
                className={`w-full h-12.5 md:h-16 px-4 rounded-sm bg-[#FCFDFE] text-sm text-gray-700 outline-none border ${errors.movieName ? 'border-red-500' : 'border-[#DEDEDE] focus:border-purple-400'} transition-all`}
              />
              {errors.movieName && <p className="text-xs text-red-500 font-medium">{errors.movieName}</p>}
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-500 block">Category</label>
              <input 
                type="text"
                name="category"
                value={formData.category}
                onChange={handleChange}
                className={`w-full h-12.5 md:h-16 px-4 rounded-sm bg-[#FCFDFE] text-sm text-gray-700 outline-none border ${errors.category ? 'border-red-500' : 'border-[#DEDEDE] focus:border-purple-400'} transition-all`}
              />
              {errors.category && <p className="text-xs text-red-500 font-medium">{errors.category}</p>}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-500 block">Release date</label>
                <input 
                  type="date"
                  name="releaseDate"
                  value={formData.releaseDate}
                  onChange={handleChange}
                  className={`w-full h-12.5 md:h-16 px-4 rounded-sm bg-[#FCFDFE] text-sm text-gray-600 outline-none border ${errors.releaseDate ? 'border-red-500' : 'border-[#DEDEDE] focus:border-purple-400'} transition-all`}
                />
                {errors.releaseDate && <p className="text-xs text-red-500 font-medium">{errors.releaseDate}</p>}
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-500 block">Duration (hour / minute)</label>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <input 
                      type="number"
                      name="durationHour"
                      placeholder="Hour"
                      value={formData.durationHour}
                      onChange={handleChange}
                      className={`w-full h-12.5 md:h-16 px-4 rounded-sm bg-[#FCFDFE] text-sm text-center text-gray-700 outline-none border ${errors.durationHour ? 'border-red-500' : 'border-[#DEDEDE] focus:border-purple-400'} transition-all`}
                    />
                    {errors.durationHour && <p className="text-[11px] text-red-500 mt-1">{errors.durationHour}</p>}
                  </div>
                  <div>
                    <input 
                      type="number"
                      name="durationMinute"
                      placeholder="Minute"
                      value={formData.durationMinute}
                      onChange={handleChange}
                      className={`w-full h-12.5 md:h-16 px-4 rounded-sm bg-[#FCFDFE] text-sm text-center text-gray-700 outline-none border ${errors.durationMinute ? 'border-red-500' : 'border-[#DEDEDE] focus:border-purple-400'} transition-all`}
                    />
                    {errors.durationMinute && <p className="text-[11px] text-red-500 mt-1">{errors.durationMinute}</p>}
                  </div>
                </div>
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-500 block">Director Name</label>
              <input 
                type="text"
                name="directorName"
                value={formData.directorName}
                onChange={handleChange}
                className={`w-full h-12.5 md:h-16 px-4 rounded-sm bg-[#FCFDFE] text-sm text-gray-700 outline-none border ${errors.directorName ? 'border-red-500' : 'border-[#DEDEDE] focus:border-purple-400'} transition-all`}
              />
              {errors.directorName && <p className="text-xs text-red-500 font-medium">{errors.directorName}</p>}
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-500 block">Cast</label>
              <input 
                type="text"
                name="cast"
                value={formData.cast}
                onChange={handleChange}
                className={`w-full h-12.5 md:h-16 px-4 rounded-sm bg-[#FCFDFE] text-sm text-gray-700 outline-none border ${errors.cast ? 'border-red-500' : 'border-[#DEDEDE] focus:border-purple-400'} transition-all`}
              />
              {errors.cast && <p className="text-xs text-red-500 font-medium">{errors.cast}</p>}
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-500 block">Synopsis</label>
              <textarea 
                name="synopsis"
                rows="4"
                value={formData.synopsis}
                onChange={handleChange}
                className={`w-full h-63 md:h-51.75 p-4 rounded-sm bg-[#FCFDFE] text-sm text-gray-700 outline-none border ${errors.synopsis ? 'border-red-500' : 'border-[#DEDEDE] focus:border-purple-400'} transition-all resize-none leading-relaxed`}
              />
              {errors.synopsis && <p className="text-xs text-red-500 font-medium">{errors.synopsis}</p>}
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-500 block">Add Location</label>
              <input 
                type="text"
                name="addLocation"
                value={formData.addLocation}
                onChange={handleChange}
                className={`w-full h-12.5 md:h-16 px-4 rounded-sm bg-[#FCFDFE] text-sm text-gray-700 outline-none border ${errors.addLocation ? 'border-red-500' : 'border-[#DEDEDE] focus:border-purple-400'} transition-all`}
              />
              {errors.addLocation && <p className="text-xs text-red-500 font-medium">{errors.addLocation}</p>}
            </div>

            <div className="space-y-4 pt-2">
              <label className="text-sm font-medium text-gray-500 block">Set Date & Time</label>
              <div className="flex flex-wrap items-center gap-4">
                <div className="relative w-full sm:w-44">
                  <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                  </span>
                  <select className="w-full h-11 appearance-none rounded-xl bg-[#EFF0F6] pl-10 pr-8 text-xs font-semibold text-gray-500 outline-none">
                    <option>Set a date</option>
                  </select>
                  <div className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-gray-400">
                    <svg className="h-3 w-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                    </svg>
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-4 text-xs font-semibold text-gray-500">
                <button type="button" className="w-15.5 h-7.5 flex items-center justify-center rounded-sm border-2 border-[#5F2EEA] font-light hover:bg-purple-50 transition-colors">
                  <img src="/src/assets/icons/plus_blue.svg" alt="icon plus" />
                </button>
                <span className="tracking-wide">08:30am</span>
                <span className="tracking-wide">10:30pm</span>
              </div>
            </div>

            <div className="pt-6">
              <Button 
                type="submit"
                color="blue" 
                className="w-full h-14 rounded-xl bg-[#1D4ED8] text-sm font-semibold text-white shadow-lg shadow-blue-100 hover:bg-blue-700 transition-all active:scale-[0.99]"
              >
                {isEditMode ? 'Update Movie' : 'Save Movie'}
              </Button>
            </div>

          </form>
        </div>
      </main>
    </div>
  );
}

export default AddMovie;