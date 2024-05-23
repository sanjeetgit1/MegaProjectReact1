const app = require('./app')
const dotenv =require("dotenv");

const connectDatabase = require('./config/database')

// Handling Uncaught Exception
process.on("uncaughtException",(err)=>{
    console.log(`Error: ${err.message}`);
    console.log(`shutting down the server due to uncaught Exception`);
    process.exit(1);
});


// console.log(youtube)



//config
dotenv.config({path:"backend/config/config.env"})

// connecting to database
connectDatabase()



app.listen(process.env.PORT,()=>{
    console.log(`server is working on http localhost:${process.env.PORT}`);
})

// unhandled Promise Rejection
 process.on("unhandledRejection",(err)=>{
    console.log(`Error:${err.message}`);
    console.log(`shutting down the server due to unhandled Promise Rejection`);

    server.close(()=>{
        process.exit(1)
    })
 })

