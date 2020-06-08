var express = require('express');
const app = express();
const cv = require('opencv4nodejs');
const server = require('http').createServer(app);
 const io = require('socket.io').listen(server);
server.listen(8080, "10.252.10.35");
var router = express.Router();

const wCap = new cv.VideoCapture(0);
wCap.set(cv.CAP_PROP_FRAME_WIDTH, 720);
wCap.set(cv.CAP_PROP_FRAME_HEIGHT, 1280);
/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});
let frameRate = 24;
setInterval(() => {
  const frame = wCap.read();
  const image = cv.imencode('.jpg', frame).toString('base64');

  io.emit('image', image);

}, 1000/frameRate);

module.exports = router;
