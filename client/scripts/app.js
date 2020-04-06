// eslint-disable-next-line
const app = {
  server: "http://52.78.206.149:3000/messages",
  init: function() {
    return
  },
  fetch: function () {
    fetch(app.server).then(res => res.json())
    .then(res => {
      return res;
    })
  },
  send: function(message) {
    window.fetch(app.server, {
      method: 'POST',
      body: JSON.stringify(message),
      headers: {
        "Content-Type": "application/json",
      }
    }).then(response => {
      return response.json();
    }).then(json => {
      return json;
    });
  },
  clearMessages: function() {
    document.querySelector("#chats").innerHTML = "";
  },
  renderMessage: function(message) {
    let newElement = document.createElement('div');
    let newUsername = document.createElement('div');
    let newText = document.createElement('div');
    newUsername.className = 'userID';
    newText.className = 'userText';
    newUsername.textContent = message.username + ':';
    newText.textContent = message.text;
    newElement.appendChild(newUsername);
    newElement.appendChild(newText);
    document.querySelector("#chats").appendChild(newElement);
  }
};



