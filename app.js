var express = require('express');
var bodyparser = require('body-parser');
var mongoose = require('mongoose');
var path = require('path');
var cors = require('cors');
var request = require('request');
var multer = require('multer');
var gridfsStorage = require('multer-gridfs-storage');
var grid = require('gridfs-stream');
var methodOverride = require('method-override');
var io = require('socket.io').listen(7000).sockets;

var app = express();

const port = 3000;

const route = require('./route/route');

const dbURL = 'mongodb://127.0.0.1:27017/MusicStore';

let soc = null;

let gfs;

const conn = mongoose.createConnection(dbURL);

conn.once('open',function(){
	gfs = grid(conn.db,mongoose.mongo);
	gfs.collection('music');
});

const storage = new gridfsStorage({
  url: dbURL,
  file: (req, file) => {
    if (file.mimetype === 'audio/x-m4a' || file.mimetype === 'audio/mp3' 
		|| file.mimetype === 'audio/wav' || file.mimetype === 'audio/m4a') {
      return {
		filename:file.originalname,
        bucketName: 'music',
		price:req.params.price,
		genre:req.params.genre,//array{main{name},other[]}
		artist:req.params.artist//array{main{name},subgenre[]}
      };
    } else {
      return null;
    }
  }
});
const musicUpload = multer({ storage }); 

app.use(bodyparser.json());

app.use(cors());

app.use(methodOverride('_method'));

app.use('/api',route);

app.get('/',(req,res)=>{
    res.send("hello world");
});

//@desc uploads music to server
//@POST /api/music
app.post('/api/music',musicUpload.single('file'),(req,res)=>{
	console.log(req);
	res.json(req.file);
});

//@DESC retrieve music by filename
//@GET /api/music/:id
app.get('/api/music/:filename',(req,res)=>{
	gfs.files.findOne({filename:req.params.filename},(err,file)=>{
		if(err || !file || file.length===0)
			return res.status(404).json({error:'file not found'});
		
		if(file.contentType === 'audio/x-m4a' || file.contentType === 'audio/mp3' 
			|| file.contentType === 'audio/wav' || file.contentType === 'audio/m4a'){
				const readStream = gfs.createReadStream(file.filename);
				readStream.pipe(res)
		}else{
			return res.status(404).json({error:'Unsupported format'});
		}
	});
});


app.listen(port,()=>{
    console.log('server started using port: '+port);
});



