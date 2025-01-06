import express from "express";
import cors from 'cors'
import cookieParser from 'cookie-parser'  // not CookieParser from 'cookieparser'

const app = express();
// Basic CONFIG Work Here
// Can be used for every deveploment environment.
// cors ki configaration , origin means kay kis frontend saay talking karni hay. iss a url do  process.env.CORS_ORIGIN maay.
app.use(cors({
    origin: process.env.CORS_ORIGIN, 
    credentials: true,
    optionsSuccessStatus: 200
}))

const port = process.env.PORT || 6000

 const server = function serverListening () {
     app.listen(port, () => {
    console.log(`⚙️  Server is running at http://localhost:${port}`);
    console.log('✅ MongoDB Connected');
    console.log('🛣️  Routes initialized');
});}
// cookie parser configuration. no need of additional key-value configuration data
app.use(cookieParser())

//Json ki limit lagani ha itni hi aaiy
app.use(express.json({ limit:'16kb' }))

//Url ki limit and syntax config
app.use(express.urlencoded({ extended: true, limit:'16kb' }))

// files store karvanay ka liay public folder or uploads folder (kay indar) use kar saktaay haay
// app.use(express.static('uploads'))
app.use(express.static('public'))
// app.listen(process.env.PORT, () => console.log(`Server is running on ${process.env.PORT}`));




//routes


export { app }
export default server;