// Import necessary modules
const express = require('express');
const mysql = require('mysql');
const cors = require('cors');

const app = express();
const port = 5000; // Port where the backend server will run

// Enable CORS to allow requests from the frontend (running on a different port)
app.use(cors());

// Middleware to parse JSON bodies
app.use(express.json());

// Create a connection to the MySQL database
const connection = mysql.createConnection({
  host: 'localhost',            // Your MySQL host (usually localhost)
  user: 'your_mysql_username',  // Your MySQL username
  password: 'your_mysql_password', // Your MySQL password
  database: 'portfolio_db'      // The database name you created for this project
});

// Connect to the database
connection.connect(err => {
  if (err) {
    console.error('Error connecting to MySQL database: ', err);
    return;
  }
  console.log('Connected to MySQL database.');
});

// Define an API route to fetch portfolio projects from the database
app.get('/api/projects', (req, res) => {
  const query = 'SELECT * FROM projects';
  connection.query(query, (err, results) => {
    if (err) {
      console.error('Error fetching projects: ', err);
      return res.status(500).json({ error: 'Database query error' });
    }
    // Send the results as JSON
    res.json(results);
  });
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
