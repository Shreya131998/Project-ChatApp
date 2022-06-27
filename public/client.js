const socket = io()
let userName

do {
  userName = prompt('Please enter your name:')
} while (!userName)

let textarea = document.querySelector('#textarea')
let messageArea = document.querySelector('.message_area')

textarea.addEventListener('keyup', (e) => {
  if (e.key === 'Enter') {
    sendMessage(e.target.value)
  }
})

function sendMessage(message) {
  let msg = {
    user: userName,
    message: message.trim(),
  }

  //?Append
  appendMessage(msg, 'outgoing')
  textarea.value = ''
  scrollToBottom()

  //?send to server via websocket
  socket.emit('message', msg)
}

function appendMessage(msg, type) {
  let mainDiv = document.createElement('div')
  let className = type
  mainDiv.classList.add(className, 'message')

  //to generate markup
  let markup = `
    <h4>${msg.user}</h4>
    <p>${msg.message}</p>
  `

  mainDiv.innerHTML = markup
  messageArea.appendChild(mainDiv)
}

//Receive message
socket.on('message', (msg) => {
  appendMessage(msg, 'incoming')
  scrollToBottom()
})

function scrollToBottom() {
  messageArea.scrollTop = messageArea.scrollHeight
}
