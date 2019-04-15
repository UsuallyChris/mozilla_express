// require mongoose
var mongoose = require('mongoose');

// set Schema to easily accessible variable
var Schema = mongoose.Schema;

// define the Author Schema with first_name, family_name, date_of_birth, and date_of_death fields
var AuthorSchema = new Schema(
  {
    first_name: {type: String, required: true, max: 100},
    family_name: {type: String, required: true, max: 100},
    date_of_birth: {type: Date},
    date_of_death: {type: Date},
  }
);

// define virtual for author's full name
AuthorSchema
  .virtual('name')
  .get(function () {
    return this.family_name + ', ' + this.first_name;
  });

// define virtual for author's lifespan
AuthorSchema
  .virtual('lifespan')
  .get(function () {
    return (this.date_of_death.getYear() - this.date_of_birth.getYear()).toString();
  });

// define virtual for specific author's URL
AuthorSchema
  .virtual('url')
  .get(function () {
    return '/catalog/author/' + this._id;
  });

// export schema
module.exports = mongoose.model('Author', AuthorSchema);