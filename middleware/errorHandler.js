const {logEvents} = require("./logger");

const errorHandler = (err, req, res, next) => {
    logEvents(`${err.name}: ${err.message}\t${req.method}\t${req.url}\t${req.headers.origin}`, "errorsLogs.log");
    console.log(err.stack);

    const status = res.statusCode ? res.statusCode : 500;

    res.status(status).json({error: err.message});

    next();
};

module.exports = errorHandler;