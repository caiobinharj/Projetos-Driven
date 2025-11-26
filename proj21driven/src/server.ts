import express from 'express';
import 'dotenv/config';
import authRouter from './routers/authRouter';
import credentialRouter from './routers/credentialRouter';
import { errorHandler } from './middlewares/errorHandlerMiddleware';

const app = express();

app.use(express.json());

app.get('/health', (req, res) => {
  res.status(200).send("I'm OK!");
});

app.use(authRouter);
app.use(credentialRouter);

app.use(errorHandler);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});






