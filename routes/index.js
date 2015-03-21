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
exports.room = function(request, response){
    console.log('referer: '+request.headers['referer']);
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
        if(request.headers['referer']){
            response.render('room.jade', { title: 'Dua Leo Hotel - Room', messages: [], errors: [], rooms: docs });
        }
        else{
            var origin = (request.headers.origin || "*");

            // When dealing with CORS (Cross-Origin Resource Sharing)
            // requests, the client should pass-through its origin (the
            // requesting domain). We should either echo that or use *
            // if the origin was not passed.
            var origin = (request.headers.origin || "*");


            // Check to see if this is a security check by the browser to
            // test the availability of the API for the client. If the
            // method is OPTIONS, the browser is check to see to see what
            // HTTP methods (and properties) have been granted to the
            // client.
            if (request.method.toUpperCase() === "OPTIONS"){


                // Echo back the Origin (calling domain) so that the
                // client is granted access to make subsequent requests
                // to the API.
                response.writeHead(
                    "204",
                    "No Content",
                    {
                        "access-control-allow-origin": origin,
                        "access-control-allow-methods": "GET, POST, PUT, DELETE, OPTIONS",
                        "access-control-allow-headers": "content-type, accept",
                        "access-control-max-age": 10, // Seconds.
                        "content-length": 0
                    }
                );

                // End the response - we're not sending back any content.
                return( response.end() );


            }


            // -------------------------------------------------- //
            // -------------------------------------------------- //


            // If we've gotten this far then the incoming request is for
            // our API. For this demo, we'll simply be grabbing the
            // request body and echoing it back to the client.


            // Create a variable to hold our incoming body. It may be
            // sent in chunks, so we'll need to build it up and then
            // use it once the request has been closed.
            var requestBodyBuffer = [];

            // Now, bind do the data chunks of the request. Since we are
            // in an event-loop (JavaScript), we can be confident that
            // none of these events have fired yet (??I think??).
            request.on(
                "data",
                function( chunk ){
                    console.log(chunk);
                    // Build up our buffer. This chunk of data has
                    // already been decoded and turned into a string.
                    requestBodyBuffer.push( chunk );

                }
            );


            // Once all of the request data has been posted to the
            // server, the request triggers an End event. At this point,
            // we'll know that our body buffer is full.
            request.on(
                "end",
                function(){

                    // Flatten our body buffer to get the request content.
                    var requestBody = requestBodyBuffer.join( "" );
                    var responseBody;

                    // Create a response body to echo back the incoming
                    // request.

                    if(err){
                        responseBody = "<p>Có lỗi xảy ra, vui lòng thử lại sau.</p>";
                    }
                    if(docs.length){
                        var html = '';
                        for(var i = 0; i < docs.length; i++){
                            var doc = docs[i];
                            html += tpl.replace(/{{id}}/g, doc._id).replace(/{{title}}/g, doc.title);
                        }
                        responseBody = html;
                    }
                    else{
                         responseBody = "<p>Hiện tại khách sạn chưa có phòng nào</p>";
                    }

                    //console.log(responseBody.length);

                    // Send the headers back. Notice that even though we
                    // had our OPTIONS request at the top, we still need
                    // echo back the ORIGIN in order for the request to
                    // be processed on the client.
                    response.writeHead(
                        "200",
                        "OK",
                        {
                            "access-control-allow-origin": origin,
                            "content-type": "text/html",
                            "content-length": responseBody.length + 2
                        }
                    );

                    // Close out the response.
                    return( response.end( responseBody ) );

                }
            );
        }
    });



    /*roomModel.find({}, function(err, docs){
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
    });*/
};

exports.roomDetail = function(request, response){
    if(!request.headers['referer']){
        // When dealing with CORS (Cross-Origin Resource Sharing)
        // requests, the client should pass-through its origin (the
        // requesting domain). We should either echo that or use *
        // if the origin was not passed.
        var origin = (request.headers.origin || "*");


        // Check to see if this is a security check by the browser to
        // test the availability of the API for the client. If the
        // method is OPTIONS, the browser is check to see to see what
        // HTTP methods (and properties) have been granted to the
        // client.

        if (request.method.toUpperCase() === "OPTIONS"){


            // Echo back the Origin (calling domain) so that the
            // client is granted access to make subsequent requests
            // to the API.
            response.writeHead(
                "204",
                "No Content",
                {
                    "access-control-allow-origin": origin,
                    "access-control-allow-methods": "GET, POST, PUT, DELETE, OPTIONS",
                    "access-control-allow-headers": "content-type, accept",
                    "access-control-max-age": 10, // Seconds.
                    "content-length": 0
                }
            );

            // End the response - we're not sending back any content.
            return( response.end() );


        }


        // -------------------------------------------------- //
        // -------------------------------------------------- //


        // If we've gotten this far then the incoming request is for
        // our API. For this demo, we'll simply be grabbing the
        // request body and echoing it back to the client.


        // Create a variable to hold our incoming body. It may be
        // sent in chunks, so we'll need to build it up and then
        // use it once the request has been closed.
        var requestBodyBuffer = [];

        // Now, bind do the data chunks of the request. Since we are
        // in an event-loop (JavaScript), we can be confident that
        // none of these events have fired yet (??I think??).
        request.on(
            "data",
            function( chunk ){
                // Build up our buffer. This chunk of data has
                // already been decoded and turned into a string.
                requestBodyBuffer.push( chunk );

            }
        );


        // Once all of the request data has been posted to the
        // server, the request triggers an End event. At this point,
        // we'll know that our body buffer is full.
        request.on(
            "end",
            function(){

                // Flatten our body buffer to get the request content.
                var requestBody = requestBodyBuffer.join( "" );
                var responseBody;

                // Create a response body to echo back the incoming
                // request.

                /*if(err){
                    responseBody = "<p>Có lỗi xảy ra, vui lòng thử lại sau.</p>";
                }
                if(docs.length){
                    var html = '';
                    for(var i = 0; i < docs.length; i++){
                        var doc = docs[i];
                        html += tpl.replace(/{{id}}/g, doc._id).replace(/{{title}}/g, doc.title);
                    }
                    responseBody = html;
                }
                else{
                     responseBody = "<p>Hiện tại khách sạn chưa có phòng nào</p>";
                }*/

                responseBody = "<div class=\"modal fade modal-{{id}}\" tabindex=\"-1\" role=\"dialog\" aria-labelledby=\"myLargeModalLabel\" aria-hidden=\"true\">" +
                                    "<div class=\"modal-dialog modal-lg\">" +
                                        "<div class=\"modal-content\">" +
                                            "<p>Hello World</p>" +
                                        "</div>" +
                                    "</div>" +
                                "</div>";

                console.log(responseBody);

                // Send the headers back. Notice that even though we
                // had our OPTIONS request at the top, we still need
                // echo back the ORIGIN in order for the request to
                // be processed on the client.
                response.writeHead(
                    "200",
                    "OK",
                    {
                        "access-control-allow-origin": origin,
                        "content-type": "text/html",
                        "content-length": responseBody.length + 2
                    }
                );

                // Close out the response.
                return( response.end( responseBody ) );

            }
        );
    }

    /*if(req.xhr){
        var html = '<div class="modal fade modal-{{id}}" tabindex="-1" role="dialog" aria-labelledby="myLargeModalLabel" aria-hidden="true">
                        <div class="modal-dialog modal-lg">
                            <div class="modal-content">
                                <div class="recent-post-title widget-body blue black" id="room-{{id}}">
                                    <div class="visual">
                                        <i class="fa fa-bed"></i>
                                    </div>
                                    <div class="visual">
                                        <i class="fa fa-bed"></i>
                                    </div>

                                    <div class="room-no-cont">
                                        <span class="circle">
                                                <a onclick="main()" class="power icon-play" id="icon-play"><i
                                                        class="fa fa-play check-in"></i></a>
                                                <a onclick="abortTimer()" class="power icon-stop" id="icon-stop"><i
                                                        class="fa fa-stop check-out"></i></a>
                                            </span>

                                        <div class="fa room-no">{{title}}</div>
                                    </div>
                                    <div class="control">
                                        <h2>
                                            Giờ vào: <i id="inHour">--- ---</i>
                                            <br>
                                            Giờ ra: <i id="outHour">--- ---</i>
                                        </h2>

                                        <div class="room-type-group">
                                            <input type="checkbox" id="overnight" value="1" />
                                            <label for="overnight">Qua đêm &nbsp</label>
                                            <input type="radio" name="roomType" id="radio1" class="css-checkbox" checked="checked" value="0">
                                            <label for="radio1" class="css-label">Quạt &nbsp</label>
                                            <input type="radio" name="roomType" id="radio2" class="css-checkbox" value="1">
                                            <label for="radio2" class="css-label">Lạnh</label>
                                        </div>
                                    </div>

                                    <div class="food">
                                        <div class="suoi-group">
                                            <div class="suoi-control">
                                                <div class="in-re">
                                                    <a id="up" class="nuoc-btn btn-up" href="#" onclick="updateSpinnerSuoi(this); return false;">+</a>
                                                    <a id="down" class="nuoc-btn btn-down" href="#" onclick="updateSpinnerSuoi(this); return false;">-</a>
                                                </div>
                                                <input class="suoi" id="suoi" value="0" type="text" />
                                            </div>
                                            <span class="suoi-txt">Suối</span>
                                        </div>

                                        <div class="ngot-group">
                                            <div class="suoi-control">
                                                <div class="in-re">
                                                    <a id="up" class="nuoc-btn btn-up" href="#" onclick="updateSpinnerNgot(this); return false;">+</a>
                                                    <a id="down" class="nuoc-btn btn-down" href="#" onclick="updateSpinnerNgot(this); return false;">-</a>
                                                </div>
                                                <input class="suoi" id="ngot" value="0" type="text" />

                                            </div>
                                            <span class="suoi-txt">Nước ngọt</span>
                                        </div>

                                        <div class="mi-group">
                                            <div class="suoi-control">
                                                <div class="in-re">
                                                    <a id="up" class="nuoc-btn btn-up" href="#" onclick="updateSpinnerMi(this); return false;">+</a>
                                                    <a id="down" class="nuoc-btn btn-down" href="#" onclick="updateSpinnerMi(this); return false;">-</a>
                                                </div>
                                                <input class="suoi" id="mi" value="0" type="text" />

                                            </div>
                                            <span class="suoi-txt">0,000</span>
                                        </div>
                                    </div>

                                    <h2 class="cash">Thu:&nbsp<i id="money">--- ---</i> VND</h2>

                                    <div class="info-block">
                                        <p><i id="icon-clock" class="fa fa-clock-o"></i><b id="totalTime">--- ---</b></p>

                                        <p>
                                            <i id="person-name" class="fa fa-user"></i>
                                            <input id="name" class="name" type="text" name="Name" onClick="this.select();" value="Nhập tên và địa chỉ">
                                            </br>
                                            <i id="person-name1" class="fa fa-user"></i>
                                            <input id="name1" class="name" type="text" name="Name1" onClick="this.select();" value="Nhập tên và địa chỉ">
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>'
    }*/
}

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