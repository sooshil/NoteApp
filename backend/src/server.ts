import app from "./app"
import env from "./util/validateEnv";
import mongoose from "mongoose";

const port = env.PortNumber;

mongoose.connect(env.MongoConnectionString)
    .then(() => {
        console.log("Mongoose connected");
        app.listen(port, () => {
            console.log("Server running on port: " + port);
        })
    })
    .catch(console.error);

