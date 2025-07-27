
const commentModel = require('../models/comment.model.js')

module.exports.addComment = async (videoId, userId, comment, channel, logo) => {

    const commentAdded = await commentModel.create({
        videoId,
        userId,
        commentText: comment,
        channel,
        logo,
        requried:true,
    })

    return commentAdded;
}