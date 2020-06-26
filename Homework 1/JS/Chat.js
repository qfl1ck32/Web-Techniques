function changeToResponsive() {
  var navbarClass = document.getElementById("navbar");
  if (navbarClass.className === "navigation_bar") {
    navbarClass.className += " responsive";
  }
  else {
    navbarClass.className = "navigation_bar";
  }
}

/// ngrok http 8080
const socket = io('localhost:8080');

const messageContainer = document.getElementById('message-container');
const messageForm = document.getElementById('send-container');
const messageInput = document.getElementById('message-input');
const nume = document.getElementById('nume');
const id = document.getElementById('id')
const culoare = document.getElementById('culoare');
const data = document.getElementById('data');
const selectorCuloare = document.getElementById('selectColor');
const emojis = document.getElementById('emojis');
const onlineUsers = document.getElementById('onlineUsers');
const currentlyTypingContainer = document.getElementById('currWr');
const avatar = document.getElementById('avatar');

var currentlyTypingElements = {}

var q = Promise.resolve();

function queue(func) {
  q = q.then(func);
  return q;
}

function popUp(message) {
  return new Promise((res) => {
    console.log('Pentru: ' + message)
    const popup = document.getElementById('newOnline');
    popup.className += ' fadeMessage';
    const paragraph = popup.querySelector('p');
    paragraph.innerText = message;
    var v, v2;
    
    v = setInterval(() => {
      popup.className = "article newjoin";
      clearInterval(v);
    }, 1500);

    v2 = setInterval(() => {
      clearInterval(v2);
      res();
    }, 1700);

    });
}

scroll();

Date.prototype.today = function() {
  return ((this.getDate() < 10) ? '0' : '') + this.getDate() + '/' + ((this.getMonth() + 1) < 10 ? '0' : '') + (this.getMonth() + 1) + '/' + this.getFullYear();
}

Date.prototype.timeNow= function() {
  return ((this.getHours() < 10) ? '0' : '') + this.getHours() + ':' + ((this.getMinutes() < 10) ? '0' : '') + this.getMinutes() + ':' + ((this.getSeconds() < 10) ? '0' : '') + this.getSeconds();
}

function getCurrentDate() {
  const date = new Date();
  data.value = date.today() + ' | ' + date.timeNow();
}

getCurrentDate();
socket.emit('user-entered', id.value, data.value, avatar.value);

socket.on('setOffline', (id, name) => {
  const users = onlineUsers.getElementsByClassName('utilizator ' + id)[0];
  try {
    onlineUsers.removeChild(users);
  }
  catch (error) {
      /// user already logged out
  }
  queue(popUp.bind(null, name + ' s-a deconectat.'));
  ///popUp(name + ' s-a deconectat.');
})

socket.on('chat-message', (currentDate, data, color, name, id, avatar) => {
  appendMessage(currentDate, data, color, name, id, avatar);
})

socket.on('add-user-online', (name, id, avatar) => {
  AddOnline(name , id, avatar);
  queue(popUp.bind(null, name + ' s-a conectat!'));
  ///popUp(name + ' s-a conectat!');
})

socket.on('modifyUserColor', (culoare, id) => {
  var messages = messageContainer.getElementsByClassName(id);
  for (let i = 0; i < messages.length; ++i) {
    let currentMessage = messages[i];
    let paragraphs = currentMessage.querySelectorAll('p');

    paragraphs.forEach(paragraph => {
      paragraph.style.color = culoare;
    })
  }
})

messageForm.addEventListener('submit', e => {
  e.preventDefault();
  const message = messageInput.value;
  socket.emit('send-chat-message', message, nume.value, culoare.value, data.value, id.value, avatar.value);
  messageInput.value = '';
})

function scroll () {
  messageContainer.scrollTop = messageContainer.scrollHeight;
}

function appendMessage(data, message, culoare, nume, id, avatar) {

  socket.emit('userStoppedWriting', id);
  clearTimeout(func);
  currentlyTyping = 0;

  const messageElement = document.createElement('div');
  const dataElement = document.createElement('div');
  const dataParagraph = document.createElement('p');
  const userImage = document.createElement('img');
  const messageText = document.createElement('p');

  dataElement.className = "data";
  dataParagraph.style.float = "left";
  dataParagraph.style.color = culoare;
  dataParagraph.innerText = '(' + data + ')';
  dataElement.append(dataParagraph);

  messageElement.className = id;
  messageText.style.color = culoare;
  messageText.innerText = message;
  
  userImage.setAttribute('src', './Images/' + avatar + '.png');

  messageElement.append(userImage);
  messageElement.append(dataElement);
  messageElement.append(messageText);
  messageContainer.insertBefore(messageElement, messageContainer.childNodes[messageContainer.childNodes.length - 2]);
  ///messageContainer.append(messageElement);
  scroll();
}

function AddOnline(nume, id, avatar) {
  const users = onlineUsers.getElementsByClassName('utilizator ' + id);
  if (users.length > 0) {
    return;
  }
  const newPerson = document.createElement('div');
  const newImage = document.createElement('img');
  const newName = document.createElement('p');

  newPerson.className = 'utilizator ' + id;
  newImage.className = 'onlineImage';

  newImage.setAttribute('src', './Images/' + avatar + '.png');
  newName.innerText = nume;

  newPerson.append(newImage);
  newPerson.append(newName);

  onlineUsers.append(newPerson);
}

function debug() {
  alert(onlineUsers.innerHTML);
}

selectorCuloare.addEventListener("change", sendModifications);

function sendModifications() {
  socket.emit('modifiedColor', selectorCuloare.value, id.value);
  culoare.value = selectorCuloare.value;
}

function showEmojis() {
  if (emojis.style.display != 'inline-block') {
    emojis.style.display = 'inline-block';
    emojis.style.animation = "Fade 0.3s";
  }
  else {
    emojis.style.animation = "FadeOut 0.3s";
    setTimeout(() => {
      emojis.style.display = "none";
    }, 300);
  }
}

function insertEmoji(i) {
  messageInput.value += String.fromCodePoint(i);
}

var currentlyTyping = 0;
var func;

messageInput.onkeydown = function() {
  if (currentlyTyping == 0) {
    currentlyTyping = 1;
    getCurrentDate();
    socket.emit('userWriting', nume.value, data, id.value, culoare.value);

    var previous = messageInput.value;

    func = setInterval( () => {
      scroll();
      if (previous == messageInput.value) {
        currentlyTyping = 0;
        clearInterval(func);
        socket.emit('userStoppedWriting', id.value);
      }
      else {
        previous = messageInput.value;
      }
    }, 500)
  }
}


socket.on('currentlyWriting', (data, nume, culoare, id) => {
  ///alert(id + ' scrie.');
  currentlyTypingElements[id] = nume;
  socket.emit('updateTyping');
  updateCurrentlyTyping();
  scroll();
})

socket.on('stopWriting', id => {
  delete currentlyTypingElements[id];
  updateCurrentlyTyping();
})

function updateCurrentlyTyping() {
  let message;
  const len = Object.keys(currentlyTypingElements).length;
  const paragraph = currentlyTypingContainer.querySelector('p');
  const keys = Object.keys(currentlyTypingElements);
  /// currentlyTypingContainer.length;
  if (len == 0) {
    currentlyTypingContainer.style.display = "none";
  }

  else {
    currentlyTypingContainer.style.display = "inline";
    if (len == 1) {
      message = currentlyTypingElements[keys[0]] + ' scrie...';
      paragraph.innerText = message;
    }
    else
      if (len == 2) {
        message = currentlyTypingElements[keys[0]] + ' si ' + currentlyTypingElements[keys[1]] + ' scriu...';
      }
      else
        if (len == 3) {
          message = currentlyTypingElements[keys[0]] + ', ' + currentlyTypingElements[keys[1]] + ' si alta persoana scriu...';
        }
        else {
          message = currentlyTypingElements[keys[0]] + ', ' + currentlyTypingElements[keys[1]] + ' si alte ' + String(keys.length - 2) + ' persoane scriu...';
        }
      paragraph.innerText = message;
  }
}