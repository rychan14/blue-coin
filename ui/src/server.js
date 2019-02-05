require('dotenv').config()
import '@babel/polyfill'
import React from 'react'
import { renderToString } from 'react-dom/server'
import Koa from 'koa'
import Router from 'koa-router'
import helmet from 'koa-helmet'
import compress from 'koa-compress'
import cors from '@koa/cors'
import serve from 'koa-static'

import App from './App'

const app = new Koa()
const router = new Router()

const htmlTemplate = reactDom => `
  <!DOCTYPE html>
  <html>
    <head>
      <meta charset="utf-8">
      <title>Reacts</title>
    </head>
    
    <body>
      <div id="root">${reactDom}</div>
      <script src=${
        process.env.NODE_ENV === 'development'
          ? 'http://localhost:5001/client.js'
          : 'app.bundle.js'
      }></script>
    </body>
  </html>
`

router.get('/api', ctx => {
  ctx.body = { message: 'I am a server route!' }
})

router.get('*', ctx => {
  const jsx = <App />
  ctx.body = htmlTemplate(renderToString(jsx))
})

app
  .use(compress())
  .use(helmet())
  .use(cors())
  .use(serve('./public'))
  .use(router.routes())
  .use(router.allowedMethods())

export default app
