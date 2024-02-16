const express = require('express');
const connectDB = require('./config/dbConfig');
const mongoose = require('mongoose');
const path = require('path');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const { logger, logEvents } = require('./middleware/logger');
const corsOptions = require('./config/corsOptions');
const errorHandler = require('./middleware/errorHandler');

const app = express();
require('dotenv').config();

// Will face a CORS error here intially
const PORT = process.env.PORT || 3500;

/*<------------------------MIDDLEWARE------------------------------------> */
app.use(logger);
// ability to process JSON data
app.use(express.json());
// ability of cross origin resource sharing API fetching via other sites
app.use(cors(corsOptions));
// ability to use cookies
app.use(cookieParser());
// ability to render/send static files for anything coming to '/'
app.use('/', express.static(path.join(__dirname, 'public')));
// sends these to routes with callbacks
app.use('/', require('./routes/root'));
// making controller functions
app.use('/users', require('./routes/userRoutes.js'));
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

app.use(errorHandler);

mongoose
  .connect(process.env.DATABASE_URI)
  .then(() => {
    console.log('Database connected successfully!');
    app.listen(PORT, () => {
      console.log(`Server is running at ${PORT}`);
    });
  })
  .catch((error) => {
    console.log(error);
    logEvents(
      `${err.name}: ${err.message}\t${req.method}\t${req.url}\t${req.headers.origin}`,
      'mongoErrLog.log'
    );
  });
