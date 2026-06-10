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
    movieImage: isEditMode ? 'existing_image_url' : null, 
    cinemaDates: [],
    cinemaTimes: [],
  });

  const [currentTimeInput, setCurrentTimeInput] = useState('');
  const [errors, setErrors] = useState({});

  const schema = Joi.object({
    movieName: Joi.string().trim().required().messages({
      'string.empty': 'Movie name cannot be empty',
      'any.required': 'Please input the movie name',
    }),
    category: Joi.string().trim().required().messages({
      'string.empty': 'category cannot be empty',
    }),
    releaseDate: Joi.string().required().messages({
      'string.empty': 'release date cannot be empty',
    }),
    durationHour: Joi.number().min(0).required().messages({
      'number.base': 'Duration hour must be number',
      'number.min': 'Duration hour cannot less than 0',
      'any.required': 'Please input duration hour',
    }),
    durationMinute: Joi.number().min(0).max(59).required().messages({
      'number.base': 'Duration minute must be number',
      'number.min': 'Duration minute cannot less than 0',
      'number.max': 'The duration of minutes must not exceed 59 minutes',
      'any.required': 'Please input duration minute',
    }),
    directorName: Joi.string().trim().required().messages({
      'string.empty': 'Director name cannot be empty',
    }),
    cast: Joi.string().trim().required().messages({
      'string.empty': 'Cast cannot be empty',
    }),
    synopsis: Joi.string().trim().required().messages({
      'string.empty': 'Synopsis cannot be empty',
    }),
    addLocation: Joi.string().trim().required().messages({
      'string.empty': 'Please enter viewing location',
    }),
    movieImage: Joi.any().required().messages({
      'any.required': 'Please select the movie poster image first!',
    }),
    cinemaDates: Joi.array().min(1).required().messages({
      'array.min': 'Please select at least one cinema release date!',
    }),
    cinemaTimes: Joi.array().min(1).required().messages({
      'array.min': 'Please select at least one cinema times!',
    }),
  });

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === 'durationHour') {
      const num = Number(value);
      if (value !== '' && num < 0) return;
    }

    if (name === 'durationMinute') {
      const num = Number(value);
      if (value !== '' && (num < 0 || num > 59)) return;
    }

    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: null }));
  };

  const handleKeyDownNumber = (e) => {
    if (['-', '+', 'e', 'E'].includes(e.key)) e.preventDefault();
  };

  const handleUploadClick = () => {
    fileInputRef.current.click();
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData((prev) => ({ ...prev, movieImage: file }));
      if (errors.movieImage) setErrors((prev) => ({ ...prev, movieImage: null }));
    }
  };

  const handleAddDate = (e) => {
    const newDate = e.target.value;
    if (newDate && !formData.cinemaDates.includes(newDate)) {
      const updatedDates = [...formData.cinemaDates, newDate].sort();
      setFormData((prev) => ({ ...prev, cinemaDates: updatedDates }));
      if (errors.cinemaDates) setErrors((prev) => ({ ...prev, cinemaDates: null }));
    }
    e.target.value = '';
  };

  const handleRemoveDate = (indexToRemove) => {
    const updatedDates = formData.cinemaDates.filter((_, index) => index !== indexToRemove);
    setFormData((prev) => ({ ...prev, cinemaDates: updatedDates }));
  };

  const handleAddTime = () => {
    if (currentTimeInput && !formData.cinemaTimes.includes(currentTimeInput)) {
      const updatedTimes = [...formData.cinemaTimes, currentTimeInput].sort();
      setFormData((prev) => ({ ...prev, cinemaTimes: updatedTimes }));
      setCurrentTimeInput('');
      if (errors.cinemaTimes) setErrors((prev) => ({ ...prev, cinemaTimes: null }));
    }
  };

  const handleRemoveTime = (indexToRemove) => {
    const updatedTimes = formData.cinemaTimes.filter((_, index) => index !== indexToRemove);
    setFormData((prev) => ({ ...prev, cinemaTimes: updatedTimes }));
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

    if (isEditMode) {
      alert(`[MOCK ACTION] Film ID ${id} Berhasil Diperbarui!`);
    } else {
      alert('[MOCK ACTION] Film Baru Berhasil Ditambahkan!');
    }
    
    console.log("Data Valid:", formData);
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
                  className={`rounded-lg px-6 py-2.5 text-xs font-semibold text-white transition-colors shadow-sm ${errors.movieImage ? 'bg-red-500 hover:bg-red-600' : 'bg-[#1D4ED8] hover:bg-blue-700'}`}
                >
                  {formData.movieImage && formData.movieImage !== 'existing_image_url' ? 'Change Image' : 'Upload'}
                </button>
                <span className="text-xs text-gray-500 truncate max-w-xs">
                  {formData.movieImage && formData.movieImage !== 'existing_image_url' ? formData.movieImage.name : 'No files selected yet'}
                </span>
              </div>
              {errors.movieImage && <p className="text-xs text-red-500 font-medium">{errors.movieImage}</p>}
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

            {/* CATEGORY */}
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
                      min="0"
                      onKeyDown={handleKeyDownNumber}
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
                      min="0"
                      max="59"
                      onKeyDown={handleKeyDownNumber}
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
              
              <div className="space-y-2">
                <div className="relative w-full sm:w-56">
                  <input 
                    type="date"
                    onChange={handleAddDate} 
                    className={`p-3 border-2 bg-[#EFF0F6] w-full md:w-50.75 rounded-lg outline-none cursor-pointer 
                                [&::-webkit-calendar-picker-indicator]:scale-150 
                                [&::-webkit-calendar-picker-indicator]:cursor-pointer ${errors.cinemaDates ? 'border-red-500' : 'border-gray-300'}`}
                  />
                  <div className='bg-[#EFF0F6] w-30 h-10 absolute bottom-1 content-center left-1 text-center pointer-events-none text-gray-500 font-semibold text-medium-normal'>Set a date</div>
                </div>
                
                <div className="flex flex-wrap gap-2 text-xs font-semibold text-gray-500 pt-1">
                  {formData.cinemaDates.map((date, idx) => (
                    <span key={idx} className="inline-flex items-center gap-1.5 px-3 py-1 bg-purple-50 text-[#5F2EEA] text-xs font-semibold rounded-full border border-purple-200">
                      {date}
                      <button type="button" onClick={() => handleRemoveDate(idx)} className="text-red-400 hover:text-red-600 font-bold ml-1">×</button>
                    </span>
                  ))}
                  {formData.cinemaDates.length === 0 && (
                    <p className={`text-xs italic ${errors.cinemaDates ? 'text-red-500 font-medium' : 'text-gray-400'}`}>
                      {errors.cinemaDates ? errors.cinemaDates : 'No release date selected yet'}
                    </p>
                  )}
                </div>
              </div>

              <div className="space-y-2 pt-2">
                <div className="flex items-center gap-2">
                  <input 
                    type="time"
                    value={currentTimeInput}
                    onChange={(e) => setCurrentTimeInput(e.target.value)}
                    className={`h-9 px-3 rounded-lg bg-[#EFF0F6] text-xs font-semibold text-gray-600 outline-none border ${errors.cinemaTimes ? 'border-red-500' : 'border-transparent focus:border-purple-400'}`}
                  />
                  <button 
                    type="button" 
                    onClick={handleAddTime}
                    className="w-15.5 h-7.5 flex items-center justify-center rounded-lg border-2 border-[#5F2EEA] bg-white hover:bg-purple-50 transition-colors active:scale-95"
                  >
                    <span className="text-[#5F2EEA] font-bold text-lg leading-none">+</span>
                  </button>
                </div>

                <div className="flex flex-wrap items-center gap-3 text-xs font-semibold text-gray-500 pt-1">
                  {formData.cinemaTimes.map((time, idx) => (
                    <span key={idx} className="inline-flex items-center bg-gray-100 px-3 py-1 rounded-md border border-gray-200 tracking-wide">
                      {time}
                      <button type="button" onClick={() => handleRemoveTime(idx)} className="text-gray-400 hover:text-red-500 font-bold ml-2">×</button>
                    </span>
                  ))}
                  {formData.cinemaTimes.length === 0 && (
                    <p className={`text-xs italic ${errors.cinemaTimes ? 'text-red-500 font-medium' : 'text-gray-400'}`}>
                      {errors.cinemaTimes ? errors.cinemaTimes : 'No broadcast hours have been added yet'}
                    </p>
                  )}
                </div>
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