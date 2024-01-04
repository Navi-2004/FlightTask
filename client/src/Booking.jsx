// // src/Booking.js
// import React, { useState, useEffect } from 'react';
// import { useNavigate } from 'react-router-dom';

// const Booking = () => {
//   const [userId, setUserId] = useState('');
//   const [flightId, setFlightId] = useState('');
//   const [flights, setFlights] = useState([]);
//   const navigate = useNavigate();

//   useEffect(() => {
//     // Fetch available flights
//     const fetchFlights = async () => {
//       try {
//         const response = await fetch('http://localhost:5000/flights');
//         const data = await response.json();
//         setFlights(data);
//         // navigate('/flight')
//       } catch (error) {
//         console.error('Error fetching flights: ' + error.message);
//       }
//     };

//     fetchFlights();
//   }, []);

//   const handleBook = async () => {
//     const response = await fetch('http://localhost:5000/book', {
//       method: 'POST',
//       headers: {
//         'Content-Type': 'application/json',
//       },
//       body: JSON.stringify({ userId, flightId }),
//     });

//     if (response.ok) {
//       console.log('Booking successful');
//       alert('Booking successful');
//       navigate('/flight');
//     } else {
//       console.error('Booking failed');
//       alert('Booking failed');
//     }
//   };

//   return (
//     <div>
//       <h1>Book a Flight</h1>
//       <label>User ID:</label>
//       <input type="text" value={userId} onChange={(e) => setUserId(e.target.value)} />
//       <br />
//       <label>Select a Flight:</label>
//       <select value={flightId} onChange={(e) => setFlightId(e.target.value)}>
//         <option value="">Select a Flight</option>
//         {flights.map((flight) => (
//           <option key={flight.id} value={flight.id}>
//             {flight.name} - {flight.origin} to {flight.destination} ({flight.seats} seats available)
//           </option>
//         ))}
//       </select>
//       <br />
//       <button onClick={handleBook}>Book</button>
//     </div>
//   );
// };

// export default Booking;
// src/Booking.js
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Booking = () => {
  const [userId, setUserId] = useState('');
  const [flightId, setFlightId] = useState('');
  const [flights, setFlights] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch available flights
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

  const handleBook = async () => {
    const response = await fetch('http://localhost:5000/book', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ userId, flightId }),
    });

    if (response.ok) {
      console.log('Booking successful');
      alert('Booking successful');
      const userId = localStorage.getItem('userId');

      if (userId) {
        // Redirect to the profile page with the userId
        navigate(`/profile/${userId}`);
      } else {
        // Handle the case where userId is not available in localStorage
        console.error('User ID not found in localStorage');
        // Redirect to a default page or handle the situation accordingly
        navigate('/default');
      }
    } else {
      console.error('Booking failed');
      alert('Booking failed');
    }
  };

  // Filter flights based on the search query
  const filteredFlights = flights.filter((flight) => {
    const lowercaseName = flight.name ? flight.name.toLowerCase() : '';
    const lowercaseOrigin = flight.origin ? flight.origin.toLowerCase() : '';
    const lowercaseDestination = flight.destination ? flight.destination.toLowerCase() : '';
  
    return (
      lowercaseName.includes(searchQuery.toLowerCase()) ||
      lowercaseOrigin.includes(searchQuery.toLowerCase()) ||
      lowercaseDestination.includes(searchQuery.toLowerCase())
    );
  });
  

  return (
    <div>
      <h1>Book a Flight</h1>
      <label>User ID:</label>
      <input type="text" value={userId} onChange={(e) => setUserId(e.target.value)} />
      <br />
      <label>Search for a Flight:</label>
      <input
        type="text"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        placeholder="Type to search..."
      />
      <ul>
        {filteredFlights.map((flight) => (
          <li key={flight.id} onClick={() => setFlightId(flight.id)}>
            {flight.name} - {flight.origin} to {flight.destination} ({flight.seats} seats available)
          </li>
        ))}
      </ul>
      <br />
      <button onClick={handleBook}>Book</button>
    </div>
  );
};

export default Booking;
