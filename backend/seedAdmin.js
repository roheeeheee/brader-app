const mongoose = require('mongoose');
const path = require('path');
const dotenv = require('dotenv');

// Load environment variables from .env file
dotenv.config();

// Dynamically resolve the User model path to prevent MODULE_NOT_FOUND
let User;
try {
  User = require('./models/User');
} catch (err) {
  console.error('Error: Could not find User model at ./models/User.js');
  console.error('Make sure you are running this script from the backend root folder.');
  process.exit(1);
}

const seedAdmin = async () => {
  try {
    if (!process.env.MONGO_URI) {
      throw new Error('MONGO_URI is missing from your .env file.');
    }

    console.log('Connecting to MongoDB...');
    await mongoose.connect(process.env.MONGO_URI);
    console.log('Connected to DB successfully.');

    // 1. Clean up potential duplicates
    const adminEmail = 'admin@rubiks.com';
    const existingAdmin = await User.findOne({ email: adminEmail });
    
    if (existingAdmin) {
      console.log(`Admin with email ${adminEmail} already exists. Skipping seed.`);
      await mongoose.connection.close();
      process.exit(0);
    }

    // 2. Create the Admin
    console.log('Creating new admin user...');
    const admin = new User({
      name: 'System Admin',
      email: adminEmail,
      password: 'adminpassword123',
      role: 'admin',
      status: 'active',
      bio: 'Administrator of Twist & Turn Platform.'
    });

    // Save triggers the pre-save hook in User.js automatically
    await admin.save();

    console.log('Admin seeded successfully!');
    await mongoose.connection.close();
    process.exit(0);
  } catch (error) {
    console.error('Error during seeding process:', error.message);
    if (mongoose.connection.readyState !== 0) {
      await mongoose.connection.close();
    }
    process.exit(1);
  }
};

seedAdmin();