const {remote} = require('electron')
const io = require('socket.io-client')

const socket = io.connect('http://localhost:3000')

socket.on('connect', () => {
  console.log(socket.connected); // true
  getImageData()
});

function getImageData() {
  const image = document.querySelector('img')

  const canvas = document.createElement('canvas')
  const context = canvas.getContext('2d')
  canvas.width = image.width
  canvas.height = image.height
  context.drawImage(image, 0, 0)
  const data = canvas.toDataURL()

  socket.emit('frame', data)

}
