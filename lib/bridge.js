const server = require('http').createServer();
const io = require('socket.io')(server, {transports: ['polling', 'websockets']})

const FaceFinder = require('./FaceFinder')
const ff  = new FaceFinder()

export default function init () {
  io.on('connection', (socket) => {
    console.log('connected ', socket.id)

    socket.on('frame', (data) => {
      ff.detectFaces(data)
    })
  })

  server.listen(3000)
}
