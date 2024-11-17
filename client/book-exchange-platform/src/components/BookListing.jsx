import React, { useState } from 'react';
import BookCard from './BookCard';
import './BookListing.css';

const BookListing = () => {
  const [books, setBooks] = useState([]);
  const [form, setForm] = useState({
    id: null,
    title: '',
    author: '',
    genre: '',
    condition: '',
    isAvailable: true,
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (form.id === null) {
      setBooks([...books, { ...form, id: Date.now() }]);
    } else {
      setBooks(books.map((book) => (book.id === form.id ? form : book)));
    }
    setForm({ id: null, title: '', author: '', genre: '', condition: '', isAvailable: true });
  };

  const handleEdit = (book) => {
    setForm(book);
  };

  const handleDelete = (id) => {
    setBooks(books.filter((book) => book.id !== id));
  };

  return (
    <div className="book-listing">
      <h2>Manage Your Book Listings</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Title"
          value={form.title}
          onChange={(e) => setForm({ ...form, title: e.target.value })}
          required
        />
        <input
          type="text"
          placeholder="Author"
          value={form.author}
          onChange={(e) => setForm({ ...form, author: e.target.value })}
          required
        />
        <input
          type="text"
          placeholder="Genre"
          value={form.genre}
          onChange={(e) => setForm({ ...form, genre: e.target.value })}
          required
        />
        <input
          type="text"
          placeholder="Condition"
          value={form.condition}
          onChange={(e) => setForm({ ...form, condition: e.target.value })}
          required
        />
        <label>
          <input
            type="checkbox"
            checked={form.isAvailable}
            onChange={(e) => setForm({ ...form, isAvailable: e.target.checked })}
          />
          Available
        </label>
        <button type="submit">{form.id === null ? 'Add Book' : 'Update Book'}</button>
      </form>
      <div className="book-list">
        {books.map((book) => (
          <BookCard key={book.id} book={book} onEdit={handleEdit} onDelete={handleDelete} />
        ))}
      </div>
    </div>
  );
};

export default BookListing;
