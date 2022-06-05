let form = document.querySelector("form");
let input = form.querySelector('input');
let button = form.querySelector('button');

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
  console.log('Успех:', json);

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

    post(content, "/post/send");

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
