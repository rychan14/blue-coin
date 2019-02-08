import React, 
  {
    // createRef,
    Fragment,
    // PureComponent,
    useEffect
} from 'react'
import Route from 'react-router-dom/Route'
import Switch from 'react-router-dom/Switch'
import { Global, css } from '@emotion/core'
import styled from '@emotion/styled'
import emotionReset from 'emotion-reset'

import Home from 'components/Home'
import Route1 from 'components/Route1'

const Grid = styled('div')`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
`

const TitleCard = styled('div')`
  align-items: center;
  display: flex;
  justify-content: center;
`
// useEffect(() => {
//   const canvas = document.querySelector('#title-card--canvas')
//   canvas.width = window.innerWidth / 2
//   canvas.height = window.innerHeight
//   const titleCard = document.querySelector('#title-card')
//   titleCard.onload = () => {
//     const ctx = canvas.getContext('2d')
//     ctx.fillStyle = 'green'
//     console.log(ctx, ctx.COLOR_BUFFER_BIT)
//   }
//   // ctx.clearColor(2.0, 1.0, 4.0, 1.0)
//   // ctx.clear(ctx.COLOR_BUFFER_BIT);
// })

// class Canvas extends PureComponent { 
//   constructor(props) {
//     super(props)
//     this.canvasRef = createRef()
//   }


//   componentDidMount() {
//     // Draws a square in the middle of the canvas rotated
//     // around the centre by this.props.angle
//     // const { angle } = this.props;
//     const canvas = this.canvasRef.current;
//     canvas.width = window.innerWidth / 2
//     canvas.height = window.innerHeight
//     const ctx = canvas.getContext('2d');
//     ctx.fillStyle = 'green'
//     ctx.fillRect(10, 10, 50, 50)
//     // const width = canvas.width;
//     // const height = canvas.height;
//     // ctx.save();
//     // ctx.beginPath();
//     // ctx.clearRect(0, 0, width, height);
//     // ctx.translate(width / 2, height / 2);
//     // ctx.rotate((angle * Math.PI) / 180);
//     // ctx.fillStyle = '#4397AC';
//     // ctx.fillRect(-width / 4, -height / 4, width / 2, height / 2);
//     // ctx.restore();
//   }

//   render() {
//     return (
//       <canvas ref={this.canvasRef} />
//     )
//   }
// }

const App = () => {
  useEffect(() => {
    const canvas = document.querySelector('#title-card')
    canvas.width = window.innerWidth / 2
    canvas.height = window.innerHeight
    // const ctx = canvas.getContext('2d')
    // ctx.fillStyle = 'green'
    // ctx.fillRect(10, 10, 50, 50)
    const ctx = canvas.getContext('webgl2')
    ctx.clearColor(2.0, 1.0, 4.0, 1.0)
    ctx.clear(ctx.COLOR_BUFFER_BIT)
    // ctx.clearColor(2.0, 1.0, 4.0, 1.0)
    // ctx.clear(ctx.COLOR_BUFFER_BIT);
  })
  
  return (
    <Fragment>
      <Global styles={css`${emotionReset}`}/>
      <Grid>
        <TitleCard>
          {/* <Canvas /> */}
          <canvas id='title-card' />
        </TitleCard>
        <Switch>
          <Route exact path='/' component={Home} />
          <Route exact path='/route1' component={Route1} />
        </Switch>
      </Grid>
    </Fragment>
  )
}

export default App
