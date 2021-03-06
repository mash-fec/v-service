const mongoose = require('mongoose');

require('dotenv').config();

const DBConnection = process.env.DB_CONNECTION_ATLAS || 'mongodb://localhost/mashbnb';

mongoose.connect(DBConnection, {useNewUrlParser: true});

var db = mongoose.connection;
db.on('error', () => { console.log('db connection error: ', DBConnection); });
db.once('open', () => { console.log('connected to db (db.js)'); });

var reviewSchema = new mongoose.Schema({
  indexes: Array,
  id: Number,
  picture: String,
  name: String,
  date: Date,
  text: String,
  accuracy: Number,
  communication: Number,
  cleanliness: Number,
  location: Number,
  checkin: Number,
  value: Number,
  avgRating: Number,
});

var Review = mongoose.model('Review', reviewSchema);


var reviewsByDate = (cb) => {
  Review.find({}).sort('-date').lean().exec((err, reviews) => {
    if (err) {
      console.log('sorted reviews error: ', err);
      cb(err, null);
    }
    cb(null, reviews);
  });
};

var reviewById = (cb, id) => {
  Review.findOne({id}).lean().exec((err, review) => {
    if (err) {
      console.log('sorted reviews error: ', err);
      cb(err, null);
    }
    cb(null, review);
  });
};

module.exports.reviewsByDate = reviewsByDate;
module.exports.reviewById = reviewById;
module.exports.Review = Review;
