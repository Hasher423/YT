
const videoService = require('../Services/search.service')
module.exports.searchVideo = async (req,res) =>{

    const query = req.query.q;
    if(!query || query.trim() === "") return res.status(400).json({message : "Search query is required"});

    const results = await videoService.searchVideo(query);
    if(results.error) return res.status(500).json({message : "Internal server error"});
    return res.status(200).json(results);

}


module.exports.suggestions = async (req,res) => {
    const query = req.query.q;
    if(!query || query.trim() === "") return res.status(400).json({message : "Search query is required " });

    const suggestions = await videoService.suggestions(query);
    if(suggestions.error) return res.status(500).json({message : "Internal server error"});
    return res.status(200).json(suggestions);

}