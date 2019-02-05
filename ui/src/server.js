import '@babel/polyfill'
import React from 'react'
import { renderToString } from 'react-dom/server'
import Layout from 'ui/index.js'
import Koa from 'koa'
import Router from 'koa-router'
// require('dotenv').config()

const app = new Koa()
const router = new Router()
// const port = process.env.PORT || 5000

const htmlTemplate = (reactDom) => `
  <!DOCTYPE html>
  <html>
    <head>
      <meta charset="utf-8">
      <title>React S</title>
    </head>
    
    <body>
      <div id="app">${reactDom}</div>
      <script src="./app.bundle.js"></script>
    </body>
  </html>
`

// app.use(ctx => {
//   const jsx = (<Layout />)
//   ctx.body = htmlTemplate(renderToString(jsx))
// })

router.get('/', ctx => {
  const jsx = (<Layout />)
  ctx.body = htmlTemplate(renderToString(jsx))
})

// app.listen(port)
app
  .use(router.routes())
  .use(router.allowedMethods())

export default app

// import Hapi from 'hapi'
// import Layout from './index.js'
// require('dotenv').config()

// const htmlTemplate = (reactDom) => `
//   <!DOCTYPE html>
//   <html>
//     <head>
//       <meta charset="utf-8">
//       <title>React SSR</title>
//     </head>

//     <body>
//       <div id="app">${reactDom}</div>
//       <script src="./app.bundle.js"></script>
//     </body>
//   </html>
// `

// const server = Hapi.server({
//   port: process.env.PORT || 5000,
//   host: '0.0.0.0'
// })

// server.route({
//   method: 'GET',
//   path: '/',
//   handler: (request, h) => {
//     const jsx = (<Layout />)
//     return htmlTemplate(renderToString(jsx))
//   }
// })

// const init = async () => {
//   await server.start()
//   console.log(`Server running at: ${server.info.uri}`)
// }

// process.on('unhandledRejection', (err) => {
//   console.log(err)
//   process.exit(1)
// })

// init()
// const http = require('http')
// const port = process.env.PORT || 5000

// let server = http.createServer((req, res) => {
//   let html = `<h1>Environment Variables</h1><br>`
//   // Iterate over `process.env` object and
//   // print its values.
//   html += `<h2>As of: ${new Date()}</h2><br>`
//   Object.keys(process.env).forEach((k) => {
//     html += `${k} = ${process.env[k]} <br>`
//   })
//   // Set the response status and response content
//   // type header
//   res.writeHead(200, {
//     'content-type': 'text/html'
//   })
//   return res.end(html)
// })

// // start listening
// server.listen(port)
// console.log(`Server running on port ${port}`)
