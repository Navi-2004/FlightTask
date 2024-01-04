// import React, { useState, useEffect } from 'react';
// import { useParams } from 'react-router-dom';

// const Profile = () => {
//   const { userId } = useParams();
//   const [user, setUser] = useState(null);
//   const [bookings, setBookings] = useState([]);

//   useEffect(() => {
//     const fetchUser = async () => {
//       try {
//         const response = await fetch(`http://localhost:5000/user/${userId}`);
//         const userData = await response.json();
//         setUser(userData);

//         const bookingsResponse = await fetch(`http://localhost:5000/bookings/${userId}`);
//         const bookingsData = await bookingsResponse.json();
//         setBookings(bookingsData);
//         console.log(bookingsData);
//       } catch (error) {
//         console.error('Error fetching user and bookings: ' + error.message);
//       }
//     };

//     fetchUser();
//   }, [userId]);

//   if (!user) {
//     return <div>Loading...</div>;
//   }

//   return (
//     <div className="cont">
//       <h1>{user.username}'s Profile</h1>
//       <p>Email: {user.email}</p>

//       <h2>Booking Details</h2>
//       {bookings.length === 0 ? (
//         <p>No bookings found.</p>
//       ) : (
//         <ul>
//           {bookings.map((booking) => (
//             <li key={booking.id}>
//               <p>Flight Name: {booking.name}</p>
//               <p>Origin: {booking.start}</p>
//               <p>Destination: {booking.dest}</p>
//               {/* Add more booking details as needed */}
//             </li>
//           ))}
//         </ul>
//       )}
//     </div>
//   );
// };

// export default Profile;
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

const Profile = () => {
  const { userId } = useParams();
  const [user, setUser] = useState(null);
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await fetch(`http://localhost:5000/user/${userId}`);
        const userData = await response.json();
        setUser(userData);

        const bookingsResponse = await fetch(`http://localhost:5000/bookings/${userId}`);
        const bookingsData = await bookingsResponse.json();
        setBookings(bookingsData);
        console.log(bookingsData);
      } catch (error) {
        console.error('Error fetching user and bookings: ' + error.message);
      }
    };

    fetchUser();
  }, [userId]);

  if (!user) {
    return <div>Loading...</div>;
  }

  return (
    <div className="cont">
      <h1 className="profile-title">{user.username}'s Profile</h1>
      <p className="profile-email">Email: {user.email}</p>

      <h2 className="booking-section">Booking Details</h2>
      {bookings.length === 0 ? (
        <p>No bookings found.</p>
      ) : (
        <ul className="booking-list">
          {bookings.map((booking) => (
            <li key={booking.id} className="booking-item">
              <p>Flight Name: {booking.name}</p>
              <p>Origin: {booking.start}</p>
              <p>Destination: {booking.dest}</p>
              {/* Add more booking details as needed */}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Profile;
