import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import './DetailView.css';
//I don't know why the image is not showing up, the url is broken

const DetailView = () => {
  const { id } = useParams();
  const [book, setBook] = useState(null);
  const url = 'https://book-information-library.p.rapidapi.com/api/books/getall-books';
  const options = {
    method: 'GET',
    headers: {
      'X-RapidAPI-Key': '6127439150msh18f345643481813p1fdf97jsn2f658dd3a094',
      'X-RapidAPI-Host': 'book-information-library.p.rapidapi.com'
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(url, options);
        if (response.ok) {
          const jsonData = await response.json();
          const { books } = jsonData;
          const bookDetail = books.find(book => book._id === id);
          setBook(bookDetail);
        } else {
          console.error('Error fetching data:', response.statusText);
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, [id]);

  if (!book) {
    return <div>Loading...</div>;
  }

  return (
    <div className="detail-view">
      <h2>{book.title}</h2>
      <img src={book.img_url} alt={book.title} className="book-image"/>
      <p><strong>Author:</strong> {book.author}</p>
      <p><strong>Genre:</strong> {book.genre}</p>
      <p><strong>Summary:</strong> {book.summary}</p>
      <h3>Reviews:</h3>
      <ul>
        {book.reviews.map((review) => (
          <li key={review._id} className="review-item">
            <p><strong>Reviewer:</strong> {review.reviewer}</p>
            <p><strong>Rating:</strong> {review.rating}</p>
            <p><strong>Comment:</strong> {review.comment}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default DetailView;
