// Authenticate middleware
const jwt = require('jsonwebtoken');


function authenticateToken(req, res, next) {
    //Get the authorization header
    const authHeader = req.headers['authorization'];

    //extract token from the header
    const token = authHeader && authHeader.split(' ')[1]; 
    
    if (!token)
    {
        return res.status(401).json({ message: 'Access denied. Token missing' });
    }
}

//Verify the token
try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded; // Attach user info to request object, contains {userId, role, email, iat, exp}
} catch (err)
{
    // token expired or invalid
    if (err.name === 'TokenExpiredError') 
    {
        return res.status(401).json({ message: 'Token expired' });
    }
    return res.status(403).json({ message: 'Invalid token' });
}