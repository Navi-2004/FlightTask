  // src/FlightList.js
  import React, { useState, useEffect } from 'react';
  import { Link } from 'react-router-dom';

  const FlightList = () => {
    const [flights, setFlights] = useState([]);

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
        <h1>Flight List</h1>
        <ul>
          {flights.map((flight) => (
            <li key={flight.id}>
              {flight.name} - {flight.start} to {flight.end} ({flight.seats} seats available)
            </li>
          ))}
        </ul>
        <Link to="/booking"><button >Book</button></Link> 
      </div>
    );
  };

  export default FlightList;
