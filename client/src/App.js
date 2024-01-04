// import logo from './logo.svg';
// import './App.css';

// function App() {
//   return (
//     <div className="App">
//       <header className="App-header">
//         <img src={logo} className="App-logo" alt="logo" />
//         <p>
//           Edit <code>src/App.js</code> and save to reload.
//         </p>
//         <a
//           className="App-link"
//           href="https://reactjs.org"
//           target="_blank"
//           rel="noopener noreferrer"
//         >
//           Learn React
//         </a>
//       </header>
//     </div>
//   );
// }

// export default App;
import './App.css';
import { BrowserRouter,Routes,Route } from 'react-router-dom'
import Register from './Register';
import Login from './Login';
import FlightList from './FlightList';
import Booking from './Booking';
import Profile from './Profile';


function App() {
  return (
    <div className="App">
      <BrowserRouter>
      <Routes>
        <Route path='/' element={<Register />} />
        <Route path='/flight' element={<FlightList/>} />
        <Route path='/booking' element={<Booking />} />
        <Route path='/login' element={<Login />} /> 
        <Route path="/profile/:userId" element={<Profile/>} />

        {/* <Route path='/update/:id' element={<Update />} /> */}
      </Routes>
      </BrowserRouter>

      
    </div>
  );
}

export default App;
