const { format } = require('date-fns');
// destructuring and renaming v4->uuid
const { v4: uuid } = require('uuid');
const fs = require('fs');
// File system method that only uses functions returning promises to avoid callback hell
const fsPromises = require('fs').promises;
const path = require('path');

const logEvents = async (message, logFileName) => {
  const dateTime = format(new Date(), 'yyyyMMdd\tHH:mm:ss');
  const logItem = `${dateTime}\t${uuid()}\t${message}\n`;

  try {
    // checks if the log directory exists
    if (!fs.existsSync(path.join(__dirname, '..', 'logs'))) {
      // if not makes one
      await fsPromises.mkdir(path.join(__dirname, '..', 'logs'));
    }
    // appends the log message in a file in that directory
    await fsPromises.appendFile(
      path.join(__dirname, '..', 'logs', `${logFileName}`),
      logItem
    );
  } catch (error) {
    console.log(error);
  }
};

// actual middlware
const logger = (req, res, next) => {
  // if condition only to log important requests--> but it's better to save them to a loggingservice than saving onto a localfile
  if (['POST', 'PUT', 'DELETE'].includes(req.method)) {
    logEvents(`${req.method}\t${req.url}\t${req.headers.origin}`, 'reqLog.log');
  }
  console.log(`${req.method} ${req.path}`);
  next(); // --> so that next piece of code(middlewares or functions) could be called
};

module.exports = { logger, logEvents };
