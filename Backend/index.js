require('dotenv').config();
const express = require("express")
const cors = require('cors');
const cookieParser = require('cookie-parser');
const dbConection = require("./config/db");
const  ApiError  = require('./utils/apiError');
const errorHandler = require('./middelwares/errorHandler');
const authRoute = require("./routes/authRoute")
const usersRoutes = require("./routes/usersRoute")
const app = express()


const corsOptions = {
    origin: 'http://localhost:3000',  
    credentials: true                 
  };
  
  
  // Connect TO Database
  dbConection()
  
  // Parse Data to json
  app.use(express.urlencoded({ extended: false }))
  app.use(express.json())
  app.use(cookieParser())
  app.use(cors(corsOptions));
  
// routing
app.use("/auth", authRoute)
app.use("/",usersRoutes)

// Handle unexpected routes
app.use("*", (req, res, next) => {
    const err = new ApiError(`this route can not be found ${req.originalUrl}`, 400)
    next(err)
})
app.use(errorHandler)


// run the server
const server = app.listen(process.env.PORT, () => {
    console.log("app is listening on port 8000")
})

process.on("unhandledRejection", (err) => {
    console.log(`${err.name}->${err.message}`)
    server.close(() => {
        console.log("shutting down ...")
        process.exit(1)
    })
})