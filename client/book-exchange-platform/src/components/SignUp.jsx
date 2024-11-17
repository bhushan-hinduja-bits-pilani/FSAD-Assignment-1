import React, { useState } from 'react';
import axios from 'axios';
import bcrypt from 'bcryptjs';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom';
import './SignUp.css';

const Signup = () => {
    const [formData, setFormData] = useState({
      firstName: '',
      lastName: '',
      email: '',
      password: '',
      confirmPassword: '',
    });

    const [error, setError] = useState('');
    const navigate = useNavigate();
  
    const handleChange = (e) => {
      const { name, value } = e.target;
      setFormData({
        ...formData,
        [name]: value,
      });

      if (name === 'password' || name === 'confirmPassword') {
        setError('');
      }
    };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Simple client-side validation for matching passwords
    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    try {

      // Hash the password using bcryptjs before sending to the backend
      const hashedPassword = await bcrypt.hash(formData.password, 10);

      // Create the request payload
      const payload = {
        first_name : formData.firstName,
        last_name : formData.lastName,
        email : formData.email,
        password: hashedPassword,
      };

      // Make the API call to the backend
      const response = await axios.post('http://localhost:3000/register', payload);

      // Handle successful response
      console.log('Signup successful:', response.data);
      // Redirect or show success message
      toast.success('Registration Successful!', {
        position: 'top-center',
        autoClose: 2000,
      });
  
      // Redirect to login page after 2 seconds
      setTimeout(() => {
        navigate('/login');
      }, 2000);
    } catch (err) {
      console.error('Error during signup:', err);
      
    } 
  };


  return (
    <div className="signup-container">
    <ToastContainer />
      <h2>Signup</h2>
      <form onSubmit={handleSubmit} className="signup-form">
        <div className="name-row">
          <input
            type="text"
            name="firstName"
            placeholder="First Name"
            value={formData.firstName}
            onChange={handleChange}
            required
          />
          <input
            type="text"
            name="lastName"
            placeholder="Last Name"
            value={formData.lastName}
            onChange={handleChange}
            required
          />
        </div>
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
          required
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleChange}
          required
        />
        <div className="password-wrapper">
        <input
          type="password"
          name="confirmPassword"
          placeholder="Confirm Password"
          value={formData.confirmPassword}
          onChange={handleChange}
          required
        />
        {error && <span className="error-message">{error}</span>}
        </div>
        <button type="submit" className="btn">Signup</button>
      </form>
    </div>
  );
};


export default Signup;
