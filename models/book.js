// require mongoose
var mongoose = require('mongoose');

// store Schema in a variable
var Schema = mongoose.Schema;

// define book schema
var BookSchema = new Schema (
  {
    title: {type: String, required: true},
    author: {type: Schema.Types.ObjectId, ref : 'Author', required: true},
    summary: {type: String, required: true},
    isbn: {type: String, required: true},
    genre: [{type: Schema.Types.ObjectId, ref: 'Genre'}],
  }  
)

// define virtual for book's URL
BookSchema
  .virtual('url')
  .get(function () {
    return '/catalog/book/' + this._id;
  });

// export schema
module.exports = mongoose.model('Book', BookSchema);
