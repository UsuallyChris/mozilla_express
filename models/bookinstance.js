// require mongoose
var mongoose = require('mongoose');
// require moment
var moment = require('moment');

// store schema to a variable
var Schema = mongoose.Schema;

// define BookInstanceSchema
var BookInstanceSchema = new Schema(
  {
    book: {type: Schema.Types.ObjectId, ref: 'Book', required: true},
    imprint: {type: String, required: true},
    status: {type: String, required: true, enum: ['Available', 'Maintenance', 'Loaned', 'Reserved'], default: 'Maintenance'},
    due_back: {type: Date, default: Date.now}
  }
);

// virtual for bookinstance's URL
BookInstanceSchema
  .virtual('url')
  .get(function () {
    return '/catalog/bookinstance/' + this._id;
  });

// virtual for formatted date due back
BookInstanceSchema
  .virtual('due_back_formatted')
  .get(function () {
    return moment(this.due_back).format('MMMM Do, YYYY')
  });

// export model
module.exports = mongoose.model('BookInstance', BookInstanceSchema);