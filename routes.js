var mapFinder = require("./findMap");
var exec = require('child_process').exec;

//move these things to somewhere else
var fs = require('fs');
var uuid = require('node-uuid');

module.exports.SetRoutes = function(app){

  app.get('/', function(req, res) {
    renderHome(req,res);
  });

  app.get('/findShapes', function(req, res) {
    findShapes(req,res);
  });
}

function renderHome(req, res){
  res.send('fuckyou');
}

function findShapes(req, res){
  var xCoord = req.query.XCoord;
  var yCoord = req.query.YCoord;

  var zoomLevel = 15;
  var squareSize = 5;

  var bitmaps = mapFinder.findBitmaps(xCoord, yCoord, zoomLevel, squareSize, function(bitmaps, err){
    processBitmaps(bitmaps, function(shapeCoords, err){
      res.send(shapeCoords);
    })
  });
  //res.send("I didnt ask for " + xCoord + " or " + yCoord);
}

function processBitmaps(bitmaps, callback){
  processBitmap(bitmaps, [], 0,callback);
}

function processBitmap(bitmaps, coords, index, callback){
  if(bitmaps.length <= index){
    callback(coords, null);
    return;
  }
  console.log("index: " + index);
  var bitmap = bitmaps[index];
  var filename = "C:\\tmp\\" + uuid.v4() + ".bmp";
  fs.writeFile(filename, bitmap.bitmapData, function(err) {
    if(err) {
        return console.log(err);
      }
      console.log("The file was saved!");
      child = exec('python processBitmap.py ' + filename,
        function (error, stdout, stderr) {
          console.log('stdout: ' + stdout);
          if (error !== null) {
            console.log('exec error: ' + error);
          }
          coords.push(stdout);
          processBitmap(bitmaps, coords, ++index, callback);
      });
  });
}
