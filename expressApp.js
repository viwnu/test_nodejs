const express = require('express')
const app = express()
const port = 3000
const router = express.Router()

router.get('/', function (req, res) {
  res.sendfile('index.html');
})

router.get('/test_nodejs', function (req, res) {
  res.send('hellow dura4ok');
})

app.use("/", router);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
