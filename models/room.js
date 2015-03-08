
var mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    ObjectId = Schema.ObjectId;

var RoomModel = new Schema({
    id        : ObjectId,
    title     : { type: String, required: true }
});

module.exports = mongoose.model('Rooms', RoomModel);