import express from "express";
import cors from "cors";
import dotEnv from "dotenv";
import mongoose from "mongoose";
import newsRoute from "./routes/newsRoute.js";
import employeeRoute from "./routes/employeeRoute.js";
import path from "path";

const __dirname = path.resolve();
const app = express();

//middleware
app.use(express.json());
app.use(cors());

dotEnv.config();

const db_url = process.env.DB_URL;

// mongoose db connection
mongoose
  .connect(db_url, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("DB connected...");
    app.listen(8000, () => console.log("Server is running on port 8000..."));
  })
  .catch((error) => console.log("DB connection error = ", error));

app.use("/api/news", newsRoute);
app.use("/api/employee", employeeRoute);

app.use(express.static(path.join(__dirname, "/client/dist")));
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "client", "dist", "index.html"));
});
