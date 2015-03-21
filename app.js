/*!
* Demo registration application
* Copyright(c) 2011 Jean-Tiare LE BIGOT <admin@jtlebi.fr>
* MIT Licensed
*/


/**
 * Module dependencies.
 */

var express = require('express'),
    routes = require('./routes');

var app = module.exports = express.createServer();

// Configuration

app.configure(function(){
    app.set('views', __dirname + '/views');
    app.set('view engine', 'jade');
    app.use(express.bodyParser());
    app.use(express.methodOverride());
    app.use(app.router);
    app.use(express.static(__dirname + '/public'));

});

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
