import React, { useState, useEffect } from 'react';

import axios from 'axios';
const UploadVideo = () => {
  const [isDragging, setIsDragging] = useState(false);
  const [VideoData, setVideoData] = useState({});
  const [IsDataGet, setIsDataGet] = useState(false)
  const [IsError, setIsError] = useState(false)
  const [uploadedPercentage, setUploadedPercentage] = useState(0)
  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => setIsDragging(false);

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files[0];
    if (file) {
      console.log('Dropped file:', file);
      setVideoData({ file });
    }
  };

  const ChangeHandler = (e) => {
    const file = e.target.files[0];
    if (file) {
      console.log('Selected file:', file);
      setVideoData({ ...VideoData, Video: file });
    }
  };

  const ThumbnailHandler = (e) => {
    const thumbnail = e.target.files[0];
    if (thumbnail) {
      console.log("Thumbnail:", thumbnail);
      setVideoData({ ...VideoData, thumbnail });
    }
  }
  const fileToBase64 = file => new Promise(res => { const r = new FileReader(); r.onload = () => res(r.result); r.readAsDataURL(file); });


  useEffect(() => {
    if (VideoData.thumbnail && VideoData.Video) {
      setIsDataGet(true);
    }
  }, [VideoData]);

  useEffect(() => {
    console.log("Updated VideoData:", VideoData);
  }, [VideoData]);


  const SubmitHandler = async (e) => {
    e.preventDefault()
    const formData = new FormData();
    formData.append('video_Url', VideoData.Video);
    formData.append('thumbnail', VideoData.thumbnail);
    formData.append('title', 'Sample Title2'); // Add your title here
    formData.append('description', 'Sample Description2');
    try {
      const response = await axios.post('http://localhost:3000/video/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
        onUploadProgress: (progress) => {
          const percentage = Math.round((progress.loaded / progress.total) * 100);
          console.log(`Upload Progress: ${percentage}%`);
          setUploadedPercentage(percentage)
        }

      });
      console.log('Video uploaded successfully:', response.data);
    } catch (err) {
      console.error('Error uploading video:', err.message);
      setIsError(err.message)
    }
  }

  return (
    <div className="w-screen h-screen bg-[#181818] flex items-center justify-center">
      <label
        htmlFor="file"

        className={`bg-[#212121] relative w-[60vw] max-w-[600px] rounded-xl h-[80vh] max-h-[500px] flex flex-col gap-6 items-center justify-center p-6 border-2 transition-colors ${isDragging ? 'border-blue-500' : 'border-[#303030]'
          }`}

        onDragOver={handleDragOver}

        onDragLeave={handleDragLeave}

        onDrop={handleDrop}
      >
        <form action="post" onSubmit={SubmitHandler} >

          <input id="file" type="file" hidden onChange={ChangeHandler} />

          <input id="thumbnail" type="file" hidden onChange={ThumbnailHandler} />

          {IsDataGet ? <input type="submit" value={'Upload'} className='bg-emerald-900 absolute bottom-[6vmax] text-white  px-4 py-2 rounded left-[40%]' /> : ''}

        </form>

        <div className="bg-[#2c2c2c] w-[100px] h-[100px] rounded-full flex items-center justify-center relative">

          {IsError ? <i class="ri-signal-wifi-error-line text-[3rem] text-gray-400"></i> : <i className="ri-arrow-up-fill text-[3rem] text-gray-400"></i>}

          <div className="absolute bottom-2 h-[4px] w-[30px] bg-gray-300"><div className={`bg-green-600 ${uploadedPercentage && !IsError ? `w-[${uploadedPercentage}%]` : 'w-0'} h-full`}></div></div>

        </div>

        <div className="font-semibold text-center text-white text-lg cursor-pointer">

          {IsError ? `${IsError}` : 'Drag and drop video files to upload'}

        </div>

        <p className="text-sm  text-gray-400 text-center max-w-[80%]">
          Drop only Video and for thumbnail click button
        </p>

        {/* Buttons */}
        {IsDataGet ? '' : <div className="flex gap-4 mt-4">
          <label
            htmlFor='thumbnail'
            className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition">
            Thumbnail
          </label>
        </div>}
      </label>
    </div>
  );
};

export default UploadVideo;
