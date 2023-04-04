const express = require('express')
const router = express.Router()

const post = require('./post')

router.use('/post', post)

router.get('/', function (req, res) {
    res.sendFile('../index.html', {root: '.'});
})
  
router.get('/test_nodejs', function (req, res) {
  res.send('hellow dura4ok');
})
  
router.get('/style.css', function (req, res) {
  res.sendFile('style.css', {root: '.'});
})
  
router.get(/.*mp4/, function (req, res) {
  res.type('video');
  res.sendFile('extreme-angry-bunny-angry-bunny.mp4', {root: '.'});
})
  
module.exports = router