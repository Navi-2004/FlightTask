// src/FlightList.js
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Navbar from "./components/Navbar";
import Loading from "./components/Loading";
import axios from "./axiosConfig";

const FlightList = () => {
  const [flights, setFlights] = useState([]);
  const [loading, setLoading] = useState(true);
  const userId = localStorage.getItem("userId");
  console.log(userId);
  useEffect(() => {
    // Fetch flights from the server
    const fetchFlights = async () => {
      try {
        const response = await axios.get("/flights");
        const data = response.data;
        setFlights(data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching flights: " + error.message);
      }
    };
  
    fetchFlights();
  }, []);

  if (loading) {
    return <Loading />;
  }
  return (
    <div>
      <Navbar />

      {userId ? (
        <Link to={`/profile/${userId}`} className="link">
          <h3 className="profile" readOnly>
            P
          </h3>
        </Link>
      ) : (
        <Link to="/login" className="link">
          <h3 className="profile" readOnly>
            P
          </h3>
        </Link>
      )}
      <h1 className="flighthead">Flight List</h1>

      <div className="flight-cards">
        {flights.map((flight) => (
          <div key={flight.id} className="flight-card">
            {/* <div className="flight-image-container">
        <img src="images/airplane.gif" alt="Flight" className="flight-image" />
      </div> */}
            <Link to="/booking/date" style={{ textDecoration: "none" }}>
              <h2 className="flight-name">{flight.name}</h2>
            </Link>
            <p className="flight-route">
              From: {flight.start} to {flight.dest}
            </p>
            <p className="flight-price">Total Fare: ₹{flight.price}</p>
            <p className="seats-available">{flight.seats} seats remaining</p>
            {/* <Link className='book-link' to={`/booking/${flight.id}`}>
        <button className='book-button'>Book Now</button>
      </Link> */}
          </div>
        ))}
      </div>

      <Link className="link" to="/booking/date">
        <button>Book</button>
      </Link>
    </div>
  );
};

export default FlightList;
