import express from 'express';

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());

app.get('/api', (req: express.Request, res: express.Response) => {
  res.json({ message: 'Hello World! Hello Nashville!!! And Hello Dave!!!!' });
});

app.listen(port, () => {
  console.log('Server running on port: ' + port);
});
