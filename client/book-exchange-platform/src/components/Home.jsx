import React from 'react';
import { Link } from 'react-router-dom';
import './Home.css';

const Home = () => {
  return (
    <div className="home-page">
      <h1>Welcome to BookExchange!</h1>
      <nav>
        <Link to="/listings">Manage Your Books</Link>
        <Link to="/search">Search Books</Link>
      </nav>
    </div>
  );
};

export default Home;
