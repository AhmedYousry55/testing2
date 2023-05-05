const Review = require('./../models/reviewModel');
const catchAsync = require('./../utils/catchAsync');
const AppError = require('./../utils/appError');

exports.getAllReviews = catchAsync(async (req, res,next) => {
  const reviews = await Review.find();

  res.status(200).json({
    status: 'sucess',
    data: {
        results:reviews.length,
      reviews,
    },
  });
});

exports.createReview = catchAsync(async (req, res) => {
  const NewReview = await Review.create(req.body);

  res.status(201).json({
    status: 'sucess',
    data: {
        review: NewReview,
    },
  });
});

exports.getReview = catchAsync(async (req, res) => {
  const review = await Review.findById(req.params.id);

  if (!review) {
    return next(new AppError('No Document Found'));
  }

  res.status(200).json({
    status: 'sucess',
    data: {
      review,
    },
  });
});

exports.updateReview = catchAsync(async (req, res) => {
  const review = await Review.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });

  if (!review) {
    return next(new AppError('No document found'));
  }

  res.status(200).json({
    status: 'sucess',
    data: {
      review,
    },
  });
});

exports.deleteReview = catchAsync(async (req, res) => {
  const Review = await Review.findByIdAndDelete(req.params.id);

  if (!review) {
    return next(new AppError('No Document Found'));
  }

  res.status(200).json({
    status:'sucess',
    data:{

    }
  })
});
