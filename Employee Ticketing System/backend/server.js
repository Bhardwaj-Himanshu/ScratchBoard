import express from 'express';

const PORT = 3000;
const app = express();

app.get('/', (req, res) => {
  res.send('Welcome to the Root Page!');
});

app.listen(PORT, () => {
  console.log(`Server is running at ${PORT}`);
});
