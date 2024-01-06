  // src/FlightList.js
  import React, { useState, useEffect } from 'react';
  import { Link } from 'react-router-dom';

  const FlightList = () => {
    const [flights, setFlights] = useState([]);
   const userId=localStorage.getItem('userId');
   console.log(userId);
    useEffect(() => {
      // Fetch flights from the server
      const fetchFlights = async () => {
        try {
          const response = await fetch('http://localhost:5000/flights');
          const data = await response.json();
          setFlights(data);
        } catch (error) {
          console.error('Error fetching flights: ' + error.message);
        }
      };

      fetchFlights();
    }, []);

    return (
      <div>        
<Link to={`/profile/${userId}`} className='link'><h3 className='profile'>P</h3></Link>

        <h1>Flight List</h1>
        <div className="flight-cards">
        {flights.map((flight) => (
          <div key={flight.id} className="flight-card">
            <h2>{flight.name}</h2>
            <p>{flight.start} to {flight.dest}</p>
            <p>{flight.seats} seats available</p>
            {/* <Link className='link' to={`/booking/${flight.id}`}>
              <button>Book</button>
            </Link> */}
          </div>
        ))}
      </div>
        <Link className='link' to="/booking"><button >Book</button></Link> 
      </div>
    );
  };

  export default FlightList;
