const express = ('express');
const app = express();
const port = 3000;
import dotenv from 'dotenv';
dotenv.config();


app.get('/', (req, res) => {
    res.send('Hello World!');
});

app.get('/api/data', (req, res) => {
    const data = {
        message: 'This is some data from the server',
    };
    res.json(data);
});

app.listen(port, () => {
    console.log(`Server is running http://localhost:${port}`);
});

