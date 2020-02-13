var express = require('express');

var bodyParser = require('body-parser');
var app = express();
var fs = require('fs');
var fileUpload = require('express-fileupload');
const path = require('path');
app.use(bodyParser.urlencoded({ extended : false }));
app.use(fileUpload());
app.use(express.static('uploaded'));
app.use('/assets', express.static('assets'));
let caches = {};

const uploadDirectory = __dirname  + path.sep + '/uploaded';

app.get('/', function(req,res){
    res.sendFile(__dirname + '/index.html');
});

function writeFile(file,data){
    
    return new Promise((resolve,reject)=>{   
        fs.writeFile(uploadDirectory + path.sep + file, data, (err)=>{

            if(err){
                return reject(err)
            }else {
                resolve(file)
                
            }
        })
        console.log("cahce in writeFile"+caches);
    }).then(readFile);
}

function readFile(file){
    return new Promise ((resolve, reject)=>{
        fs.readFile(uploadDirectory + path.sep + file, (err, data)=>{
            if(err){
                return reject(err);
            } else {
                resolve(data);
            }
        });
    });
}

app.post('/uploaded', (req,res)=>{
   console.log(req.files);
   
   if(req.files.upload instanceof Array){
       for(var i = 0; i < req.files.upload.length; i++){
        let file = req.files.upload[i].name;
        let data = req.files.upload[i].data;
       
        
        caches[file] = writeFile(file, data)
        console.log("caches in index.js === "+caches[file]);

        caches[file]
        .then(()=> {
            console.log("you have submiited a file");
            res.send("you have succesfully uploaded a file, download your file at url: localhost:8080/uploaded/:file-name'))")
          }).catch((e)=> console.log(e))
       }
       
   } else{
    let file = req.files.upload.name;
    let data = req.files.upload.data;
    
    console.log("cahces[file]===============>>>");
        
    console.log(caches[file]);
    caches[file] = writeFile(file, data);
    console.log(caches[file]);
    caches[file]
    .then(()=> {
        console.log("you have submiited a file");
        res.send(`you have ${file} succesfully uploaded a file, download your file at url: localhost:8080/uploaded/:file-name`)
      }).catch((e)=> console.log(e))
      
      //res.status(500).send(e.message));
   }
    
    // res.send("you have uploaded the file")

});

app.get('/uploaded/:name', (req,res)=>{
   caches[req.params.name] = readFile(req.params.name)
    caches[req.params.name]
   .then( (data)=>{
       console.log("you are in the download page");
       res.send(data);
   })
});
app.listen(8080);