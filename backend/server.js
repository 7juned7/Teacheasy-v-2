const express = require("express");
require("dotenv").config()
const userRoutes = require("./Routes/userRoutes")
const studentRoutes = require("./Routes/studentRoutes")
const connectDB = require("./config/db");
const path = require("path");
const cors = require('cors');
app.use(cors());


const PORT = process.env.PORT || 4000;
connectDB();

const app = express();


app.use(express.json())

app.use('/api/user', userRoutes)
app.use('/api/studentdata', studentRoutes)

// --------deployement-----------
// const __dirname1 = path.resolve();
// const dev = process.env.NODE_ENV
// if (dev === "development") {

//     app.use(express.static(path.join(__dirname1, "/frontend/build")));
//     app.get('*', (req, res) => {


//         res.sendFile(path.resolve(__dirname1, "frontend", "build", "index.html"))
//     });
// } else {
//     app.get('/', (req, res) => {

//         res.send(dev);

//     })
// }

app.use("/", (req, res) => {
    res.send("server is running")
})




app.listen(4000, console.log(`Server Started on PORT ${PORT}`));
