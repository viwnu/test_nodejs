const express = require('express')
const app = express()
const port = 3000

app.get(url, (req, res) => {
  switch(url){
        case "/":
            res.sendfile('index.html');
            res.writeHead(200, {"Content-Type": "text/plain"});
            console.log("Client requested /");
            break;
        case "/node_testjs":
            res.send('Привет ДРУГ!');
            res.writeHead(200, {"Content-Type": "text/plain"});
            console.log("Client requested /node_testjs");
            break;
        default:
            res.sendfile('404.html');
            res.writeHead(404, {"Content-Type": "text/plain"});
            console.log("Client requested page not found - 404 error");
    };
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
