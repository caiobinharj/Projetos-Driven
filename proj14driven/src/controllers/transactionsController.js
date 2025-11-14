import { getDb } from '../database/mongo.js';
import { ObjectId } from "mongodb";

export async function addTransaction(req, res) {
    const { value, description, type } = req.body;
    const db = getDb();
    const userId = req.userId;

    try {
        await db.collection('transactions').insertOne({
            userId: new ObjectId(userId),
            value,
            description,
            type,
            date: new Date()
        });
        res.status(201).send('Transação adicionada com sucesso.');
    } catch (error) {
        console.error('Erro ao adicionar transação:', error);
        res.status(500).send('Erro no servidor.');
    }
}

export async function getTransactions(req, res) {
    const { page } = req.query;
    const db = getDb();
    const userId = req.userId;

    const PAGE_SIZE = 10;
    let currentPage = parseInt(page, 10);

    if (!page || isNaN(currentPage) || currentPage < 1) {
        currentPage = 1;
    }

    try {
        const transactions = await db.collection('transactions')
            .find({ userId: new ObjectId(userId) })
            .sort({ date: -1 })
            .skip((currentPage - 1) * PAGE_SIZE)
            .limit(PAGE_SIZE)
            .toArray();

        res.status(200).send(transactions);
    } catch (error) {
        console.error('Erro ao buscar transações:', error);
        res.status(500).send('Erro no servidor.');
    }
}

export async function updateTransaction(req, res) {
    const { id } = req.params;
    const { value, description, type } = req.body;
    const userId = req.userId;
    const db = getDb();

    try {
        const transaction = await db.collection('transactions').findOne({ _id: new ObjectId(id) });

        if (!transaction || transaction.userId.toString() !== userId) {
            return res.status(401).send('Transação não encontrada ou você não tem permissão para editá-la.');
        }

        await db.collection('transactions').updateOne(
            { _id: new ObjectId(id) },
            { $set: { value, description, type } }
        );

        res.status(204).send();
    } catch (error) {
        console.error('Erro ao editar transação:', error);
        res.status(500).send('Erro no servidor.');
    }
}

export async function deleteTransaction(req, res) {
    const { id } = req.params;
    const userId = req.userId;
    const db = getDb();

    try {
        const transaction = await db.collection('transactions').findOne({ _id: new ObjectId(id) });

        if (!transaction || transaction.userId.toString() !== userId) {
            return res.status(401).send('Transação não encontrada ou você não tem permissão para excluí-la.');
        }

        await db.collection('transactions').deleteOne({ _id: new ObjectId(id) });
        res.status(204).send();
    } catch (error) {
        console.error('Erro ao deletar transação:', error);
        res.status(500).send('Erro no servidor.');
    }
}