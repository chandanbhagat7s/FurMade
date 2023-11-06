const dotenv = require("dotenv");
const mongoose = require('mongoose');

dotenv.config({ path: './config.env' });
let PORT = process.env.PORT;




process.on('uncaughtException', err => {
    console.log(err.name, err.message);
    console.log(err);
    // now we need to close the server and exit the process 
    console.log("uncaught Exception SHUDDING DOWN");

    process.exit(1)

})



const app = require("./app");


// console.log(app.get('env'));
// console.log(process.env);
mongoose.connect(process.env.DATABASE, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
    .then((con) => {
        // console.log(con.connection);
        console.log("database connected");
    })
// .catch(err => {
//     // hear you handled the error but suppose in the big applicatuion it is difficult to handle the promise which is rejected 
//     console.log("Could not connect", err);
// });



const server = app.listen(PORT, () => {
    console.log("app running started at :  ", PORT);
})


// handling unhandled error (async),these are listner okk 
process.on('unhandledRejection', err => {
    console.log(err.name, err.message);
    // now we need to close the server and exit the process 
    console.log("UNHALDLED PROMISE SHUDDING DOWN");
    server.close(() => {
        process.exit(1)
    })
})



// now unchached exception (bugs... etc)












