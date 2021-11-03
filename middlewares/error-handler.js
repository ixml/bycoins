const logger = require('../helpers/logger');


module.exports = errorHandler;

function errorHandler(err, req, res, next) {
    console.log(err);
    console.log(req.headers);
    ///console.log(req.csrfToken());
    //console.log(err.constructor)
    switch (true) {
        case typeof err === 'string':
            // custom application error
            const is404 = err.toLowerCase().endsWith('not found');
            const statusCode = is404 ? 404 : 400;
            return res.status(statusCode).json({ message: err });
        case err.name === 'UnauthorizedError':
            // jwt authentication error
            return res.status(401).json({ message: 'Unauthorized' });
        case err.name === 'ApiError':
            return res.status(400).json({ message: err.message,status:err.code });
        default:
            return res.status(500).json({ message: err.message });
    }


//     if (err.code !== 'EBADCSRFTOKEN') return next(err)

//   // handle CSRF token errors here
//   res.status(403)
//   res.send('form tampered with')
}