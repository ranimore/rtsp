//var http = require('http');
//var port = process.env.port || 1337;
var path = require("path");
var express = require('express');
var ejs = require("ejs");
var bodyParser = require('body-parser');
var app = express();

app.use(bodyParser.json());       // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({
     // to support URL-encoded bodies
    extended: true
}));

var mongodb = require('mongodb');
var MongoClient = mongodb.MongoClient;
var ObjectID = mongodb.ObjectId;

//var url = 'mongodb://localhost:27017/RtspService';

var url = 'mongodb://admin:admin@ds023704.mlab.com:23704/rtspservice';


app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use('/js', express.static(__dirname + '/js'));
app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
    next();
});
app.use(express.static(path.join(__dirname, '/images')));
app.get('/images/SAOVDC-HD3300.jpg', function (req, res) {
    res.sendFile(path.join(__dirname, '/images/SAOVDC-HD3300.jpg'));

});
var Recorder = require('rtsp-recorder');

var rec = new Recorder({
    //url: 'rtsp://wowzaec2demo.streamlock.net/vod/mp4:BigBuckBunny_115k.mov?random=2', //url to rtsp stream 
   // timeLimit: 10, //length of one video file (seconds) 
    folder: 'videos/', //path to video folder 
    prefix: 'vid-', //prefix for video files 
    movieWidth: 1280, //width of video 
    movieHeight: 720, //height of video 
    maxDirSize: 1024 * 20, //max size of folder with videos (MB), when size of folder more than limit folder will be cleared 
    maxTryReconnect: 2 //max count for reconnects 
 
});

app.get('/', function (req, res) {
   
    db.collection('camera').find().limit(500).toArray(function (err, result) {
        
        if (err) {
            console.log(err);
        }
        else {
            //console.log(result);
            //console.log(path.join(__dirname + '/Index.html'));
            //res.sendFile(path.join(__dirname + '/Index.html'));
            
            res.render('home', { cameras: result })
        }
    });
    //console.log(path.join(__dirname + '/Index.html'));
    //res.sendFile(path.join(__dirname + '/Index.html'));
  //__dirname : It will resolve to your project folder.
});

//app.get('/clientside.js', function (req, res) {
//    //  console.log(path.join(__dirname + '/Index.html'));
//    res.sendFile(path.join(__dirname + '/clientside.js'));
//  //__dirname : It will resolve to your project folder.
//});




app.post('/Start_recording', function (req, res) {
    //take time interval and set it
    
   
    var videolength = parseInt(req.body.vl);
    
    rec.ss = req.body.sp;
    rec.url = req.body.rtspurl;
    console.log(req.body.sp+" "+ req.body.rtspurl+"   "+ videolength);
    rec.timeLimit = videolength;
    
        //start recording 
    rec.initialize();
   
        //start stream to websocket, port 8001 
    //rec.wsStream(8001); 
});


app.get('/camera', function (req,res) {
    
    db.collection('camera').find().limit(500).toArray(function (err, result) {
        
        if (err) {
            console.log(err);
        }
        else {
            //console.log(result);
            //console.log(path.join(__dirname + '/Index.html'));
            //res.sendFile(path.join(__dirname + '/Index.html'));
            
            res.json(result);
        }
    });

});

app.get('/recording', function (req, res) {
    res.sendFile(path.join(__dirname + '/Index.html'));
}); 



var db;
MongoClient.connect(url, function (err, database) {
    if (err) {
        console.log('Unable to connect to the mongoDB server. Error:', err);
    } else {
        
        console.log('Connection established to', url);
        
        // Get the documents collection
        db = database;
        
        app.listen(1337, function () {
            console.log('listening on 1337');
        });


    }
});



//app.listen(1337);

//http.createServer(function (req, res) {
//    res.writeHead(200, { 'Content-Type': 'text/plain' });
//   // res.end('Hello World\n');
//}).listen(port);