// BookingDateForm.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from './Navbar';
import { Link } from 'react-router-dom';
import { useEffect } from 'react';

const BookingDateForm = () => {
  const [bookingDate, setBookingDate] = useState('');
  const Navigate=useNavigate();
  const userId=localStorage.getItem('userId');

  useEffect(() => {
    // Set the minimum selectable date to today
    const today = new Date().toISOString().split('T')[0];
    document.getElementById('bookingDate').min = today;
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!bookingDate) {
      alert('Please select a valid date.');
      return;
    }

    // Store the selected date in localStorage
    localStorage.setItem('bookingDate', bookingDate);

    // For demonstration purposes, you can navigate to the actual booking page here
    // or perform further actions with the stored date.
    console.log('Selected Date:', bookingDate);
    alert('Selected Date: ' + bookingDate);
    Navigate('/booking');
    
  };

  return (
    <div className="booking-container">
        <Navbar />
        <Link to={`/profile/${userId}`} className='link'><h3 className='profile'>P</h3></Link>

      <h2>Select Booking Date</h2>
      <form onSubmit={handleSubmit}>
        <label htmlFor="bookingDate">Select Date:</label>
        <input
          type="date"
          id="bookingDate"
          value={bookingDate}
          onChange={(e) => setBookingDate(e.target.value)}
          required
          style={{margin:1+'em'}}
        />
        <div>
        <button type="submit" style={{margin:1+'em'}}>Proceed to Booking</button>

        </div>
      </form>
    </div>
  );
};

export default BookingDateForm;
