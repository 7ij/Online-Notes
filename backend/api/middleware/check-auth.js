const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
    try {
        const token = req.headers.authorization.split(" ")[1];
        console.log(token);
        const decoded = jwt.verify(token, 'MyPrivateKey');
        req.userData = decoded;
        // console.log("dbg:", jwt.decode(token, 'MyPrivateKey'));
        next();
    }
    catch (error) {
        return res.status(401).json({
            msg: 'Auth Failed'
        });
    }    
};