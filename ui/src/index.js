import http from 'http'
import app from './server'
require('dotenv').config()

const port = process.env.PORT || 5000
const server = http.createServer(app)
let currentApp = app
console.log(currentApp, app, server)
server.listen(port, () => {
  console.log(`listening ON ${port}`)
})
// app.listen(port, () => {
//   console.log(`listening on ${port}`)
// })

if (module.hot) {
  module.hot.accept('./server', () => {
    app.removeListener('request', currentApp)
    server.on('request', app)
    currentApp = app
  })
}
