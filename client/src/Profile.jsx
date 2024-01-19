

import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Loading from './components/Loading';
import Navbar from './components/Navbar';

const Profile = () => {
  const { userId } = useParams();
  const [user, setUser] = useState(null);
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  const [visibleBookings, setVisibleBookings] = useState(5);

  const handleSeeMore = () => {
    setVisibleBookings(visibleBookings + 5);
  };

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await fetch(`http://localhost:5000/user/${userId}`);
        const userData = await response.json();
        setUser(userData);

        const bookingsResponse = await fetch(`http://localhost:5000/bookings/${userId}`);
        const bookingsData = await bookingsResponse.json();
        setBookings(bookingsData);
        setLoading(false);
        console.log(bookingsData);
      } catch (error) {
        console.error('Error fetching user and bookings: ' + error.message);
      }
    };

    fetchUser();
  }, [userId]);

  if (!user || loading) {
    return <Loading />;
  }

  return (
    <div className="cont">
      <Navbar />
      <h1 className="profile-title">{user.username}'s Profile</h1>
      <p className="profile-email">Email: {user.email}</p>

      <h2 className="booking-section">Booking Details</h2>
      {bookings.length === 0 ? (
        <p>No bookings found.</p>
      ) : (
        <ul className="booking-list">
        {bookings.slice(0, visibleBookings).map((booking) => (
          <li key={booking.id} className="booking-item">
            <p>Flight Name: {booking.flight.name}</p>
            <p>Origin: {booking.flight.start}</p>
            <p>Destination: {booking.flight.dest}</p>
            <p>Date of Booking: {formatDate(booking.bookingdate)}</p>
            <p>Number of Bookings: {booking.noofbooking}</p>
            {/* Add more booking details as needed */}
          </li>
        ))}
      </ul>
      
      )}
      {bookings.length > visibleBookings && (
        <button onClick={handleSeeMore} className="see-more-button">
          See More
        </button>
      )}
    </div>
  );
};
function formatDate(dateString) {
  const options = { day: 'numeric', month: 'numeric', year: '2-digit' };
  const formattedDate = new Date(dateString).toLocaleDateString(undefined, options);
  return formattedDate;
}

export default Profile;

