const mongoose = require('mongoose');
const net = require('net');

const checkLocalMongo = (host = '127.0.0.1', port = 27017, timeout = 1000) => {
  return new Promise((resolve) => {
    const socket = new net.Socket();
    let isConnected = false;

    socket.setTimeout(timeout);
    socket.on('connect', () => {
      isConnected = true;
      socket.destroy();
      resolve(true);
    });

    socket.on('timeout', () => {
      socket.destroy();
      resolve(false);
    });

    socket.on('error', () => {
      socket.destroy();
      resolve(false);
    });

    socket.connect(port, host);
  });
};

const connectDB = async () => {
  try {
    let connStr = process.env.MONGODB_URI;
    
    if (connStr) {
      console.log(`[DB] Attempting to connect to configured MONGODB_URI...`);
      try {
        await mongoose.connect(connStr);
        console.log(`[DB] Connected to MongoDB Atlas/URI: ${mongoose.connection.host}`);
        console.log(`MongoDB Connected Successfully`);
        return;
      } catch (err) {
        console.error(`[DB] Connection failed for MONGODB_URI. Error:`, err.message);
        console.error(`[DB] Troubleshooting tips:`);
        console.error(`- Check if the database name, username, and password in .env are correct.`);
        console.error(`- Ensure special characters in password are URL encoded (e.g. '@' as '%40').`);
        console.error(`- Ensure your IP address is whitelisted in your MongoDB Atlas console.`);
        console.error(`- Attempting local/in-memory fallback...`);
      }
    }

    const isLocalRunning = await checkLocalMongo();
    if (isLocalRunning) {
      console.log(`[DB] Local MongoDB daemon detected at 127.0.0.1:27017`);
      await mongoose.connect('mongodb://127.0.0.1:27017/skillforge_college');
      console.log(`[DB] Connected to Local MongoDB: ${mongoose.connection.host}`);
      console.log(`MongoDB Connected Successfully`);
    } else {
      console.log(`[DB] No local MongoDB daemon active. Initializing MongoMemoryServer fallback...`);
      const { MongoMemoryServer } = require('mongodb-memory-server');
      const mongod = await MongoMemoryServer.create();
      connStr = mongod.getUri();
      await mongoose.connect(connStr);
      console.log(`[DB] Connected to In-Memory MongoDB Server at: ${connStr}`);
      console.log(`MongoDB Connected Successfully`);
    }
  } catch (err) {
    console.error('[DB] Connection error:', err);
    process.exit(1);
  }
};

module.exports = connectDB;
