module.exports.findBitmaps = findBitmaps;
var googlemaps = require('googlemaps');

function findBitmaps(xCoord, yCoord, zoomlevel, squareSize, callback){

  var data = "BITMAP DATA";
  var foundBitmaps = [{bitmapData:data}, {bitmapData:"Second bitmap thingy"}];

  callback(foundBitmaps, null);

};
