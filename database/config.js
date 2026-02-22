const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    // Simply pass the connection string and let Mongoose use sensible defaults.
    const uri = process.env.MONGO_URI;
    if (!uri) {
      throw new Error('MONGO_URI environment variable is not defined');
    }

    await mongoose.connect(uri);
    console.log('MongoDB connected successfully');
  } catch (err) {
    console.error('MongoDB connection error:', err.message);
    throw new Error('Failed to connect to MongoDB'); // Throw an error to be caught by the caller
  }
};

module.exports = connectDB;
