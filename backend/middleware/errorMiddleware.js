const errorHandler = (err, req, res, next) => {
    const statusCode = res.statusCode ? res.statusCode : 500 // if statuscode mila then value will be statusCode or 500 will be shown as statuscode 

    res.status(statusCode)
    res.json({
        message : err.message, //method
        stack : process.env.NODE_ENV === "production" ? null : err.stack //if in production environment then null else err.stack which means details of error file status 

    })
}

module.exports = {errorHandler}
