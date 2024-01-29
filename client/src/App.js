import './App.css';
import { BrowserRouter,Routes,Route } from 'react-router-dom'
import Register from './Register';
import Login from './Login';
import FlightList from './FlightList';
import Booking from './Booking';
import Profile from './Profile';
import AdminLogin from './AdminLogin';
import AdminDashboard from './AdminDashboard';
import HomeScreen from './pages/HomeScreen';
import axios from 'axios';
import BookingDateForm from './components/BookingDateForm';
axios.defaults.baseURL = 'http://localhost:5000';


function App() {
  return (
    <div className="App">
      <BrowserRouter>
      <Routes>
        <Route path='/' element={<HomeScreen />} />
        <Route path='/register' element={<Register />} />
        <Route path='/flight' element={<FlightList/>} />
        <Route path='/booking' element={<Booking />} />
        <Route path='/login' element={<Login />} /> 
        <Route path="/profile/:userId" element={<Profile/>} />
        <Route path='/admin/login' element={<AdminLogin />} />
        <Route path='/admin/dashboard' element={<AdminDashboard />} />
        <Route path='/booking/date' element={<BookingDateForm />} />

      </Routes>
      </BrowserRouter>

      
    </div>
  );
}

export default App;
