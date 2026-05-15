require("dotenv").config();
const express = require("express");
const cors = require("cors");
const dbconnect = require('./db/db');
const user = require('./routes/userroute');
const client = require('./routes/clientroutes')
const project = require('./routes/projectroutes')
const task = require('./routes/taskroutes')
const cors = require("cors");

const app = express();


const allowedOrigins = [
  "https://project-management-system-gules.vercel.app",
  "https://project-management-system-o1c2.vercel.app"
];

app.use(cors({
  origin: function(origin, callback) {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  credentials: true
}));

app.use(express.json())

dbconnect();



app.use("/api/auth" , user);
app.use("/api/client" , client);
app.use("/api/project" , project);
app.use("/api/task" , task);

app.listen(process.env.PORT,()=>{
    console.log(`Server started on port ${process.env.PORT}`)
});
