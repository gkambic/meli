import express from 'express';
import apiRoute from './routes/routes.js';
import cors from 'cors';

const app = express();
const port = 4000;

app.use(cors());

app.use('/api', apiRoute);

app.listen(port, () => {
  console.log(`App listening on port ${port}!`)
});
