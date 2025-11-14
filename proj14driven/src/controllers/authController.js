import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { getDb } from '../database/mongo.js';


export async function signUp(req, res) {
    const { name, email, password } = req.body;
    const db = getDb();

    try {
        const userExists = await db.collection('users').findOne({ email });

        if (userExists) {
            return res.status(409).send('Este e-mail já está cadastrado.');
        }

        const hashedPassword = bcrypt.hashSync(password, 10);
        await db.collection('users').insertOne({
            name,
            email,
            password: hashedPassword
        });

        res.status(201).send('Usuário cadastrado com sucesso.');
    } catch (error) {
        console.error('Erro no cadastro:', error);
        res.status(500).send('Erro no servidor.');
    }
}

export async function signIn(req, res) {
    const { email, password } = req.body;
    const db = getDb();

    try {
        const user = await db.collection('users').findOne({ email });

        if (!user) {
            return res.status(404).send('E-mail não encontrado.');
        }

        const isPasswordValid = bcrypt.compareSync(password, user.password);
        if (!isPasswordValid) {
            return res.status(401).send('Senha incorreta.');
        }

        const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
        console.log('Novo token gerado:', token);
        res.status(200).send({ token });
    } catch (error) {
        console.error('Erro no login:', error);
        res.status(500).send('Erro no servidor.');
    }
}