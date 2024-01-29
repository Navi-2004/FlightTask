import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "./components/Navbar";
import { Link } from "react-router-dom";
import Loading from "./components/Loading";
import StripeCheckout from "react-stripe-checkout";
import axios from "axios";

const Booking = () => {
  const [flightId, setFlightId] = useState("");
  const [noOfBookings, setNoOfBookings] = useState(1); // Default to 1 booking
  // const [bookingDate, setBookingDate] = useState(new Date().toISOString().split('T')[0]); // Default to today
  const [flights, setFlights] = useState([]);
  const [search, setSearch] = useState({ start: "", dest: "" });
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [visibleBookings, setVisibleBookings] = useState(5);
  const userId = localStorage.getItem("userId");
  const [isLoggedin, setIsLoggedin] = useState(false);
  const bookingDate = localStorage.getItem("bookingDate");
  const publishableKey =
    "pk_test_51OdlCuSFfBij0ekrxB8KgUsE3i7Mu3vHtOBwnsJcKrPiMrSZCnEk6kzrj00z175aHNTAdKc49WDvMPxSjnSU9ZYH00M9ziMs4W";
  // const priceForStripe = 100;
  const [priceForStripe, setPrice] = useState(0);
  const handleSeeMore = () => {
    setVisibleBookings(visibleBookings + 5);
  };
  useEffect(() => {
    if (localStorage.getItem("userId")) {
      setIsLoggedin(true);
    }
  }, []);

  const login = () => {
    alert("Please Login to Book a Flight");
    navigate("/login");
  };
  useEffect(() => {
    // Fetch available flights
    const fetchFlights = async () => {
      try {
        const response = await fetch("http://localhost:5000/flights");
        const data = await response.json();
        setFlights(data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching flights: " + error.message);
      }
    };

    fetchFlights();
  }, []);

  

  const payNow = async (token) => {
    try {
      const response = await axios({
        url: "http://localhost:5000/payment",
        method: "post",
        data: {
          amount: priceForStripe*noOfBookings,
          token,
          currency: 'inr',
        },
      });
      if (response.status === 200) {
        handleBook();
        alert("Payment Successful");
      }
    } catch (error) {
      // handleFailure();
      alert("Payment Failed");
      console.log(error);
    }
  };

  const handleBook = async () => {
    const response = await fetch("http://localhost:5000/book", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ userId, flightId, noOfBookings, bookingDate }),
    });

    if (response.ok) {
      console.log("Booking successful");
      alert("Booking successful");
      const userId = localStorage.getItem("userId");
      console.log(userId);
      if (userId) {
        // Redirect to the profile page with the userId
        navigate(`/profile/${userId}`);
      }
    } else {
      console.error("Booking failed");
      alert("Booking failed");
    }
  };

  const handleSearch = async () => {
    try {
      const response = await fetch("http://localhost:5000/searchFlights", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(search),
      });

      if (!response.ok) {
        throw new Error("Failed to fetch flights");
      }

      const data = await response.json();
      setFlights(data);
    } catch (error) {
      console.error("Error:", error.message);
    }
  };

  const handlePrice = (flightId) => {
    setFlightId(flightId);
  };
  
  useEffect(() => {
    const selectedFlight = flights.find((flight) => flight.id === parseInt(flightId));
    
    if (selectedFlight) {
      console.log("Selected flight:", selectedFlight);
      setPrice(selectedFlight.price);
      console.log(priceForStripe);
    }
  }, [flightId, flights, setPrice, priceForStripe]);
  
  

  if (loading) {
    return <Loading />;
  }

  return (

   

    <div>
      <Navbar />
      <Link to={`/profile/${userId}`} className="link">
        <h3 className="profile" readonly>
          P
        </h3>
      </Link>

      <div className="book">
        <div className="bookleft">
          <h1>Book a Flight</h1>

          <label>User ID:</label>
          <input type="text" value={userId} />
          <br />
          <label>Search Flights:</label>
          <div>
            <label>Source:</label>
            <input
              type="text"
              value={search.start}
              onChange={(e) => setSearch({ ...search, start: e.target.value })}
            />
          </div>
          <div>
            <label>Destination:</label>
            <input
              type="text"
              value={search.dest}
              onChange={(e) => setSearch({ ...search, dest: e.target.value })}
            />
          </div>
          <button onClick={handleSearch} style={{ marginBottom: 2 + "em" }}>
            Search
          </button>
          <br />
          <label>Select a Flight:</label>
          <select value={flightId} onChange={(e) => handlePrice(e.target.value)}>
            <option value="">Select a Flight</option>
            {flights.map((flight) => (
              <option key={flight.id} value={flight.id}>
                {flight.name} - {flight.start} to {flight.dest} ({flight.seats}{" "}
                seats available)
              </option>
            ))}
          </select>
          <br />
          <label>Number of Bookings:</label>
          <input
            type="number"
            value={noOfBookings}
            onChange={(e) => setNoOfBookings(e.target.value)}
            min="1"
          />
          <br />
          <label>Booking Date:</label>
          <input type="date" value={bookingDate} />
          <br />
          {/* <p>{priceForStripe}</p> */}
          {/* <button onClick={ isLoggedin? handlePay: login} >Book</button> */}
          <StripeCheckout
            stripeKey={publishableKey}
            label="Pay Now"
            name="Pay With Credit Card"
            // billingAddress
            // shippingAddress
            amount={priceForStripe *noOfBookings}
            description={`Your total is ${priceForStripe * noOfBookings}`}
            token={payNow}
          />
        </div>
        <div className="bookright">
          <ul>
            {flights.slice(0, visibleBookings).map((flight) => (
              <li key={flight.id}>
                {flight.name} - {flight.start} to {flight.dest} ({flight.seats}{" "}
                seats available)
                <div>Price: {flight.price}</div>
              </li>
            ))}
          </ul>
          <div>
            <button onClick={handleSeeMore}>See More</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Booking;
