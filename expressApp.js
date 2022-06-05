const express = require('express')
const bodyParser = require("body-parser")
const app = express()
const port = 3000
const router = express.Router()

// add router in express app
app.use("/",router);

//Here we are configuring express to use body-parser as middle-ware.
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

router.get('/', function (req, res) {
  res.sendfile('index.html');
})

router.get('/post', function (req, res) {
  res.sendfile('post/index.html');
})

router.get('/test_nodejs', function (req, res) {
  res.send('hellow dura4ok');
})

router.get('/post/network.js', function (req, res) {
  res.sendfile('post/network.js');
})

router.get('/style.css', function (req, res) {
  res.sendfile('style.css');
})

router.get('/post/style.css', function (req, res) {
  res.sendfile('post/style.css');
})

router.get(/.*mp4/, function (req, res) {
  res.type('video');
  res.sendfile('extreme-angry-bunny-angry-bunny.mp4');
})

app.post('/post/send', function(req,res){
console.log(`Заголовки запроса: ${Object.keys(req)}`);
console.log(`Тело запроса: ${req.body}`);
var text = req.body.text;
var date = req.body.date;
console.log(`Post text = ${text}, Post date is ${date}`);
res.send(
  {
    text: text,
    date: date
  }
);
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
