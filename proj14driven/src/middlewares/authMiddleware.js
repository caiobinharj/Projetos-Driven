import jwt from 'jsonwebtoken';
import { getDb } from '../database/mongo.js';
import { ObjectId } from "mongodb";

export async function authMiddleware(req, res, next) {
    const { authorization } = req.headers;
    const token = authorization?.replace('Bearer ', '');
    const db = getDb();

    if (!token) {
        return res.status(401).send('Token de autenticação não fornecido.');
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const user = await db.collection('users').findOne({ _id: new ObjectId(decoded.userId) });

        if (!user) {
            return res.status(401).send('Usuário não encontrado.');
        }

        req.userId = decoded.userId;
        next();
    } catch (error) {
        console.error('Erro na autenticação:', error);
        return res.status(401).send('Token inválido.');
    }
}