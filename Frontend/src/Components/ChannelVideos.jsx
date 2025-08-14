import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { calculateAgo } from '../utils/Ago';

const ChannelVideos = ({ user }) => {

  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(true);
  const { id } = useParams();
  const fetchVideos = async () => {
    try {
      const response = await axios.get(`${import.meta.env.VITE_BACKEND_URI}/user/getUserVideos/${id}`);
      const processed = response.data.map(video => ({
        ...video,
        ago: calculateAgo(video.createdAt)
      }));
      setVideos(processed);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching videos:', error.message, error.response?.data);
    }
  };

  useEffect(() => {
    fetchVideos();
  }, []);

  return (
    <div>
      {!loading && (
        <div>
          {videos.map((elem, idx) => (
            <Link
              key={idx}
              to={`/video/videoPlayer?v=${elem._id}`}
              className={`w-[90vw] ${idx === 0 && 'pt-9'} grid sm:grid-cols-[3fr_5fr_1fr] pb-[2vw] items-stretch px-5`}
            >
              <div className="p-[1vw]">
                <img
                  className="rounded-xl aspect-[16/09] object-cover"
                  src={elem.thumbnail_Url.url}
                  alt=""
                />
              </div>
              <div className="text-custom-white sm:text-[1.2vw] font-[500] px-4">
                <p>{elem.title}</p>
                <div className="flex items-center font-[400] text-white text-opacity-50">
                  <div>{elem.views} views</div>
                  <div className="mx-2">•</div>
                  <div>{elem.ago}</div>
                </div>
                <div className="hidden sm:flex items-center gap-2 sm:mt-[3vh] mt-[4vw]">
                  <img
                    className="sm:w-[3.3vw] w-[7vw] sm:h-[3.3vw] rounded-full"
                    src={user?.logoId}
                    alt=""
                  />
                  <div>@{user?.channelName}</div>
                </div>
              </div>
              <div className="sm:block hidden text-left font-bold">
                <i className="ri-more-2-line text-white"></i>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
};

export default ChannelVideos;
