import express from 'express';
import dotenv from 'dotenv';
import { MongoClient, ObjectId } from 'mongodb';
import Joi from 'joi';
import cors from 'cors';

dotenv.config();

const app = express();
app.use(express.json());
app.use(cors({
    origin: 'http://localhost:63342'
}));


const port = process.env.PORT || 5000;
const mongoClient = new MongoClient(process.env.DATABASE_URL);
let db;



async function connectToMongo() {
    try {
        await mongoClient.connect();
        db = mongoClient.db();
        console.log("Conectado ao MongoDB!");
    } catch (err) {
        console.error("Erro ao conectar ao MongoDB:", err);
        process.exit(1);
    }
}

connectToMongo().then(() => {
    app.listen(port, () => {
        console.log(`Servidor rodando na porta ${port}`);
    });
});

const signUpSchema = Joi.object({
    username: Joi.string().required(),
    avatar: Joi.string().uri().required()
});

const tweetSchema = Joi.object({
    username: Joi.string().required(),
    tweet: Joi.string().required()
});


app.post('/sign-up', async (req, res) => {
    const { username, avatar } = req.body;

    const { error } = signUpSchema.validate({ username, avatar });
    if (error) {
        return res.status(422).send(error.details.map(detail => detail.message));
    }

    try {
        const usersCollection = db.collection('users');
        const existingUser = await usersCollection.findOne({ username });

        if (existingUser) {
            return res.status(409).send("Usuário já existe.");
        }

        await usersCollection.insertOne({ username, avatar });
        res.status(201).send("Usuário cadastrado com sucesso!");
    } catch (err) {
        console.error("Erro ao cadastrar usuário:", err);
        res.status(500).send("Erro interno do servidor.");
    }
});

app.post('/tweets', async (req, res) => {
    const { username, tweet } = req.body;

    const { error } = tweetSchema.validate({ username, tweet });
    if (error) {
        return res.status(422).send(error.details.map(detail => detail.message));
    }

    try {
        const usersCollection = db.collection('users');
        const userExists = await usersCollection.findOne({ username });

        if (!userExists) {
            return res.status(401).send("Usuário não cadastrado.");
        }

        const tweetsCollection = db.collection('tweets');
        await tweetsCollection.insertOne({ username, tweet });
        res.status(201).send("Tweet criado com sucesso!");
    } catch (err) {
        console.error("Erro ao criar tweet:", err);
        res.status(500).send("Erro interno do servidor.");
    }
});



app.get('/tweets/:username', async (req, res) => {
    const { username } = req.params;

    try {
        const tweetsCollection = db.collection('tweets');
        const usersCollection = db.collection('users');

        const tweets = await tweetsCollection.find({ username }).sort({ _id: -1 }).toArray();

        const tweetsWithAvatars = await Promise.all(tweets.map(async (t) => {
            const user = await usersCollection.findOne({ username: t.username });
            return {
                _id: t._id,
                username: t.username,
                avatar: user ? user.avatar : null,
                tweet: t.tweet
            };
        }));

        res.status(200).send(tweetsWithAvatars);
    } catch (err) {
        console.error("Erro ao buscar tweets do usuário:", err);
        res.status(500).send("Erro interno do servidor.");
    }
});


app.put('/tweets/:id', async (req, res) => {
    const { id } = req.params;
    const { username, tweet } = req.body;

    const { error } = tweetSchema.validate({ username, tweet });
    if (error) {
        return res.status(422).send(error.details.map(detail => detail.message));
    }

    try {
        const tweetsCollection = db.collection('tweets');
        const objectId = new ObjectId(id);

        const result = await tweetsCollection.updateOne(
            { _id: objectId, username },
            { $set: { tweet } }
        );

        if (result.matchedCount === 0) {
            return res.status(404).send("Tweet não encontrado ou você não tem permissão para editá-lo.");
        }

        res.status(204).send();
    } catch (err) {
        console.error("Erro ao atualizar tweet:", err);
        if (err.name === 'BSONTypeError') {
            return res.status(400).send("ID do tweet inválido.");
        }
        res.status(500).send("Erro interno do servidor.");
    }
});

app.delete('/tweets/:id', async (req, res) => {
    const { id } = req.params;
    const { username } = req.body;

    try {
        const tweetsCollection = db.collection('tweets');
        const objectId = new ObjectId(id);

        const result = await tweetsCollection.deleteOne({ _id: objectId, username });

        if (result.deletedCount === 0) {
            return res.status(404).send("Tweet não encontrado ou você não tem permissão para deletá-lo.");
        }

        res.status(204).send();
    } catch (err) {
        console.error("Erro ao deletar tweet:", err);
        if (err.name === 'BSONTypeError') {
            return res.status(400).send("ID do tweet inválido.");
        }
        res.status(500).send("Erro interno do servidor.");
    }
});