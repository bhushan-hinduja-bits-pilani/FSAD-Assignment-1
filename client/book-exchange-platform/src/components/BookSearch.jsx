import React, { useState } from 'react';
import SearchBar from './SearchBar';
import BookCard from './BookCard';
import './BookSearch.css';

const BookSearch = ({ books }) => {
  const [query, setQuery] = useState('');
  const [filteredBooks, setFilteredBooks] = useState([]);

  const handleSearch = () => {
    setFilteredBooks(
      books.filter(
        (book) =>
          book.title.toLowerCase().includes(query.toLowerCase()) ||
          book.author.toLowerCase().includes(query.toLowerCase()) ||
          book.genre.toLowerCase().includes(query.toLowerCase())
      )
    );
  };

  return (
    <div className="book-search">
      <h2>Search Books</h2>
      <SearchBar query={query} onQueryChange={setQuery} onSearch={handleSearch} />
      <div className="search-results">
        {filteredBooks.map((book) => (
          <BookCard key={book.id} book={book} />
        ))}
      </div>
    </div>
  );
};

export default BookSearch;
