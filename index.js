import express from 'express';
import mongoose from 'mongoose';
import booksRoute from './routes/booksRoute.js';
import cors from 'cors';
import { config } from 'dotenv';

config();

const PORT = process.env.PORT || 5555;
const MONGO_URL = process.env.MONGO_URL;

mongoose
	.connect(MONGO_URL)
	.then(() => {
		console.log('Connected to MongoDB');
		app.listen(PORT, () => {
			console.log(`Server started on port ${PORT}`);
		});
	})
	.catch((err) => {
		console.error('Error connecting to MongoDB:', err);
	});

const app = express();
app.use(express.json());
app.use(
	cors({
		origin: 'http://localhost:3000',
		methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE'],
		allowedHeaders: ['Content-Type'],
	})
);

app.get('/', (request, response) => {
	response.send('Hello World!');
});

app.use('/books', booksRoute);
