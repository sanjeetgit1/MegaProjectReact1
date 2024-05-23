const mongoose = require('mongoose');


// const connectDatabase=()=>{
//     mongoose.connect(process.env.DB_URL).then((data)=>{
//     console.log(`Mongodb connected with server:${data.connection.host}`);

// }).catch((err)=>{
//     console.log(err);
    
// })
// }

// module.exports = connectDatabase
// const mongoose = require("mongoose");

const connectDatabase = async () => {
 
        const data = await mongoose.connect(process.env.DB_URL, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log(`MongoDB connected with server: ${data.connection.host}`);
    
};

module.exports = connectDatabase