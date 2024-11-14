import express from 'express';
import cors from 'cors';
import { getAll, getUpdated, changeRandom } from './controllers/data.controller.js';

const app = express();
app.use(express.json());

app.use(cors({origin: 'http://localhost:5173'}));

app.listen(3000, () => {
    console.log('Server is running on http://localhost:3000');
});

app.get('/data/all', getAll);
app.get('/data/updated', getUpdated);
app.patch('/data/random', changeRandom);

app.get('/', (req, res) => {
    res.send('Hello World');
});

app.use((err, req, res, next) => {
    const statusCode = err.statusCode || 500;
    const message = err.message || 'Internal Server Error';
    res.status(statusCode).json({ 
        success: false,
        statusCode,
        message
    });
});