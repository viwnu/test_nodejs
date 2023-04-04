let form = document.querySelector("form");
let input = form.querySelector('input');
let button = form.querySelector('button');
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

    // const res = await response;
    // console.log('Успех:', );

    const json = await response.json();
    return (Object.values(json.sendData))

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
        listItem.innerHTML = `<p>${post[0].string}</p>`
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
    event.preventDefault();
  } else if(e.target == button && e.type == "click") {
    network();
    event.preventDefault();
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
    console.log('Успех:', typeof Object.values(json.sendData))
    return (Object.values(json.sendData))
  } catch (error) {
     console.error('Ошибка:', error);
  }
}

get("/post/get").then(posts => {
  console.log(posts);

  const list = document.createElement('ul')

  posts.forEach(element => {
    console.log(element);
    const listItem = document.createElement('li')
    listItem.innerHTML = `<p>${element.string}</p>`
    list.appendChild(listItem)
  })

  history.appendChild(list)
})

