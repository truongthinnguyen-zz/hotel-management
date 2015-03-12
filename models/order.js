
var mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    ObjectId = Schema.ObjectId;

var Order = new Schema({
    id: ObjectId,
    checkin: { type: Date, required: true },
    checkout: { type: Date },
    isovernight: { type: Boolean },
    potation: [Schema.Types.Mixed],
    status: { type: Boolean }
});

module.exports = mongoose.model('Orders', Order);