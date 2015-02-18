var express = require('express');
var app = express();
var compression = require('compression');

var fs = require('fs');

var page_hit;



// Start server and enabling comression and cache
var cacheTime = 86400000;

app.use(compression());

app.use(express.static(__dirname + '/', { maxAge : cacheTime }));

/*app.get('/', function(req, res){
	++page_hit;
	fs.writeFile(__dirname+'/page_visit', page_hit);
});

app.get('/visit', function(req, res){	
	res.json(page_hit);
});*/

/*app.get('/workshop/softdev', function(req, res){
	res.writeHead(301, {
		Location: 'https://dracowane.typeform.com/to/hqT7WJ'
	});
	res.end();
});*/

app.get('/techexpo', function(req, res){
	res.writeHead(301, {
		Location: 'https://dracowane.typeform.com/to/dQPVqa'
	});
	res.end();
});
app.get('/doraemon', function(req, res){
	res.writeHead(301, {
		Location: 'http://techspardha.org:4082/old_doraemon.html'
	});
	res.end();
});
app.post('/addmyevent', function(req, res){
	var event_obj = req.body;
});

app.listen(80, function(){
	console.log('Listening on 80');
/*	fs.readFile(__dirname+'/page_visit', {encoding: 'utf-8'}, function(err, data){
		if(err){
			page_hit = 0;
		}else{
			page_hit = parseInt(data,10);
		}
	});
*/
});
