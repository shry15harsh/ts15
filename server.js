var express = require('express');
var app = express();
var compression = require('compression');

var fs = require('fs');
var bodyParser = require('body-parser');
var page_hit;



// Start server and enabling comression and cache
var cacheTime = 86400000;

app.use(compression());

app.use(express.static(__dirname + '/', { maxAge : cacheTime }));

app.use(bodyParser.urlencoded());

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

var mysql =  require('mysql');
conn =  mysql.createConnection({
	host : "127.0.0.1",
	user : "root",
	password: "tech@2015"
});
conn.connect(function(err){
	if(!err){
		conn.query("use techspardha");
	}
});

/*
	Event Dashboard
*/
app.post('/login', function(req, res){
	var json_obj = req.body;
	var query = 'select * from users where username = "' + json_obj['username'] + '"and password = "' + json_obj['password'] +'"';
	conn.query(query, function(err, rows){
		if(!err){
			if(rows.length == 1){
				var query2 = 'select s_no, event_name FROM events WHERE user_id = "' +rows['0']['id']+'"';
				conn.query(query2, function(err, rows2){
					res.json(rows2);
				});
			}
			else{
				res.send('0');
			}
		}
	});
	console.log(req.body);
	res.send('hey');	
});

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
