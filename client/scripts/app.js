// eslint-disable-next-line
const app = {
  server: 'http://52.78.206.149:3000/messages',
  init: function () {
    let roomArr = [];
    app.fetch().then((res) => {
      for (let i = 0; i < res.length; i++) {
        app.renderMessage(res[i]);
        if (!roomArr.includes(res[i].roomname)) {
          roomArr.push(res[i].roomname);
        }
      }
      for (let i = 0; i < roomArr.length; i++) {
        let optionTag = document.createElement('option');
        optionTag.textContent = roomArr[i];
        optionTag.value = roomArr[i];
        let roomSelector = document.querySelector('#roomselector');
        roomSelector.appendChild(optionTag);
      }
      console.log(roomArr);
    });
  },
  fetch: function () {
    return fetch(app.server)
      .then((res) => res.json())
      .then((res) => {
        return res;
      });
  },
  send: function (message) {
    window
      .fetch(app.server, {
        method: 'POST',
        body: JSON.stringify(message),
        headers: {
          'Content-Type': 'application/json',
        },
      })
      .then((response) => {
        return response.json();
      })
      .then((json) => {
        console.log(json);
        return json;
      });
  },
  clearMessages: function () {
    document.querySelector('#chats').innerHTML = '';
  },
  renderMessage: function (message) {
    let newElement = document.createElement('div');
    let newUsername = document.createElement('div');
    let newText = document.createElement('div');
    newElement.className = 'chat';
    newUsername.className = 'username';
    newText.className = 'userText';
    newUsername.textContent = message.username + ':';
    newText.textContent = message.text;
    newElement.appendChild(newUsername);
    newElement.appendChild(newText);
    document.querySelector('#chats').prepend(newElement);
  },
};

let summitButton = document.querySelector('#summitButton');
summitButton.addEventListener('click', function () {
  let textarea = document.querySelector('#userInput');
  console.log(textarea);
  console.log(textarea.value);
  const message = {
    username: '김코딩',
    text: textarea.value,
    roomname: '로비',
  };
  app.renderMessage(message);
  app.send(message);
  app.fetch();
});

let roomSelector = document.querySelector('#roomselector');
roomSelector.addEventListener('change', (event) => {
  console.log(event);
  app.clearMessages();
});

app.init();
