import React from 'react'
import { Link } from 'react-router-dom'
import styled from '@emotion/styled'

const Wrapper = styled('div')`
  display: grid;
`

const Grid = () => {
  return (
    <Wrapper>
      <Link to='/'>Home</Link>
    </Wrapper>
  )
}

export default Grid
