import { useState, useEffect } from "react";
import GalleryItem from "../GalleryItem/GalleryItem";
import "./Gallery.css";
//I don't know why the image is not showing up, the url is broken
const Gallery = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const url =
    "https://book-information-library.p.rapidapi.com/api/books/getall-books";
  const options = {
    method: "GET",
    headers: {
      "X-RapidAPI-Key": "6127439150msh18f345643481813p1fdf97jsn2f658dd3a094",
      "X-RapidAPI-Host": "book-information-library.p.rapidapi.com",
    },
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(url, options);
        if (response.ok) {
          const jsonData = await response.json();
          const { books } = jsonData;
          setData(books);
          setFilteredData(books);
        } else {
          console.error("Error fetching data:", response.statusText);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  const handleSearch = (event) => {
    const term = event.target.value;
    setSearchTerm(term);

    if (term === "") {
      setFilteredData(data);
    } else {
      const filtered = data.filter((item) => {
        return (
          item.title.toLowerCase().includes(term.toLowerCase()) ||
          item.summary.toLowerCase().includes(term.toLowerCase())
        );
      });
      setFilteredData(filtered);
    }
  };

  return (
    <div className="gallery-container">
      <input
        type="text"
        placeholder="Search..."
        value={searchTerm}
        onChange={handleSearch}
        className="search-input"
      />
      <div className="gallery">
        {filteredData.map((book, index) => (
          <GalleryItem key={index} book={book} />
        ))}
      </div>
    </div>
  );
};

export default Gallery;
