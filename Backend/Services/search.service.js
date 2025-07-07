const videoModel = require('../models/video.model');


(async () => {
    const indexes = await videoModel.collection.getIndexes();
    console.log(indexes);
})();


module.exports.searchVideo = async (query) => {
    try {
        const results = await videoModel.find(
            { $text: { $search: query } },
            { score: { $meta: 'textScore' } }
        ).sort({ score: { $meta: 'textScore' } });

        return (results);
    } catch (err) {
        console.error('Search error:', err);
        return ({ error: 'Internal server error' });
    }
}


module.exports.suggestions = async (query) => {
    try {
        const suggestions = await videoModel.find(
            { $text: { $search: query } },
            { title: 1 } // Only return titles
        ).limit(8);

        const titles = suggestions.map((video) => video.title);
        return (titles);
        
    } catch (err) {
        console.error('Suggestions Search error:', err);
        return ({ error: 'Internal server error' });
    }
}