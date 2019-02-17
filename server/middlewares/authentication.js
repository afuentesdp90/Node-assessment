const jwt = require('jsonwebtoken');

// Verify token 
let verifyToken = (req, res, next) => {
    let token = req.body.token;

    if (token) {
        jwt.verify(token, process.env.SEED, (err, decoded) => {
            if (err) {
                return res.status(401).json({
                    success: false,
                    err: {
                        message: 'Invalid Token'
                    }
                });
            }

            req.client = decoded.client;
            next();
        });
    } else {
        return res.status(403).send({
            success: false,
            message: 'No token provided.',
        });
    }
}

// Verify if user has admin role 
let verifyRoles = (req, res, next) => {
    let client = req.body;
    if (client.role === 'admin') {
        next();
    } else {
        return res.json({
            success: false,
            err: {
                message: 'User Role is not admin'
            }
        });
    }
}


module.exports = {
    verifyToken,
    verifyRoles
}