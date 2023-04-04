const express = require('express')
const router = express.Router()

const fileIO = require('../post/fsPromisesAPIinAsynAwaitIndex.js')
  
router.get('/', function (req, res) {
  res.sendFile('/post/index.html', {root: '.'});
})

router.get('/network.js', function (req, res) {
  res.sendFile('post/network.js', {root: '.'});
})

router.get('/style.css', function (req, res) {
    res.sendFile('post/style.css', {root: '.'});
})

router.post('/send', function(req,res){
  console.log(`Заголовки запроса: ${Object.keys(req)}`);
  console.log(`Тело запроса:`);
  console.log(req.body);
  var text = req.body.text;
  var date = req.body.date;
  console.log(`Post text = ${text}, Post date is ${date}`);
  fileIO.writeBundle(text)
    .then((sendData) => {
      res.send({sendData})
    })
});
  
router.get("/get", (req, res) => {
  fileIO.readBundle(10)
    .then((sendData) => {
      console.log(sendData);
        res.send({sendData})
    })
    
})

module.exports = router

// Вынести запросы к базе данных в отдельный контроллер с геттерами и сеттерами. Пример:

// const usersController = {
//     getAllUsers: function(req, res) {
//       // Здесь можно получить список пользователей из базы данных или другого источника данных
//       const users = ['user1', 'user2', 'user3'];
//       res.send(users);
//     },
//     getUserById: function(req, res) {
//       const userId = req.params.id;
//       // Здесь можно получить информацию о пользователе с заданным идентификатором из базы данных или другого источника данных
//       const user = { id: userId, name: 'John' };
//       res.send(user);
//     }
//   };
  
//   module.exports = usersController;