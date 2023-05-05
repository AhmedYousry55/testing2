const mongoose = require('mongoose');

const dotenv = require('dotenv');

dotenv.config({ path: './config.env' });

const app = require('./app');
// console.log(process.env);

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



//this Document is an instance of the tour model above , it has a couple of methods on it so we can use

//this will save this documet to the tours collection in the database


const port = 3006;

app.listen(process.env.PORT || 3006, () => {
  console.log(`app is running on port ${port}`);
});
