// FILEPATH: e:/things/YT/Backend/Middlewares/auth.middleware.js

const blackListTokensModel = require('../models/blackListTokens')
const jwt = require('jsonwebtoken')

module.exports.auth = async (req, res, next) => {
        // console.log({req})
    const token =  req.cookies.token  ;

    if (!token) {
        return res.status(401).json({ message: 'Unauthorized: No token provided' });
    }

    try {
        const blacklist = await blackListTokensModel.findOne({ token });
        
        if (blacklist) {
            return res.status(401).json({ message: 'Unauthorized: Token blacklisted' });
        }

        if (!process.env.JWT_SECRET) {
            console.error('JWT_SECRET is not set');
            return res.status(500).json({ message: 'Server configuration error' });
        }

        const decodedToken = jwt.verify(token, process.env.JWT_SECRET);

        req.user = decodedToken.id;
        return next();

    } catch (err) {
        console.error('JWT Verification Error:', err);
        if (err instanceof jwt.JsonWebTokenError) {
            return res.status(401).json({ message: 'Unauthorized: Invalid token' });
        } else if (err instanceof jwt.TokenExpiredError) {
            return res.status(401).json({ message: 'Unauthorized: Token expired' });
        }
        return res.status(500).json({ message: 'Server error' });
    }
}
