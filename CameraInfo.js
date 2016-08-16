//var cassandra = require('cassandra-driver');
var path = require("path");
var express = require('express');
var helpers = require('express-helpers');
var fs = require('fs');
var ejs = require("ejs");
var bodyParser = require('body-parser');


var mongodb = require('mongodb');
var MongoClient = mongodb.MongoClient;
var ObjectID =mongodb.ObjectId;

//var url = 'mongodb://localhost:27017/RtspService';

var url = 'mongodb://admin:admin@ds023704.mlab.com:23704/rtspservice'


//var client = new cassandra.Client({ contactPoints: ['127.0.0.1'], keyspace: 'rtspservice' });
var app = express();
helpers(app);
app.use(bodyParser.json());       // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({
    // to support URL-encoded bodies
    extended: true
}));

app.set('views', path.join(__dirname, 'views') );
app.set('view engine', 'ejs');
app.use(express.static(path.join(__dirname, '/public')));
app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
    next();
});
app.get('/public/Style.css', function (req, res) {
    res.sendFile(path.join(__dirname, '/public/Style.css'));

});
app.get('/public/AddNew.css', function (req, res) {
    res.sendFile(path.join(__dirname, '/public/AddNew.css'));

});
app.get('/', function (req, res) {
    
   
    //client.execute("SELECT * from camera", function (err, result) {
        
    //    if (!err) {
    //        if (result.rows.length > 0) {
                
    //            res.render('index', { cameras: result });
    //           // var user = result.rows[0];
    //           // console.log("name = %s, age = %d", user.firstname, user.age);
    //        } else {
    //            console.log("No results");
    //        }
    //    }
    //});
    db.collection('camera').find().limit(500).toArray(function (err, result) {
       
        if (err) {
            console.log(err);
        }
        else {
            
            
            res.render('index', { cameras: result })
           }    
       });
    });



app.get('/UpdateCamInfo/:id', function (req, res) {
    //res.set('Content-Type', 'text/html');
   
    var camId = req.params.id;
    db.collection('camera').find({"_id": ObjectID(camId) }).toArray(function (err, result) {
        if (err) { console.log(err); }
        else if (result.length) {
         
            res.render('UpdateCamInfo', {
                id: ""+ result[0]._id,
                name: "" + result[0].name,
                remark: "" + result[0].remark,
                isActive: "" + result[0].isActive,
                maxtimeOut: "" + result[0].maxtimeOut,
                maxvideoLength: "" + result[0].maxvideoLength,
                rtsp_url:""+ result[0].rtsp_url
            });
           
        }
        else { console.log("Record not found");}
    
    });
    
    

    //var query = 'select * from camera where id=?';
    
    //client.execute(query, [req.params.id], function (err, result) {
    //    if (err) {
    //        console.log(err);
    //    } else {
    //        //  console.log(result.rows[0].id+""+ result.rows[0].name);
    //        res.render('UpdateCamInfo', {
    //            id: "" + result.rows[0].id,
    //            name: "" + result.rows[0].name,
    //            remark: "" + result.rows[0].remark,
    //            isActive: "" + result.rows[0].isactive,
    //            maxtimeOut: "" + result.rows[0].maxtimeout,
    //            maxvideoLength: "" + result.rows[0].maxvideolength,
    //            rtsp_url: "" + result.rows[0].rtsp_url
    //        });
           
    //    }
    //});

   
});

app.get('/DeleteCamInfo/:id', function (req, res) {
   
    var camId = req.params.id;
    
    //var query = 'delete from camera WHERE id = ?;';
    
    //client.execute(query, [req.params.id], function (err, result) {
    //    if (err) {
    //        console.log('Failed to delete');
    //    } else {
    //        console.log(' deleted');
    //    }
    //});
    

    
   db.collection('camera').remove({ "_id": ObjectID( camId)  }, function (err, result) {
        
        if (err) { console.log(err); }
        else if (result) {
            console.log('Record deleted successfully.');
        }
        else {
            console.log('No document(s) found with defined "find" criteria!');
        }
    });
    res.redirect(req.get('referer'));
   
});


app.get('/AddNewCam', function (req, res) {
    //console.log(path.join(__dirname + '/AddNewCam.html'));
    //res.sendFile(path.join(__dirname + '/AddNewCam.html'));
    res.render('AddNewCam', {});
 
});


app.get('/camInfo.js', function (req, res) {
   
    res.sendFile(path.join(__dirname + '/camInfo.js'));
 
});

app.post('/AddNewCam', function (req, res) {
    db.collection('camera').save(req.body, function (err, result) {
        if (err) return console.log(err);
        else {
            console.log('saved to database');
            res.send("sucess");
        }
    });
   
//    var query = 'insert into camera (id,isactive,maxtimeout,maxvideolength,remark,name,rtsp_url) ' 
//+ 'VALUES(?, ?, ?, ?, ?, ?,?);';
    
    
//    var id = cassandra.types.uuid();
//    var mx = parseInt(req.body.maxtimeOut);
//    var vl = parseInt(req.body.maxvideoLength);
//    if (req.body.isActive == 'false')
//        var isactive = false;
//    else
//        var isactive = true;
    
//    client.execute(query, [id , isactive, mx, vl, req.body.remark , req.body.name, req.body.rtsp_url], { prepare : true }, function (err, result) {
//        if (!err) {
//            console.log("Inserted successfully");
//            res.send("success");
//        }
//        else {
//            console.log(err);
//        }
//    });

   
});

app.post('/UpdateCamInfo/:id', function (req, res) {
   
    var camId = req.params.id;

    //var mx = parseInt(req.body.maxtimeOut);
    //var vl = parseInt(req.body.maxvideoLength);
    //if (req.body.isActive == 'false')
    //    var isactive = false;
    //else
    //    var isactive = true;
    //var query = 'UPDATE camera SET name = ?,remark=?,isactive=?,maxtimeout=?,maxvideolength=?,rtsp_url=? WHERE id = ?';
    //var params = [req.body.name, req.body.remark, isactive, mx, vl, req.body.rtsp_url, req.params.id];
    
    
    //client.execute(query, params, { prepare : true }, function (err, result) {
    //    if (err) {
    //        console.log('Failed to update');
    //    } else {
    //        console.log(' Updated');
    //        res.send("success");
    //    }
    //});

   
    db.collection('camera').update({ "_id": ObjectID(camId) }, { $set: { name: req.body.name, remark: req.body.remark, isActive: req.body.isActive, maxtimeOut: req.body.maxtimeOut, maxvideoLength: req.body.maxvideoLength, rtsp_url: req.body.rtsp_url } }, function (err, numUpdated) {
        if (err) {
            console.log(err);
        } else if (numUpdated) {
            console.log('Updated Successfully %d document(s).', numUpdated);
            res.send("sucessfull");
        } else {
            console.log('No document found with defined "find" criteria!');
        }
   
    });
   
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



