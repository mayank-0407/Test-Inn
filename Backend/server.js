const express = require("express");
const cors = require("cors");
const { mongoose } = require("mongoose");

const authroutes = require("./routes/authRoutes");
const quizroutes = require("./routes/quizRoutes");
const data = require("./routes/data");

require("dotenv").config();

const app = express();

const PORT = process.env.PORT || 5000;

// Middleware
const corsOptions ={
  origin:['http://localhost:5173'], 
  credentials:true,            //access-control-allow-credentials:true
  optionSuccessStatus:200
}

app.use(cors(corsOptions));
app.use(express.json());

try {
  mongoose.connect(process.env.MONGODB_URI);
  console.log("MongoDB connected...");
} catch (error) {
  console.log(error);
}

app.use("/api", authroutes);
app.use("/quiz", quizroutes);
app.use("/data", data);

app.listen(PORT, () => console.log(`Server is running at port: ${PORT}`));
