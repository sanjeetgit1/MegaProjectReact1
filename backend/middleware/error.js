const Errorhander = require("../utils/errorhander");


module.exports =(err,req,res,next)=>{
    err.statusCode = err.statusCode || 500
    err.message = err.message || "Internal Server Error";

// wrong Mongodb Id error

if(err.name === "CastError"){
    const message = `Resourec not found. Invalid ${err.path}`;
    err = new Errorhander(message,400);
}

    res.status(err.statusCode).json({
        success:false,
        error:err.stack,
        // message:err.message
    });
}