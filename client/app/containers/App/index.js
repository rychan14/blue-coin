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
import { boxShadow, color } from 'styled-system'

// import HomePage from 'containers/HomePage/Loadable';
// import FeaturePage from 'containers/FeaturePage/Loadable';
// import NotFoundPage from 'containers/NotFoundPage/Loadable';
// import Header from 'components/Header';
// import Footer from 'components/Footer';

// import GlobalStyle from '../../global-styles';
// max-width: calc(768px + 16px * 2);
// margin: 0 auto;
// display: flex;
// min-height: 100%;
// padding: 0 10px;
// flex-direction: column;
// const AppWrapper = styled('Flex')`
//   padding: 0 10px;
// `;
const th = prop => ({ theme }) =>
  prop.split('.').reduce((path, key) => (path && path[key]) || null, theme)

// const appWrapper = ({ colors }) => css`
//   background-color: ${colors.background};
//   min-height: 100vh;
// `;

// const row = ({ colors }) => css`
//   background-color: ${colors.panelBackground};
//   box-shadow: 2px 2px 10px ${colors.boxShadow};
//   border-radius: 3px;
//   display: grid;
//   grid-template-rows: 1fr 2fr 1fr;
//   min-height: 8em;
// `;

const nav = ({ colors }) => css`
  background-color: ${colors.panelBackground};
  box-shadow: 2px 2px 10px ${colors.boxShadow};
  position: sticky;
  top: 0;
`

const Wrapper = styled(Flex)`
  display: grid;
  grid-template-rows: 3em auto;
  min-height: 100vh;
`

const Nav = styled(Flex)`
  ${color};
  ${boxShadow};
  position: sticky;
  top: 0;
`

const CellSection = styled(Box)`
  ${color};
`

const Row = styled(Box)`
  ${color};
  ${boxShadow};
  border-radius: 3px;
  display: grid;
  grid-template-rows: 1fr 2fr 1fr;
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
  <Row boxShadow={0} bg='panelBackground' justifyContent='center' m={3} p={3}>
    <CellSection>
      <Title color='text'>Title</Title>
    </CellSection>
    <CellSection>
      <Description color='fadedText'>
        DescriptionDescriptionDescriptionDescriptionDescriptionDescriptionDescriptionDescriptionDescriptionDescriptionDescriptionDescriptionDescriptionDescriptionDescriptionDescriptionDescriptionDescriptionDescriptionDescriptionDescriptionDescriptionDescription
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
    <Wrapper flexWrap='wrap' bg='background'>
      <Helmet titleTemplate='%s - Blue Coin' defaultTitle='Blue Coin'>
        <meta name='description' content='Record Keeping' />
      </Helmet>
      <Nav boxShadow={0} bg='panelBackground' width={1} />
      <Box flexDirection='column' width={1} justifyContent='flex-start'>
        <Cell />
        <Cell />
        <Cell />
        <Cell />
        <Cell />
        <Cell />
      </Box>
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
