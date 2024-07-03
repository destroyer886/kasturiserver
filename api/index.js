const app = require('../server');
const {connectToDb} = require('../db')


module.exports = app;
module.exports = async (req, res) => {
    try {
    connectToDb();
      res.status(200).json({ message: 'Connected to MongoDB' });
    } catch (error) {
      console.error('Error connecting to MongoDB', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  };

  connectToDb()