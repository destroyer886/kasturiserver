// api/index.js

const app = require('../server'); // Adjust the path as needed
const { connectToDb } = require('../db'); // Adjust the path as needed

let cachedDb = null;

module.exports = async (req, res) => {
  try {
    // Connect to MongoDB
    const db = await connectToDb();
    cachedDb = db; // Cache the database connection for reuse

    // Handle the request through the Express app
    await app(req, res);
  } catch (error) {
    console.error('Error handling request:', error);
    res.status(500).send('Internal Server Error');
  }
};
