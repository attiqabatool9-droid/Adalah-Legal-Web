const jwt = require('jsonwebtoken');
const User = require('../models/userModel');

const protect = async (req, res, next) => {
    let token;

    // Check karein ke Header mein Token hai ya nahi (Bearer se shuru hona chahiye)
    if (
        req.headers.authorization &&
        req.headers.authorization.startsWith('Bearer')
    ) {
        try {
            // 1. Token nikaalein (Bearer aur Token ke beech space hoti hai)
            token = req.headers.authorization.split(' ')[1];

            // 2. Token Verify karein (Secret key se)
            const decoded = jwt.verify(token, process.env.JWT_SECRET);

            // 3. Token se User ID nikal kar Database mein User dhoondein
            // (select('-password') ka matlab password mat lana, baaki sab le aana)
            req.user = await User.findById(decoded.id).select('-password');

            // 4. Sab theek hai, agay jane do
            return next();
        } catch (error) {
            console.log("Token verification error:", error);
            return res.status(401).json({ message: 'Not authorized, token failed' });
        }
    }

    if (!token) {
        return res.status(401).json({ message: 'Not authorized, no token' });
    }
};

module.exports = { protect };