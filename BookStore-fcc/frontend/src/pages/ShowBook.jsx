import { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import BackButton from '../components/BackButton';
import Spinner from '../components/Spinner';

const ShowBook = () => {
  const [book, setBook] = useState({});
  const [loading, setLoading] = useState(false);
  const { id } = useParams();

  //So I need to send a axios request which is similar to fetch request
  useEffect(() => {
    axios(`http://localhost:5000/books/${id}`)
      .then((response) => {
        console.log(response.data.kitten);
        setBook(response.data.kitten);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);
  // now I need to show that book info,matching the id of the info clicked.
  return (
    <>
      <h1>{book._id}</h1>
      <h2>{book.title}</h2>

      <h3>{book.author}</h3>

      <h4>{book.publishYear}</h4>

      {/* <h5>{book._id}</h5> */}
    </>
  );
};
export default ShowBook;
