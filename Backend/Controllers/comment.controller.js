const commentModel = require('../models/comment.model.js');
const Video = require('../models/video.model.js');
const userModel = require('../models/user.model.js');
const { addComment } = require('../Services/comment.service.js');

module.exports.comment = async (req, res) => {
  console.time("Total");

  try {
    const { videoId } = req.params;
    const { comment, channel } = req.body;
    const userId = req.user._id;

    console.time('Finding User and video');
    const [video, user] = await Promise.all([
      Video.findById(videoId), // don't use .lean() here
      userModel.findById(userId).lean() // lean here is fine
    ]);
    console.timeEnd('Finding User and video');

    if (!video || !user) return res.status(404).json({ message: 'Video or User not found' });

    console.time("Add Comment");
    const newComment = await addComment(videoId, userId, comment, channel);
    console.timeEnd("Add Comment");

    // ⛔ Removed: video.comments.push(...) and video.save()

    console.timeEnd("Total");
    return res.status(200).json({ message: 'Comment added' });

  } catch (err) {
    console.error(err);
    console.timeEnd("Total");
    return res.status(500).json({ error: 'Failed to add comment' });
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
