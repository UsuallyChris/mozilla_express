// require mongoose
var mongoose = require('mongoose');

// store schema in a variable
var Schema = mongoose.Schema;

// define genre schema
var GenreSchema = new Schema (
  {
    name: {type: String, required: true, min: 3, max: 100}
  }
);

// define virtual for genre url
GenreSchema
  .virtual('url')
  .get(function () {
    return '/catalog/genre/' + this._id;
  });

// export model
modules.export = mongoose.model('Genre', GenreSchema);