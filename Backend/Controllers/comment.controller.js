



const commentModel = require('../models/comment.model.js')
const Video = require('../models/video.model.js');
const userModel = require('../models/user.model.js')

const { addComment } = require('../Services/comment.service.js');


module.exports.comment = async (req, res) => {
  try {
    const { videoId } = req.params;
    const { comment, channel } = req.body;
    const userId = req.user._id;

    const video = await Video.findById(videoId);
    if (!video) return res.status(404).json({ message: 'Video not found' });

    const user = await userModel.findById(userId);
    if (!user) return res.status(404).json({ message: 'User not found' });

    const newComment = await addComment(videoId, userId, comment, channel);



    video.comments.push(newComment._id);
    await video.save();

    res.status(200).json({ message: 'Comment added' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to add comment' });
  }
};

module.exports.getComments = async (req, res) => {
  try {
    const allComments = await commentModel.find(); // .find() returns all documents
    return res.status(200).json({ allComments });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: 'Failed to fetch comments' });
  }
};
