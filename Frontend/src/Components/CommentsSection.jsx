// src/Components/CommentsSection.jsx

import React from 'react';
import Comments from './Comments';

const CommentsSection = ({ videoId, comments, setrefreshComments, channel }) => {
  return (
    <Comments
      videoId={videoId}
      comments={comments}
      setrefreshComments={setrefreshComments}
      channel={channel}
    />
  );
};

export default CommentsSection;
