require("dotenv").config();
const express = require("express");
const cors = require("cors");
const dbconnect = require('./db/db');
const user = require('./routes/userroute');
const client = require('./routes/clientroutes')
const project = require('./routes/projectroutes')
const task = require('./routes/taskroutes')

const app = express();

dbconnect();

app.use(cors({
  origin: "https://project-management-system-gules.vercel.app",
  credentials: true
}));

app.use(express.json())

app.use(cors())

app.use("/api/auth" , user);
app.use("/api/client" , client);
app.use("/api/project" , project);
app.use("/api/task" , task);

app.listen(process.env.PORT,()=>{
    console.log(`Server started on port ${process.env.PORT}`)
});
