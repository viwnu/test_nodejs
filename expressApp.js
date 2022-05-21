const express = require('express')
const app = express()
const port = 3000


app.use(function(req, res){
    routes = {
      '/': 'index.html'
    };

    let url = req.url;

    if (routes[url] !== undefined) {
        res.writeHead(200, {"Content-Type": "text/plain"});
        res.sendfile(route[url]);
        console.log("Client requested", url);
    } else {
        res.writeHead(200, {"Content-Type": "text/plain"});
        res.send('Привет ДРУГ!');
        console.log("Client requested", url);
        // console.log("Client requested page not found - 404 error");
    }
});


// app.get(url, (req, res) => {
//
//   switch(url){
//         case "/":
//             res.sendfile('index.html');
//             res.writeHead(200, {"Content-Type": "text/plain"});
//             console.log("Client requested /");
//             break;
//         case "/node_testjs":
//             res.send('Привет ДРУГ!profile.html');
//             res.writeHead(200, {"Content-Type": "text/plain"});
//             console.log("Client requested /node_testjs");
//             break;
//         default:
//             res.sendfile('404.html');
//             res.writeHead(404, {"Content-Type": "text/plain"});
//             console.log("Client requested page not found - 404 error");
//     };
// })

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
