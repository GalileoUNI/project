import { Link } from 'react-router-dom';
import './GalleryItem.css';

const GalleryItem = ({ book }) => {
  return (
    <div className="gallery-item">
      <Link to={`/detail/${book._id}`}>
        <h3>{book.title}</h3>
        <p>{book.summary}</p>
      </Link>
    </div>
  );
};

export default GalleryItem;
