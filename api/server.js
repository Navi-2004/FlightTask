const express = require('express');
const cors = require('cors');
const pg = require('pg');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');
const app = express();

app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));

dotenv.config();

const pool = new pg.Pool({
  user: process.env.POSTGRES_USER,
  host: process.env.POSTGRES_HOST,
  database: process.env.POSTGRES_DATABASE,
  password: process.env.POSTGRES_PASSWORD,
  ssl:{
    rejectUnauthorized:false,
  },
  sslmode:'require',

});

pool.connect((err) => {
  if (err) {
    console.error('Database connection failed: ' + err.stack);
    return;
  }
  console.log('Connected to PostgreSQL database');
});

app.get('/', (req, res) => {
  res.send('Hello World');
});

app.post('/register', (req, res) => {
  const { username, email, password } = req.body;

  const sql = 'INSERT INTO register (username, email, password) VALUES ($1, $2, $3)';
  pool.query(sql, [username, email, password], (err, result) => {
    if (err) {
      console.error('Registration failed: ' + err.stack);
      res.status(500).send('Registration failed');
      return;
    }  
    console.log('User registered successfully');
    res.status(200).send('User registered successfully');
  });
});

// app.post('/login', (req, res) => {
//   const { email, password } = req.body;

//   const sql = 'SELECT * FROM register WHERE email = $1 AND password = $2';
//   pool.query(sql, [email, password], (err, result) => {
//     if (err) {
//       console.error('Login failed: ' + err.stack);
//       res.status(500).send('Login failed');
//       return;
//     }

//     if (result.rows.length > 0) {
//       console.log('Login successful');
//       res.status(200).send('Login successful');
//     } else {
//       console.error('Invalid credentials');
//       res.status(401).send('Invalid credentials');
//     }
//   });
// });

app.post('/login', (req, res) => {
    const { email, password } = req.body;
  
    const sql = 'SELECT id FROM register WHERE email = $1 AND password = $2';
    pool.query(sql, [email, password], (err, result) => {
      if (err) {
        console.error('Login failed: ' + err.stack);
        res.status(500).send('Login failed');
        return;
      }
  
      if (result.rows.length > 0) {
        const userId = result.rows[0].id;
        console.log('Login successful. User ID:', userId);
        res.status(200).json({ message: 'Login successful', userId });
      } else {
        console.error('Invalid credentials');
        res.status(401).send('Invalid credentials');
      }
    });
  });
  
  app.get('/user/:userId', async (req, res) => {
    const userId = req.params.userId;
    try {
      const result = await pool.query('SELECT * FROM register WHERE id = $1', [userId]);
      const user = result.rows[0];
      res.json(user);
    } catch (error) {
      console.error('Error fetching user details:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  });

  app.get('/bookings/:userId', async (req, res) => {
    const userId = req.params.userId;
    try {
      // Fetch bookings for the user with flight details
      const result = await pool.query(`
        SELECT b.*, f.Name, f.Start, f.Dest
        FROM bookings b
        JOIN flights f ON b.flightid = f.id
        WHERE b.Userid = $1
      `, [userId]);
  
      const bookings = result.rows;
      res.json(bookings);
    } catch (error) {
      console.error('Error fetching bookings:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  });
  

app.get('/flights', (req, res) => {
  const sql = 'SELECT * FROM flights';
  pool.query(sql, (err, result) => {
    if (err) {
      console.error('Error fetching flights: ' + err.stack);
      res.status(500).send('Error fetching flights');
      return;
    }

    res.json(result.rows);
  });
});

app.post('/book', (req, res) => {
  const { userId, flightId } = req.body;
  // Check if the flight is available
  const checkAvailabilitySql = 'SELECT * FROM flights WHERE id = $1 AND seats > 0';
  pool.query(checkAvailabilitySql, [flightId], (checkErr, checkResult) => {
    if (checkErr) {
      console.error('Booking failed: ' + checkErr.stack);
      res.status(500).send('Booking failed');
      return;  
    }

    if (checkResult.rows.length === 0) {
      console.error('Flight not available or does not exist');
      res.status(400).send('Flight not available or does not exist');
      return;
    }

    // Book the flight and update available seats
    const bookFlightSql = 'INSERT INTO bookings (userId, flightId) VALUES ($1, $2)';
    pool.query(bookFlightSql, [userId, flightId], (bookErr, bookResult) => {
      if (bookErr) {
        console.error('Booking failed: ' + bookErr.stack);
        res.status(500).send('Booking failed');
        return;
      }

      // Update available seats
      const updateSeatsSql = 'UPDATE flights SET seats = seats - 1 WHERE id = $1';
      pool.query(updateSeatsSql, [flightId], (updateErr, updateResult) => {
        if (updateErr) {
          console.error('Failed to update seats: ' + updateErr.stack);
          res.status(500).send('Booking failed');
          return;
        }

        console.log('Booking successful');
        res.status(200).send('Booking successful');
      });
    });
  });
});


// Add this route in your server code (assuming it's after the /flights route)
app.post('/searchFlights', (req, res) => {
  const { start, dest } = req.body;

  // Validate input parameters
  if (!start || !dest) {
    return res.status(400).json({ error: 'Invalid search parameters' });
  }

  const searchFlightsSql = `
    SELECT * FROM flights
    WHERE start ILIKE $1 AND dest ILIKE $2
  `;

  pool.query(searchFlightsSql, [`%${start}%`, `%${dest}%`], (err, result) => {
    if (err) {
      console.error('Error searching flights: ' + err.stack);
      return res.status(500).json({ error: 'Error searching flights' });
    }

    res.json(result.rows);
  });
});

app.listen(5000, () => {
  console.log('Server running on port 5000');
});
