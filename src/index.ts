import express from 'express';

const app = express();

app.get('/test', (req, res) => {
    res.send('Hello World');
});

app.listen(8080, () => {
    console.log('server started at http://localhost:8080');
});
