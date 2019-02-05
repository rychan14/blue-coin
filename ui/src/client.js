import React from 'react'
import { hydrate } from 'react-dom'
import { BrowserRouter } from 'react-router-dom'
// import { AppContainer } from 'react-hot-loader'
import App from './App'

hydrate(
  <BrowserRouter>
    <App />
  </BrowserRouter>,
  document.getElementById('root'),
)

if (module.hot) {
  module.hot.accept()
  // module.hot.accept('./App', () => {
  //   render(
  //     <AppContainer>
  //       <App />
  //     </AppContainer>,
  //     document.getElementById('root'),
  //   )
  // })
}
