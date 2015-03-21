/*!
* Demo registration application
* Copyright(c) 2011 Jean-Tiare LE BIGOT <admin@jtlebi.fr>
* MIT Licensed
*/


/**
 * Module dependencies.
 */

var express = require('express'),
    routes = require('./routes'),
    cors = require('cors');

var app = module.exports = express.createServer(
	/*function( request, response ){


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

	            // Create a response body to echo back the incoming
	            // request.
	            var responseBody = (
	                "Thank You For The Cross-Domain AJAX Request:\n\n" +
	                "Method: " + request.method + "\n\n" +
	                requestBody
	            );

	            // Send the headers back. Notice that even though we
	            // had our OPTIONS request at the top, we still need
	            // echo back the ORIGIN in order for the request to
	            // be processed on the client.
	            response.writeHead(
	                "200",
	                "OK",
	                {
	                    "access-control-allow-origin": origin,
	                    "content-type": "text/plain",
	                    "content-length": responseBody.length
	                }
	            );

	            // Close out the response.
	            return( response.end( responseBody ) );

	        }
	    );
	}*/
);

// Configuration

app.configure(function(){
    app.set('views', __dirname + '/views');
    app.set('view engine', 'jade');
    app.use(express.bodyParser());
    app.use(express.methodOverride());
    app.use(app.router);
    app.use(express.static(__dirname + '/public'));

});

//app.use(cors({credentials: true}));

app.configure('development', function(){
    app.use(express.errorHandler({ dumpExceptions: true, showStack: true }));
});

app.configure('production', function(){
    app.use(express.errorHandler());
});

// Routes
// index page
app.get('/', routes.index);
app.post('/', routes.index_post);

// room page
app.get('/room', routes.room);
app.get('/roomDetail', routes.roomDetail);
app.post('/room', routes.room_post);
app.get('/room/:id/edit', routes.room_edit);
app.post('/room/:id/edit', routes.room_update);
app.delete('/room/:id', routes.room_delete);

/*app.get('/customer', routes.customer);
app.post('/customer', routes.customer_post);
app.get('/customer/:id/edit', routes.customer_edit);
app.post('/customer/:id/edit', routes.customer_update);
app.delete('/customer/:id', routes.customer_delete);*/

app.get('/potation', routes.potation);
app.post('/potation', routes.potation_post);
app.get('/potation/:id/edit', routes.potation_edit);
app.post('/potation/:id/edit', routes.potation_update);
app.delete('/potation/:id', routes.potation_delete);

app.get('/order', routes.order);
app.post('/order', routes.order_post);
app.get('/order/:id/edit', routes.order_edit);
app.post('/order/:id/edit', routes.order_update);
app.delete('/order/:id', routes.order_delete);

app.get('/list', routes.list);
app.get('/csv', routes.csv);

// Open App socket
var port = process.env.PORT || 8080;
app.listen(port);

console.log("Express server listening on port %d in %s mode", app.address().port, app.settings.env);
