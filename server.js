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
	host : "localhost",
	user : "root",
	password: "tech@2015",
	//database: "techspardha",
});
conn.connect(function(err){
	if(!err){
		conn.query("use techspardha");
	}
});
app.get('/home',function(req,res){
	res.sendfile('homepage.html');
});
app.get('/events',function(req,res){
	res.sendfile('events.html');
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
				var query2 = 'select id FROM users WHERE username = "' + rows['0'].username + '"';
				conn.query(query2, function(err, rows2){
					res.json(rows2);
				});
			}
			else{
				res.send('wrong');
			}
		}
	});
});
app.post('/editevent',function(req,res){
	var json_obj = req.body;
	var query = 'select events.event_name as event_name, events.description as description, events.url as url, category_master.category_name as category_name from events,category_master where events.event_id  = "' + json_obj['event_id'] +'" and events.category_key = category_master.category_key ';
	conn.query(query,function(err,rows){
		if(!err){
			res.json(rows);
		}
	});
});	
app.post('/posteditevent',function(req,res){
	var json_obj = req.body;
	var query = 'select * from category_master where category_name = "'+json_obj['category_name']+'"';
	conn.query(query,function(err,rows){
		if(!err)
		{
			var event_name = addslashes(json_obj['event_name']);
			var description = addslashes(json_obj['description']);
			var url = addslashes(json_obj['url']);
			var category_key = addslashes(json_obj['category_key']);
			var query2 = "update events set event_name='"+event_name+"',description='"+description+"',url='"+url+"',category_key='"+rows['0'].category_key+"' where event_id='"+json_obj['event_id']+"'";
			console.log(query2);
			conn.query(query2,function(err2,rows2){
				if(!err2){
					res.send("done");
				}
				else{
					res.send("notdone");
				}
			});
		}
	});
});
function addslashes(string) {

    return (string + '').replace(/\\/g, '\\\\').
        replace(/\u0008/g, '\\b').
        replace(/\t/g, '\\t').
        replace(/\n/g, '\\n').
        replace(/\f/g, '\\f').
        replace(/\r/g, '\\r').
        replace(/'/g, '\\\'').
        replace(/"/g, '\\"');
}
app.post('/addevent',function(req,res){
	var json_obj =req.body;
	var query = 'select * from category_master where category_name = "'+json_obj['category_name']+'"';
	conn.query(query,function(err,rows){
		if(!err)
		{
			var event_name = addslashes(json_obj['event_name']);
			var description = addslashes(json_obj['description']);
			var url = addslashes(json_obj['url']);
			var query2 = 'INSERT INTO events (event_name,description,url,category_key,user_id) VALUES("'+event_name+'","'+description+'","'+url+'","'+rows['0'].category_key+'","'+json_obj['user_id']+'")';	
			conn.query(query2,function(err2,rows2){
				if(!err2){
					res.send("done");
				}
				else{
					res.send("notdone");
				}
			});
		}
	});
});

app.post('/events',function(req,res){
	var json_obj = req.body;
	var query = 'select event_id, event_name FROM events WHERE user_id = "' +json_obj['id']+'"';
	conn.query(query,function(err,rows){
		if(!err)
		{
			res.json(rows);
		}
	});

});
app.post('/delete',function(req, res){
	var	json_obj = req.body;
	var query = 'DELETE FROM events WHERE event_id = '+json_obj['event_id'];
	conn.query(query,function(err,row){
		if(!err){
			res.json("done");
		}
		else{
			res.json("notdone");
		}
	})
});
app.post('/category_event',function(req,res){
	var json_obj = req.body;
	var query = 'select event_id,event_name from events where category_key = "'+json_obj['category_id']+'"';
	conn.query(query,function(err,rows){
		if(!err)
		{
			console.log(rows);
			res.json(rows);
		}
		else
		{
			res.json(err);
		}
		
	});
});
app.post('/select_event',function(req,res){
	var json_obj = res.body;
	var query = 'select * from events where event_id = "1"';
	conn.query(query,function(err,rows){
		if(!err)
		{
			res.json(rows);
		}
		else
		{
			res.json(err);
		}
	});
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
