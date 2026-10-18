import express from "express";
import cors from "cors";
import router from "./approuter.js";

const app = express();

app.use(cors());
app.use(express.json());
app.use("/api/words", router);

export default app;