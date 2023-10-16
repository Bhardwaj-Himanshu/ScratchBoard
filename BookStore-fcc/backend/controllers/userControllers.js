// What functions are called when particular routes are called.

const getRootPage = (req, res) => {
  try {
    res.status(200).send('GET Request to /');
    console.log('GET Request to /');
  } catch (error) {
    console.log(error);
  }
};
const postBooksPage = (req, res) => {
  try {
    res.status(201).send('POST Request to /');
    console.log('POST Request to /Books');
  } catch (error) {
    console.log(error);
  }
};

export { getRootPage, postBooksPage };
