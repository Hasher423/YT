
const commentModel = require('../models/comment.model.js')

module.exports.addComment = async (videoId, userId, comment, channel) => {

    const commentAdded = await commentModel.create({
        videoId,
        userId,
        commentText: comment,
        channel,
        requried:true,
    })

    return commentAdded;
}