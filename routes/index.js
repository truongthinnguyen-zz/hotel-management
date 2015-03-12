/*!
* Demo registration application
* Copyright(c) 2011 Jean-Tiare LE BIGOT <admin@jtlebi.fr>
* MIT Licensed
*/

// loads model file and engine
var mongoose    = require('mongoose'),
    //memberModel = require('../models/member'),
    roomModel = require('../models/room'),
    potationModel = require('../models/potation'),
    customerModel = require('../models/customer'),
    orderModel = require('../models/order');

// Open DB connection
mongoose.connect('mongodb://bobolove223:bobolove223@ds051851.mongolab.com:51851/hotel-management');

// Home page => registration form
exports.index = function(req, res){
    res.render('index.jade', { title: 'Dua Leo Hotel', messages: [], errors: [] });
};

// Home page => room form
exports.room = function(req, res){
    console.log( req.xhr);
    var tpl = "<a id=\"{{id}}\" class=\"small-room black\" href=\"javascript:void(0)\" data-toggle=\"modal\" data-target=\".modal-{{id}}\">" +
                    "<div class=\"small-visual\">" +
                        "<i class=\"fa fa-bed\"></i>" +
                    "</div>" +
                    "<div class=\"small-visual-light\">" +
                        "<i id=\"small-light1\" class=\"fa fa-lightbulb-o\"></i>" +
                    "</div>" +

                    "<div class=\"small-roomname\">{{title}}</div>" +
                    "<div id=\"smallCash\" class=\"small-cash\">--- ---</div>" +
                    "<div id=\"smallTime\" class=\"small-time\">--- ---</div>" +
                "</a>";

    roomModel.find({}, function(err, docs){
        if(req.xhr){
            if(err){
                res.end("<p>Có lỗi xảy ra, vui lòng thử lại sau.</p>");
            }
            if(docs.length){
                var html = '';
                for(var i = 0; i < docs.length; i++){
                    var doc = docs[i];
                    html += tpl.replace(/{{id}}/g, doc._id).replace(/{{title}}/g, doc.title);
                }
                res.end(html);
            }
            else{
                res.end("<p>Hiện tại khách sạn chưa có phòng nào</p>");
            }
        }
        else{
            res.render('room.jade', { title: 'Dua Leo Hotel - Room', messages: [], errors: [], rooms: docs });
        }
    });
};

/*// Member list page
exports.list = function(req, res){
    memberModel.find({},function(err, docs){
        res.render('list.jade', { title: 'Dua Leo Hotel - Member list', members: docs });
    });
};*/

/*// Member list quick-and-dirty(tm) CSV export
exports.csv = function(req, res){
    memberModel.find({},function(err, docs){
        members = new Array();
        str = "";
        docs.forEach(function (member) {
            str += member.title;
            str += "; " + member.firstname;
            str += "; " + member.lastname;
            str += "; " + member.mail;
            str += "; " + member.date;
            str += "\n";
        });
        res.header('Content-type', 'text/csv');
        res.send(str);
    });
};
*/
// Member register logic
exports.room_edit = function(req, res){
	roomModel.findOne({ _id: req.params.id }, function(err, doc){
		res.render('room.jade', { title: 'Dua Leo Hotel - Room', messages: [], errors: [], rooms: [], doc: doc });
    });
};

exports.room_update = function(req, res){
	roomModel.findOne({ _id: req.params.id }, function(err, doc){
		if(doc){
			doc.title = req.body.title;
			doc.save(function (err) {
				messages = [];
        		errors = [];
				if (!err){
		            console.log('Success!');
		            messages.push("Update room success !");
		        }
		        else {
		            console.log('Error !');
		            errors.push("At least a mandatory field has not passed validation...");
		            console.log(err);
		        }
        		res.render('room.jade', { title: 'Dua Leo Hotel - Room', messages: messages, errors: errors, rooms: [], doc: doc });
			});
		}
    });
};

// Member register logic
exports.room_post = function(req, res){
	console.log(req);
    room = new roomModel();
    //console.log(req.body);
    room.title = req.body.title;

    //console.log(room);
    room.save(function (err) {
        messages = [];
        errors = [];
        if (!err){
            console.log('Success!');
            messages.push("Create new room success !");
        }
        else {
            console.log('Error !');
            errors.push("At least a mandatory field has not passed validation...");
            console.log(err);
        }
        roomModel.find({}, function(err, docs){
	        res.render('room.jade', { title: 'Dua Leo Hotel - Room', messages: messages, errors: errors, rooms: docs });
	    });
    });
};

exports.room_delete = function(req, res){
	roomModel.findOneAndRemove({ _id: req.params.id }, function(err, doc){
        if (!err){
            console.log('Success!');
            res.end("true");
        }
        else {
            res.end("false");
        }
    });
};

// Home page => room form
exports.potation = function(req, res){
	potationModel.find({}, function(err, docs){
        res.render('potation.jade', { title: 'Dua Leo Hotel - Room', messages: [], errors: [], potations: docs });
    });
};

exports.potation_post = function(req, res){
    potation = new potationModel();
    potation.title = req.body.title;
    potation.price = req.body.price;
    potation.type = req.body.type;

    potation.save(function (err) {
        messages = [];
        errors = [];
        if (!err){
            console.log('Success!');
            messages.push("Create new potation success !");
        }
        else {
            console.log('Error !');
            errors.push("At least a mandatory field has not passed validation...");
            console.log(err);
        }
        potationModel.find({}, function(err, docs){
	        res.render('potation.jade', { title: 'Dua Leo Hotel - Room', messages: messages, errors: errors, potations: docs });
	    });
    });
};

exports.potation_edit = function(req, res){
	potationModel.findOne({ _id: req.params.id }, function(err, doc){
		res.render('potation.jade', { title: 'Dua Leo Hotel - Potation', messages: [], errors: [], potations: [], doc: doc });
    });
};

exports.potation_update = function(req, res){
	potationModel.findOne({ _id: req.params.id }, function(err, doc){
		if(doc){
			doc.title = req.body.title;
		    doc.price = req.body.price;
		    doc.type = req.body.type;
			doc.save(function (err) {
				messages = [];
        		errors = [];
				if (!err){
		            console.log('Success!');
		            messages.push("Update room success !");
		        }
		        else {
		            console.log('Error !');
		            errors.push("At least a mandatory field has not passed validation...");
		            console.log(err);
		        }
        		res.render('potation.jade', { title: 'Dua Leo Hotel - Potation', messages: messages, errors: errors, potations: [], doc: doc });
			});
		}
    });
};

exports.potation_delete = function(req, res){
	potationModel.findOneAndRemove({ _id: req.params.id }, function(err, doc){
        if (!err){
            console.log('Success!');
            res.end("true");
        }
        else {
            res.end("false");
        }
    });
};


exports.order = function(req, res){
    orderModel.find({}, function(err, docs){
    	potationModel.find({}, function (potationError, docs) {
    		potations = [];
    		rooms = [];
    		if(docs.length){
	    		for(var i = 0; i < docs.length; i++){
	    			if(docs[i].type === 1){
	    				potations.push(docs[i]);
	    			}
	    			else{
	    				rooms.push(docs[i]);
	    			}
	    		}
    		}
        	res.render('order.jade', { title: 'Dua Leo Hotel - Room', messages: [], errors: [], potations: potations, rooms: rooms });
    	});
    });
};