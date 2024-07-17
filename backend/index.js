const mongoose = require("mongoose");
const app = require("./app");

async function bootstrap() {
    require("dotenv").config();

    await mongoose.connect(process.env.MONGODB_URL);
    console.log("Connected to MongoDB");

    await app.listen(3043);
    console.log("--> Done! Listening on 3043");
}

bootstrap();
