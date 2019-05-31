const express = require('express')
const response = require('./../libs/response')

//handling the error middleware
let errorHandler = (err, req, res, next) => {
    console.log("Application Error Handler Called")
    console.log(err)
    let apiResponse = response.generate(true, `Some Error occured in Global Level : ${err}`, 500, null)
    res.send(apiResponse)
} // end errorhandler

// handling not found middleware
let notFoundHandler = (req, res, next) => {
    console.log('Global Not Found Handler Called')
    let apiResponse = response.generate(true, "Route Not Found in the application", 404, null)
    res.status(404).send(apiResponse)
} // end not found handler

module.exports = {
    globalErrorHandler: errorHandler,
    globalNotFoundHandler: notFoundHandler
}