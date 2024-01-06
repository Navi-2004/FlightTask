// // // src/Booking.js
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
  const [search, setSearch] = useState({ start: '', dest: '' });
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
          console.log(userId);
          if (userId) {
                    // Redirect to the profile page with the userId
                    navigate(`/profile/${userId}`);
                  }
        } else {
          console.error('Booking failed');
          alert('Booking failed');
        }
      };

  const handleSearch = async () => {
    try {
      const response = await fetch('http://localhost:5000/searchFlights', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(search),
      });

      if (!response.ok) {
        throw new Error('Failed to fetch flights');
      }

      const data = await response.json();
      setFlights(data);
    } catch (error) {
      console.error('Error:', error.message);
    }
  };

  return (
    <div>
      <h1>Book a Flight</h1>
      <label>User ID:</label>
      <input type="text" value={userId} onChange={(e) => setUserId(e.target.value)} />
      <br />
      <label>Search Flights:</label>
      <div>
        <label>Source:</label>
        <input type="text" value={search.start} onChange={(e) => setSearch({ ...search, start: e.target.value })} />
      </div>
      <div>
        <label>Destination:</label>
        <input type="text" value={search.dest} onChange={(e) => setSearch({ ...search, dest: e.target.value })} />
      </div>
      <button onClick={handleSearch}>Search</button>
      <br />
      <label>Select a Flight:</label>
      <select value={flightId} onChange={(e) => setFlightId(e.target.value)}>
        <option value="">Select a Flight</option>
        {flights.map((flight) => (
          <option key={flight.id} value={flight.id}>
            {flight.name} - {flight.start} to {flight.dest} ({flight.seats} seats available)
          </option>
        ))}
      </select>
      <br />
      <ul>
        {flights.map((flight) => (
          <li key={flight.id}>
            {flight.name} - {flight.start} to {flight.dest} ({flight.seats} seats available)
          </li>
        ))}
      </ul>
      <button onClick={handleBook}>Book</button>
    </div>
  );
};

export default Booking;




