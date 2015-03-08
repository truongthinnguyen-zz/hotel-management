
var mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    ObjectId = Schema.ObjectId;

var CustomerSchema = new Schema({
    id: ObjectId,
    fullname: { type: String, required: true, trim: true},
    identifycard: { type: Number },
    phonenumber: { type: String, trim: true },
    email: { type: String, trim: true }
});

module.exports = mongoose.model('Customers', CustomerSchema);