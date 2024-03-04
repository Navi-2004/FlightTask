import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Loading from "./components/Loading";
import Navbar from "./components/Navbar";
import axios from "./axiosConfig";
import QRCode from "react-qr-code";

const Profile = () => {
  const { userId } = useParams();
  const [user, setUser] = useState(null);
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [visibleBookings, setVisibleBookings] = useState(5);

  const handleSeeMore = () => {
    setVisibleBookings((prevVisibleBookings) => prevVisibleBookings + 5);
  };

  useEffect(() => {
    const fetchUserAndBookings = async () => {
      try {
        const [userResponse, bookingsResponse] = await Promise.all([
          axios.get(`/user/${userId}`),
          axios.get(`/bookings/${userId}`),
        ]);
        setUser(userResponse.data);
        setBookings(bookingsResponse.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching user and bookings:", error.message);
      }
    };

    if (userId) {
      fetchUserAndBookings();
    }
  }, [userId]);

  if (!user || loading) {
    return <Loading />;
  }

  return (
    <div>
      <Navbar />
      <div className="profile-container">
        <div className="profile-section">
          <div className="profile-card">
            <div className="profile-image">P</div>
            <h1 className="profile-title">{user.username}'s Profile</h1>
            <p className="profile-email">Email: {user.email}</p>
            <h2 className="recent-bookings-title">Recent Booking</h2>
            {bookings.length === 0 ? (
              <p>No recent bookings found.</p>
            ) : (
              <div className="recent-booking">
                <p>Flight Name: {bookings[bookings.length - 1].flight.name}</p>
                <p>Origin: {bookings[bookings.length - 1].flight.start}</p>
                <p>Destination: {bookings[bookings.length - 1].flight.dest}</p>
                <p>
                  Date of Booking:{" "}
                  {formatDate(bookings[bookings.length - 1].bookingdate)}
                </p>
                <p>
                  Number of Bookings:{" "}
                  {bookings[bookings.length - 1].noofbooking}
                </p>
                <p>Price: {bookings[bookings.length - 1].totalprice}</p>
              </div>
            )}
          </div>
        </div>

        <div className="profileright">
          <h2>Booking Details</h2>
          <div className="booking-section">
            {bookings.length === 0 ? (
              <p style={{marginLeft:22+"em"}}>No bookings found.</p>
            ) : (
              <ul className="booking-list">
                {bookings.slice(0, visibleBookings).map((booking) => (
                  <li key={booking.id} className="booking-item">
                    <div className="ticket">
                      <div className="ticket-details">
                      <h2 className="ticket-heading">Flight Ticket</h2>

                        <p>
                          <strong>Flight Name:</strong> {booking.flight.name}
                        </p>
                        <p>
                          <strong>Origin:</strong> {booking.flight.start}
                        </p>
                        <p>
                          <strong>Destination:</strong> {booking.flight.dest}
                        </p>
                        <p>
                          <strong>Date of Booking:</strong>{" "}
                          {formatDate(booking.bookingdate)}
                        </p>
                        <p>
                          <strong>Number of Bookings:</strong>{" "}
                          {booking.noofbooking}
                        </p>
                        <p>
                          <strong>Price:</strong> {booking.totalprice}
                        </p>
                      </div>
                      <div className="ticket-qr">
                        <QRCode className="imag" value={JSON.stringify(booking,null,2)} />
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            )}
          </div>
          {bookings.length > visibleBookings && (
            <button onClick={handleSeeMore} className="see-more-button">
              See More
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

function formatDate(dateString) {
  const options = { day: "numeric", month: "numeric", year: "2-digit" };
  return new Date(dateString).toLocaleDateString(undefined, options);
}

export default Profile;
