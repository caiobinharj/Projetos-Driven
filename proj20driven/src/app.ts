import express, { json } from "express";
import "express-async-errors"; // Importe isso no topo!
import dotenv from "dotenv";
import mainRouter from "./routers/index.js";
import errorHandler from "./middlewares/errorHandler.js";

dotenv.config();

const app = express();
app.use(json());
app.use(mainRouter);
app.use(errorHandler);

export default app;