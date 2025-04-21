import mongoose from "mongoose";
import { DB_NAME } from "../constants.js";

// Connect to MongoDB database.Can be used for every deveploment environment.
const connectDB = async function dbConnection() {
    const mongoURL = process.env.MONGODB_URL;
    if (!mongoURL || !DB_NAME) {
        console.error("Missing MongoDB connection information (MONGODB_URL or DB_NAME)");
        process.exit(1);
    }

    try {
        const connectionInstance = await mongoose.connect(`${mongoURL}/${DB_NAME}`,
             {
<<<<<<< HEAD:rs/rl/backend/src/db/db.js
                tls: true, // <<< Enable TLS for Atlas
                serverSelectionTimeoutMS: 500000, // Increase timeout to 30 seconds
                socketTimeoutMS: 450000 // Increase socket timeout
=======
                useNewUrlParser: true, // Add this
                useUnifiedTopology: true, // Add this
                tls: true, // <<< Enable TLS for Atlas
                serverSelectionTimeoutMS: 50000, // Increase timeout to 30 seconds
                socketTimeoutMS: 45000 // Increase socket timeout
>>>>>>> 992b87bab6db27eedd6f74902f110516c8efb40c:rl/backend/src/db/db.js
              }
        );
        console.log(`\nConnected to MongoDB at ${connectionInstance.connection.host}`);
    } catch (error) {
        console.error("Failed to connect to MongoDB", error);
        process.exit(1);
    }
}

export default connectDB;
