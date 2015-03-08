
var mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    ObjectId = Schema.ObjectId;

var Potation = new Schema({
    id: ObjectId,
    title: { type: String, required: true },
    price: { type: Number, required: true },
    type: { type: Number, required: true }      // 0: potation / 1: room-type
});

// price setter
Potation.path('price')
    .default(function(){
        return 0
    });

module.exports = mongoose.model('Potations', Potation);