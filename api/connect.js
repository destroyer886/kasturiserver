

const connectToDb = require('../db');

module.exports = async (req, res) => {
  try {
    const db = await connectToDb();
    res.status(200).json({ message: 'Server is Running' });
  } catch (error) {
    console.error('Error connecting to MongoDB', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};
