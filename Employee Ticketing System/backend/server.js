const express = require('express');
const path = require('path');
const { logger, logEvents } = require('./middleware/logger');

const app = express();
require('dotenv').config();

// Will face a CORS error here intially
const PORT = /*process.env.PORT ||*/ 3000;

/*<------------------------MIDDLEWARE------------------------------------> */
app.use(logger);
// ability to process JSON data
app.use(express.json());
// ability to render/send static files for anything coming to '/'
app.use('/', express.static(path.join(__dirname, 'public')));
// sends these to routes with callbacks
app.use('/', require('./routes/root'));
// 404 Page for if something invalid requested
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
/*<!-------------------END OF MIDDLEWARE----------------------!> */

app.listen(PORT, () => {
  console.log(`Server is running at ${PORT}`);
});
