/*eslint-disable no-console*/

import mongoose from 'mongoose';

let databaseConfig = {
    database : {
        test : "mongodb://localhost/shop-tests",
        development : "mongodb://localhost/shop-dev",
        production: "mongodb://"+process.env.DB_USER+":"+process.env.DB_PASS+"@localhost/"+process.env.DB
    }
};

mongoose.connect(databaseConfig.database[process.env.NODE_ENV]);

mongoose.connection.on("connected", () => {
    console.log(`Mongoose connected to ${databaseConfig.database[process.env.NODE_ENV]}`);
});

mongoose.connection.on("error", (error) => {
    console.log(`Mongoose connection error ${error}`);
});

mongoose.connection.on("disconnected", () => {
    console.log("Mongoose disconnected");
});

/**
 * To be called when process is restarted or terminated
 * @param message
 * @param callback
 */
let gracefullShutdown = ( message, callback) => {
    mongoose.connection.close( () => {
        console.log(`Mongoose disconnected through ${message}`);
        callback;
    });
};
// For nodemon restarts
process.once("SIGUSR2", () => {
    gracefullShutdown("nodemon restart", () => {
        process.kill(process.pid, "SIGUSR2");
    });
});

// For app termination
process.on("SIGINT", () => {
    gracefullShutdown("App termination", () => {
        process.exit(0);
    });
});

// For Heroku app termination
process.on("SIGTERM", () => {
    gracefullShutdown("Heroku App termination", () => {
        process.exit(0);
    });
});
