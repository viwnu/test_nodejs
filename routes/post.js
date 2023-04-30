const express = require('express')
const router = express.Router()

const {readBundle, writeBundle, deleteBundle} = require('../post/fileIOHandler.js')

const InternalFun = () => {
  console.log('in timeout')
}


const myFun = () => {
  console.log('heloo');
  setTimeout(InternalFun, 100)
}

const TimeoutPromise = () => {
  return new Promise((res, rej) => {
    setTimeout(() => {
      console.log('the timeout promise')
      res()
    }, 100)
  })
}

let intervalId = null
router.use((req, res, next) => {
  // при первом запросе на сервер создается intervalId в котором можно вызывать каждые сколько то секунд или минут любую функцию:
  // if(intervalId == null) {
  //   console.log('yeik')
  //   intervalId = setInterval(myFun, 10000)
  // }


  // При каждом запросе делает задержку на основе промиса и таймаута, функция некст передает запрос дальше по коду:
  TimeoutPromise().then(() => {
    next()
  })
})


  
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
  // console.log(`Заголовки запроса: ${Object.keys(req)}`);
  var text = req.body.text;
  var date = req.body.date;
  console.log(`Post text = ${text}, Post date is ${date}`);
  writeBundle(text)
    .then((sendData) => {
      console.log('the response from fileIO: ', sendData)
      res.send({sendData})
    })
});
  
router.get("/get", (req, res) => {
  readBundle(10)
    .then((sendData) => {
        console.log('the response from fileIO: ', sendData)
        res.send({sendData})
    })
    
})

router.delete('/delete', (req, res) => {
  console.log(req.body.strIndex);
  deleteBundle(req.body.strIndex)
    .then((sendData) => {
        console.log('the response from fileIO: ', sendData)
        // добавить, что если undefined то вернуть ответ с какой то типизированной ошибкой сервера
        //  что он занят или типа того
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