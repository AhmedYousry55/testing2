const express = require('express');
const { json } = require('express');
const app = express();
const morgan = require('morgan');
const tourRouter = require('./Routes/tourRoutes.js');
const userRouter = require('./Routes/userRoutes');
const reviewRouter = require('./Routes/reviewRoutes.js');

//1)MIDDLEWARES
// console.log(process.env);

if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

app.use(express.json());

app.use(express.static(`${__dirname}/public`));

app.use((req, res, next) => {
  console.log('hello from the middle ware ...');
  next();
});

app.use((req, res, next) => {
  req.requestTime = new Date().toISOString();
  // console.log(req.headers);
  next();
});

//2)ROUTEHANDLERS

// // app.get('/api/v1/tours', getAllTours);
// // app.post('/api/v1/tours', createTour);
// app.get('/api/v1/tours/:id/',getOneTour);
// app.patch('/api/v1/tours/:id',updateTour);
// app.delete('/api/v1/tours/:id', deleteTour );

//3)ROUTES

app.use('/api/v1/tours', tourRouter);
app.use('/api/v1/users', userRouter);
app.use('/api/v1/reviews', reviewRouter);

//4)START SERVER

module.exports = app;
