/**
 *
 * App
 *
 * This component is the skeleton around the actual pages, and should only
 * contain code that should be seen on all pages. (e.g. navigation bar)
 */

/** @jsx jsx */
import React from 'react'
import { Helmet } from 'react-helmet'
// import styled from 'styled-components';
import { css, jsx } from '@emotion/core'
import styled from '@emotion/styled'
import { Switch, Route } from 'react-router-dom'
import { Flex, Box } from '@rebass/grid/emotion'
// import system from '@rebass/components/emotion'
import { boxShadow, color, gridColumn, gridGap, gridTemplateColumns, gridTemplateRows } from 'styled-system'

// import HomePage from 'containers/HomePage/Loadable';
// import FeaturePage from 'containers/FeaturePage/Loadable';
// import NotFoundPage from 'containers/NotFoundPage/Loadable';
// import Header from 'components/Header';
// import Footer from 'components/Footer';

// import GlobalStyle from '../../global-styles';

// const Grid = system(
//   { is: Box },
//   { display: 'grid' },
//   'gridGap',
//   'gridColumnGap',
//   'gridRowGap',
//   'gridColumn',
//   'gridRow',
//   'gridAutoFlow',
//   'gridAutoColumns',
//   'gridAutoRows',
//   'gridTemplateColumns',
//   'gridTemplateRows'
// )

const th = prop => ({ theme }) =>
  prop.split('.').reduce((path, key) => (path && path[key]) || null, theme)

const Wrapper = styled(Box)`
  ${gridGap};
  ${gridTemplateColumns};
  display: grid;
  min-height: 100vh;
`

const Nav = styled(Flex)`
  ${color};
  ${boxShadow};
  ${gridColumn};
  height: 3em;
  position: sticky;
  top: 0;
`

const List = styled(Box)`
  ${gridColumn};
`

const CellSection = styled(Box)`
  ${color};
`

const Row = styled(Box)`
  ${color};
  ${boxShadow};
  ${gridTemplateRows};
  border-radius: 3px;
  display: grid;
  min-height: 8em;
`

const Title = styled(Box)`
  ${color};
  font-weight: bold;
`

const Description = styled(Box)`
  ${color};
  overflow: hidden;
  white-space: nowrap;
`

const Amount = styled(Box)`
  ${color};
  text-align: right;
`

const Cell = () => (
  <Row w={1} p={2} boxShadow={0} bg='panelBackground' gridTemplateRows='1fr 2fr 1fr'>
    <CellSection>
      <Title color='text'>Title</Title>
    </CellSection>
    <CellSection>
      <Description color='fadedText'>
        Description
      </Description>
    </CellSection>
    <CellSection>
      <Amount color='text'>0</Amount>
    </CellSection>
  </Row>
)

const App = () => {
  return (
    <Wrapper bg='background' gridGap={5} gridTemplateColumns='repeat(12, [col-start] 1fr)'>
      <Helmet titleTemplate='%s - Blue Coin' defaultTitle='Blue Coin'>
        <meta name='description' content='Record Keeping' />
      </Helmet>
      <Nav boxShadow={0} bg='panelBackground' gridColumn='span 12' width={1} />
      <List width={1} gridColumn='col-start 2 / span 10'>
        <Cell />
        <Cell />
        <Cell />
        <Cell />
        <Cell />
        <Cell />
      </List>
    </Wrapper>
  )
}

export default App

/* <Helmet
        titleTemplate="%s - React.js Boilerplate"
        defaultTitle="React.js Boilerplate"
      >
        <meta name="description" content="A React.js Boilerplate application" />
      </Helmet>
      <Header />
      <Switch>
        <Route exact path="/" component={HomePage} />
        <Route path="/features" component={FeaturePage} />
        <Route path="" component={NotFoundPage} />
      </Switch>
      <Footer />
      <GlobalStyle /> */
