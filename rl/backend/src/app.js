import express from "express";
import kill from 'kill-port';
import cors from 'cors';
import cookieParser from 'cookie-parser';

const app = express();
const port = process.env.PORT || 8000;
// Basic CONFIG Work Here
// Can be used for every deveploment environment.
// cors ki configaration , origin means kay kis frontend saay talking karni hay. iss a url do  process.env.CORS_ORIGIN maay.
app.use(cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true,
    optionsSuccessStatus: 200
}));
// cookie parser configuration. no need of additional key-value configuration data

app.use(cookieParser());

//Json ki limit lagani ha itni hi aaiy

app.use(express.json({ limit: '16kb' }));
//Url ki limit and syntax config

app.use(express.urlencoded({ extended: true, limit: '16kb' }));
// files store karvanay ka liay public folder or uploads folder (kay indar) use kar saktaay haay
// app.use(express.static('uploads'))
app.use(express.static('public'));

// Routes
import restaurantRoutes from "./routes/restaurantRoutes.js";
app.use('/api/v1/restaurants', restaurantRoutes);

// Function to start the server
const startServer = async () => {
    try {
        // Kill any process using the port before starting
        await kill(port, 'tcp').catch(err => {
            console.log(`No process was running on port ${port}`);
        });

        await new Promise((resolve, reject) => {
            const server = app.listen(port, () => {
                console.log(`⚙️  Server is running at http://localhost:${port}`);
                resolve();
            });

            server.on('error', (error) => {
                if (error.code === 'EADDRINUSE') {
                    reject(new Error(`Port ${port} is still in use. Please try again.`));
                } else {
                    reject(error);
                }
            });
        });

        console.log('✅ MongoDB Connected');
        console.log('🛣️  Routes initialized');
    } catch (err) {
        console.error(`Failed to start server:`, err);
        process.exit(1); // Exit if server fails to start
    }
};

export { app };
export default startServer;