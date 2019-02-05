import http from 'http'
import app from 'server'
require('dotenv').config()

const port = process.env.PORT || 5000
let currentApp = app.callback()
const server = http.createServer(currentApp)
server.listen(port, err => {
  if (err) {
    console.log(err)
  }
  console.log(`listening ON ${port}`)
})

if (module.hot) {
  console.log('✅  Server-side HMR Enabled!')
  module.hot.accept('./server', () => {
    try {
      const newApp = app.callback()
      server.removeListener('request', currentApp)
      server.on('request', newApp)
      currentApp = newApp
    } catch (err) {
      console.error(err)
    }
  })
}
