import express from 'express';
import dotenv from 'dotenv';
import allRoutes from './routes/index.js';
import { connectToDatabase } from './database/mongo.js';

dotenv.config();

const app = express();
app.use(express.json());

app.use(allRoutes);

const PORT = process.env.PORT || 5000;

connectToDatabase()
    .then(() => {
        app.listen(PORT, () => {
            console.log(`Servidor rodando na porta ${PORT}`);
        });
    })
    .catch((error) => {
        console.error('Erro fatal: a conexão com o banco de dados falhou.', error);
        process.exit(1);
    });