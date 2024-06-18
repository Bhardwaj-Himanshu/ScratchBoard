const express = require('express');
const path = require('path');
const favicon = require('serve-favicon');

const app = express();
const PORT = 5500;

// Serve static files from the 'static' directory
app.use(express.static(path.join(__dirname, 'static')));
// Sever favicon from 'static' directory
app.use(favicon(path.join(__dirname, 'static', 'favicon.svg')));

// Routes
app.get('/', (req, res) => {
  try {
    res.status(200).sendFile(path.join(__dirname, 'static', 'index.html'));
  } catch (error) {
    console.log(error);
    let errorCode = error.statusCode || 500;
    res.status(errorCode).send(`An Error occurred due to ${errorCode}.`);
  }
});

app.get('/login', (req, res) => {
  try {
    res.status(200).sendFile(path.join(__dirname, 'static', 'login.html'));
  } catch (error) {
    console.log(error);
    let errorCode = error.statusCode || 500;
    res.status(errorCode).send(`An Error occurred due to ${errorCode}.`);
  }
});

app.get('/signup', (req, res) => {
  try {
    res.status(200).sendFile(path.join(__dirname, 'static', 'signup.html'));
  } catch (error) {
    console.log(error);
    let errorCode = error.statusCode || 500;
    res.status(errorCode).send(`An Error occurred due to ${errorCode}.`);
  }
});

// Start the server
app.listen(PORT, () => {
  console.log(`App has started on ${PORT}`);
});
