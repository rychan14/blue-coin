import App from './App'
import React from 'react'
import { StaticRouter } from 'react-router-dom'
import Koa from 'koa'
import serve from 'koa-static'
import helmet from 'koa-helmet'
import Router from 'koa-router'
import { renderToString } from 'react-dom/server'
import { renderStylesToString } from 'emotion-server'

const assets = require(process.env.RAZZLE_ASSETS_MANIFEST)

const router = new Router()
router.get(
  '/*',
  (ctx, next) => {
    const context = {}
    const markup = renderStylesToString(
      renderToString(
        <StaticRouter context={context} location={ctx.url}>
          <App />
        </StaticRouter>,
      ),
    )
    ctx.state.markup = markup
    return context.url ? ctx.redirect(context.url) : next()
  },
  ctx => {
    ctx.status = 200
    ctx.body = `
    <!doctype html>
      <html lang="">
      <head>
          <meta http-equiv="X-UA-Compatible" content="IE=edge" />
          <meta charset="utf-8" />
          <title>Welcome to Razzle + Koa</title>
          <meta name="viewport" content="width=device-width, initial-scale=1">
          ${
            assets.client.css
              ? `<link rel="stylesheet" href="${assets.client.css}">`
              : ''
          }
          ${
            process.env.NODE_ENV === 'production'
              ? `<script src="${assets.client.js}" defer></script>`
              : `<script src="${assets.client.js}" defer crossorigin></script>`
          }
      </head>
      <body>
          <div id="root">${ctx.state.markup}</div>
      </body>
    </html>`
  },
)

const server = new Koa()
server
  .use(helmet())
  .use(serve(process.env.RAZZLE_PUBLIC_DIR))
  .use(router.routes())
  .use(router.allowedMethods())

export default server