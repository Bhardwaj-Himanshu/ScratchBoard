const express = require('express');
const path = require('path');

const PORT = 3000;
const app = express();

app.use('/', express.static(path.join(__dirname, '/public')));
app.use('/', require('./routes/root'));
app.all('*', (req, res) => {
  res.status(404);
  if (req.accepts('html')) {
    res.sendFile(path.join(__dirname, 'views', '404.html'));
  } else if (req.accepts(json)) {
    res.json({
      message: '404 Not Found',
      currentStatus: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
    });
  } else {
    res.send('Get off of that microwave dude,atleast use a computer.');
  }
});

app.listen(PORT, () => {
  console.log(`Server is running at ${PORT}`);
});
