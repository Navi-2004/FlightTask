// AdminDashboard.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const AdminDashboard = () => {
  const [flightData, setFlightData] = useState({
    name: '',
    start: '',
    dest: '',
    seats: 0,
  });
  const [flights, setFlights] = useState([]);

  useEffect(() => {
    // Fetch flights when the component mounts
    fetchFlights();
  }, []);

  const fetchFlights = async () => {
    try {
      const response = await axios.get('http://localhost:5000/flights');
      setFlights(response.data);
    } catch (error) {
      console.error('Error fetching flights:', error.response.data);
    }
  };

  const handleAddFlight = async () => {
    try {
      await axios.post('http://localhost:5000/admin/add-flight', flightData);
      // Clear the form and fetch updated flights
      setFlightData({
        name: '',
        start: '',
        dest: '',
        seats: 0,
      });
      fetchFlights();
      alert("Flight Added Successfully")
    } catch (error) {
      console.error('Error adding flight:', error.response.data);
    }
  };

  const handleRemoveFlight = async (flightIdToRemove) => {
    try {
      await axios.post('http://localhost:5000/admin/remove-flight', {
        flightId: flightIdToRemove,
      });
      fetchFlights();
      alert("Flight Removed Successfully")
    } catch (error) {
      console.error('Error removing flight:', error.response.data);
    }
  };

  return (
    <div >
        <h1>Admin Dashboard</h1>
    <div className='admin'>
      {/* Left side for add/remove functionality */}
      <div className='left'>
        <h2>Add Flight</h2>
        <div>
        <label>Name:</label>
        <input
          type="text"
          value={flightData.name}
          onChange={(e) => setFlightData({ ...flightData, name: e.target.value })}
        />
        <label>Start:</label>
        <input
          type="text"
          value={flightData.start}
          onChange={(e) => setFlightData({ ...flightData, start: e.target.value })}
        />
        <label>Destination:</label>
        <input
          type="text"
          value={flightData.dest}
          onChange={(e) => setFlightData({ ...flightData, dest: e.target.value })}
        />
        <label>Seats:</label>
        <input
          type="number"
          value={flightData.seats}
          onChange={(e) => setFlightData({ ...flightData, seats: parseInt(e.target.value, 10) })}
        />
        </div>
        <button onClick={handleAddFlight}>Add Flight</button>

        
      </div>

      {/* Right side for displaying flights */}
      <div className='right' >
        <h2>All Flights</h2>
        <ul>
          {flights.map((flight) => (
            <li key={flight.id}>
              {flight.name} - {flight.start} to {flight.dest} ({flight.seats} seats)
              <div>
              <button onClick={() => handleRemoveFlight(flight.id)}>Remove</button>

              </div>

            </li>
          ))}
        </ul>
      </div>
    </div>
    </div>
  );
};

export default AdminDashboard;
