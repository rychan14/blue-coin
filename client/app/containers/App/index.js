/**
 *
 * App
 *
 * This component is the skeleton around the actual pages, and should only
 * contain code that should be seen on all pages. (e.g. navigation bar)
 */

/** @jsx jsx */
import React from 'react';
import { Helmet } from 'react-helmet';
import styled from 'styled-components';
import { css, jsx } from '@emotion/core';
import { Switch, Route } from 'react-router-dom';
import { Flex, Box } from '@rebass/grid';

import HomePage from 'containers/HomePage/Loadable';
import FeaturePage from 'containers/FeaturePage/Loadable';
import NotFoundPage from 'containers/NotFoundPage/Loadable';
import Header from 'components/Header';
import Footer from 'components/Footer';

import GlobalStyle from '../../global-styles';
// max-width: calc(768px + 16px * 2);
// margin: 0 auto;
// display: flex;
// min-height: 100%;
// padding: 0 10px;
// flex-direction: column;
// const AppWrapper = styled('Flex')`
//   padding: 0 10px;
// `;

const appWrapper = css`
  padding: 0 10px;
`;

const row = css`
  border: 1px solid #aaa;
  border-radius: 3px;
`;

const chevronStyles = css`
  height: 1em;
`;

const Chevron = () => (
  <svg x="0px" y="0px" viewBox="0 0 512 512" css={chevronStyles}>
    <g>
      <path
        d="M367.954,213.588L160.67,5.872c-7.804-7.819-20.467-7.831-28.284-0.029c-7.819,7.802-7.832,20.465-0.03,28.284
   l207.299,207.731c7.798,7.798,7.798,20.486-0.015,28.299L132.356,477.873c-7.802,7.819-7.789,20.482,0.03,28.284
   c3.903,3.896,9.016,5.843,14.127,5.843c5.125,0,10.25-1.958,14.157-5.873l207.269-207.701
   C391.333,275.032,391.333,236.967,367.954,213.588z"
      />
    </g>
  </svg>
);

const App = () => {
  return (
    <Flex css={appWrapper}>
      <Helmet titleTemplate="%s - Blue Coin" defaultTitle="Blue Coin">
        <meta name="description" content="Record Keeping" />
      </Helmet>
      <Flex justifyContent="center" width={1} css={row}>
        <Box width={1 / 5}>
          <Chevron />
        </Box>
        <Box width={3 / 5}>
          <Chevron />
        </Box>
        <Box width={1 / 5}>
          <Chevron />
        </Box>
      </Flex>
    </Flex>
  );
};

export default App;

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
