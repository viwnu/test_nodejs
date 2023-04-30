let form = document.querySelector("form")
let input = form.querySelector('input')
let button = form.querySelector('label > button')
let history = document.querySelector('.history')


let post = async (data, url) => {
  try {
    const response = await fetch(url, {
      method: 'POST', // или 'PUT'
      body: JSON.stringify(data), // данные могут быть 'строкой' или {объектом}!
      headers: {
        'Content-Type': 'application/json'
      }
    });

    // Если в response ошибка сервера или он занят попробовать еще разок
    // при этом выставить прогресс бар или просто спиннер
    // выставить максимально количество попыток, после которого выскочит ошибка

    // const res = await response;
    // console.log('Успех:', );

    const json = await response.json();
    console.log('Успех:', json.sendData)
    return (json.sendData)

  } catch (error) {
    console.error('Ошибка:', error);
  }
};

let network = () => {
  if (input.value != "") {
    let content = {
      text: input.value,
      date: new Date()
    };
    // console.log(content);

    post(content, "/post/send")
      .then(post => {
        const list = document.querySelector('.history > ul')
        const lastMessage = document.querySelector('.history > ul > li')
        const listItem = document.createElement('li')
        listItem.setAttribute('strIndex', post[0]?.strIndex)
        listItem.innerHTML = `<div>
                                <p>${post[0]?.dataStr}</p>
                                <button class = "delete_button">&#10006</button>
                              </div>`
                              
        list.insertBefore(listItem, lastMessage)
      })

    input.value = "";

  } else {
    console.log("Empty Input");
  }
}

let handler = (e) => {
  if(e.type == "keypress" && e.key =="Enter") {
    network();
    e.preventDefault();
  } else if(e.target == button && e.type == "click") {
    network();
    e.preventDefault();
  };
};



form.addEventListener("keypress", handler);
form.addEventListener("click", handler);


const get = async (url) => {
  try {
    const response = await fetch(url, {
      method: 'GET', // или 'PUT'
      headers: {
        'Content-Type': 'application/json'
      }
    });
    
    const json = await response.json()
    console.log('Успех:', json.sendData)
    return (json.sendData)
  } catch (error) {
     console.error('Ошибка:', error);
  }
}

get("/post/get").then(posts => {
  const list = document.createElement('ul')
  posts?.forEach(element => {
    const listItem = document.createElement('li')
    listItem.setAttribute('strindex', element.strIndex)
    listItem.innerHTML = `<div>
                            <p>${element.dataStr}</p>
                            <button class = "delete_button">&#10006</button>
                          </div>`
    list.appendChild(listItem)
  })

  history.appendChild(list)
})


let historyItems = history.querySelectorAll('li')
console.log(historyItems);

const deleteNetwork = async (url, strIndex) => {
  try {
    const response = await fetch(url, {
      method: 'DELETE',
      body: JSON.stringify({strIndex}),
      headers: {
        'Content-Type': 'application/json',
      }
      })
    
      const json = await response.json()
      console.log('Успех:', json.sendData)

      return (json.sendData)
  } catch (error) {console.error('in delete network: ' + error);}
}

let DeletePost = (e) => {
  if(e.target.className == 'delete_button' && e.type == "click") {
    const strIndex = e.target.closest('li').getAttribute('strindex')*1
    deleteNetwork('/post/delete', strIndex)
      .then((res) => {
        console.log(res)
        e.target.closest('li').remove()
      })
      .catch(err => console.error('network error: ' + err))
    e.preventDefault()
  }
}

history.addEventListener("click", DeletePost)

