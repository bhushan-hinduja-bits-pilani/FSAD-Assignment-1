import React from 'react';
import './BookCard.css';

const BookCard = ({ book, onEdit, onDelete }) => {
  return (
    <div className="book-card">
      <h3>{book.title}</h3>
      <p><strong>Author:</strong> {book.author}</p>
      <p><strong>Genre:</strong> {book.genre}</p>
      <p><strong>Condition:</strong> {book.condition}</p>
      <p><strong>Availability:</strong> {book.isAvailable ? 'Available' : 'Not Available'}</p>
      <button onClick={() => onEdit(book)}>Edit</button>
      <button onClick={() => onDelete(book.id)}>Delete</button>
    </div>
  );
};

export default BookCard;
