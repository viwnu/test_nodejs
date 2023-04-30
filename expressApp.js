const express = require('express')
const bodyParser = require("body-parser")
const app = express()
const port = 3001

const routes = require('./routes/index')

// const messagesRouter = require('./routes/messages')

//Here we are configuring express to use body-parser as middle-ware.
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// add router in express app
app.use("/",routes)





app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})


require('dns').lookup(require('os').hostname(), function (err, add, fam) {
  try {
    // console.log('addr: ' + 'http://' + add);
    console.log(`Server running at http://${add}:${port}/`);
  } catch (er) {
    console.error(err);
  }
})