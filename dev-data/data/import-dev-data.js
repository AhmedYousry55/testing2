const fs = require('fs');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const User = require('./../../models/userModel');
const Tour = require('./../../models/tourmodel');
const { log } = require('console');

dotenv.config({ path: './config.env' });

const DB = process.env.DATABASE.replace(
  '<PASSWORD>',
  process.env.DATABASE_PASSWORD
);

mongoose
  .connect(DB, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: true,
    //This databse returns a promise an we should handle it using then(con)=>{}
  })
  .then(() => {
    console.log('Database Connected successfully');
  });

//Read the file
const users = JSON.parse(fs.readFileSync(`${__dirname}/users.json`, 'utf-8'));

const tours = JSON.parse(fs.readFileSync(`${__dirname}/tours.json`, 'utf-8'));

//Importing the data

const importData = async () => {
  try {
    await User.create(users);
    await Tour.create(tours);
    console.log('Data Successfully loaded');
  } catch (err) {
    console.log(err);
  }
  process.exit();
};

//Delete all data in the databse

const deleteData = async () => {
  try {
    await User.deleteMany();
    await Tour.deleteMany();
    console.log('Data deleted successfully');
  } catch (error) {
    console.log(error);
  }
  process.exit();
};

if (process.argv[2] === '--import') {
  importData();
} else if (process.argv[2] === '--delete') {
  deleteData();
}

console.log(process.argv);
