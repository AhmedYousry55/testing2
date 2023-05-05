const mongoose = require('mongoose');
const User = require('./userModel');
const Tour = require('./tourmodel');

const reviewSchema = new mongoose.Schema(
  {
    review: {
      type: String,
      require: [true, 'please write the review'],
    },

    Rating: {
      type: Number,
      min: 1,
      max: 5,
    },
    createdAt: {
      type: Date,
      default: Date.now(),
      select: false,
    },

    user: {
      type: mongoose.Schema.ObjectId,
      ref: User,
      required: [true, 'Review must belong to a user'],
    },

    tour: {
      type: mongoose.Schema.ObjectId,
      ref: Tour,
      required: [true, 'Review must belong to a tour'],
    },
  },

  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true }
  }
);

// reviewSchema.pre(/^find/, function (next) {
//   this.populate({ path: 'user', select:' name photo' })
//   .populate({ path: 'tour', select:' name' });
//   next();
// });

reviewSchema.pre(/^find/, function (next) {
  this.populate({ path: 'user', select:' name photo' }) 
  next();
});

const Review = new mongoose.model('Review', reviewSchema);

module.exports = Review;
