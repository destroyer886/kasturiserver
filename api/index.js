// api/index.js

const app = require('../server');
const { connectToDb } = require('../db');

let cachedDb = null;

module.exports = async (req, res) => {
  try {
    // Connect to MongoDB if not already cached
    if (!cachedDb) {
      cachedDb = await connectToDb();
     
    }

    // Handle the request through the Express app
    await app(req, res);
  } catch (error) {
    console.error('Error handling request:', error);
    res.status(500).send('Internal Server Error');
  }
};
