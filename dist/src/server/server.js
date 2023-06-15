"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
//------------------TYPESCRIPT IMPORTS------------------//
var express_1 = __importDefault(require("express"));
var apiRouter_1 = __importDefault(require("../server/routers/apiRouter"));
//------------------REQUIRES------------------//
// require path & cors
var path = require('path');
// declare port
var PORT = 9000;
// declare app with express invocation
var app = (0, express_1.default)();
// require in any local controllers
// parse requests 
app.use(express_1.default.json());
app.use(express_1.default.static(path.resolve(__dirname, '../client')));
// set up api router
app.use('/api', apiRouter_1.default);
//------------------REACT ROUTER------------------//
app.use('*', function (req, res, next) {
    return res.status(200).sendFile(path.resolve(__dirname, '../client/index.html'));
});
//--------------STANDARD MIDDLEWARE (JSON, FORM PARSER, CORS)----------------//
//------------------SERVER REQUESTS------------------//
//------------------ERROR HANDLERS------------------//
// Global catch-all
app.use(function (err, req, res, next) {
    var defaultErr = {
        log: 'Error caught in global handler',
        status: 500,
        message: { err: 'An error occurred' }
    };
    var errorObj = Object.assign({}, defaultErr, err);
    console.log(errorObj.log);
    console.log(err);
    return res.status(errorObj.status).json(errorObj.message);
});
//------------------SERVER LISTENER------------------//
// declare port & listen
app.listen(PORT, function () {
    console.log("App listening on port ".concat(PORT));
});
//------------------APP EXPORT------------------//
// export app
module.exports = app;
