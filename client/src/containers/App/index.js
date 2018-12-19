/** @jsx jsx */
import React from "react";
import { Global, css, jsx } from "@emotion/core";
import styled from "@emotion/styled";
import { Flex, Box } from "@rebass/grid/emotion";
import {
  boxShadow,
  color,
  gridColumn,
  gridGap,
  gridTemplateColumns,
  gridTemplateRows
} from "styled-system";
import EntryList from "containers/EntryList";

// const th = prop => ({ theme }) =>
//   prop.split(".").reduce((path, key) => (path && path[key]) || null, theme);

const Wrapper = styled(Box)`
  ${gridGap};
  ${gridTemplateColumns};
  ${gridTemplateRows};
  display: grid;
  min-height: 100vh;
`;

const Nav = styled(Flex)`
  ${color};
  ${boxShadow};
  ${gridColumn};
  position: sticky;
  top: 0;
`;

const AppWrapper = styled(Box)`
  ${gridColumn};
`;

const App = () => {
  return (
    <>
      <Global
        styles={css`
          body {
            margin: 0;
            padding: 0;
            font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", "Roboto",
              "Oxygen", "Ubuntu", "Cantarell", "Fira Sans", "Droid Sans",
              "Helvetica Neue", sans-serif;
            -webkit-font-smoothing: antialiased;
            -moz-osx-font-smoothing: grayscale;
          }

          code {
            font-family: source-code-pro, Menlo, Monaco, Consolas, "Courier New",
              monospace;
          }

          * {
            box-sizing: border-box;
          }
        `}
      />
      <Wrapper
        bg="background"
        gridGap={8}
        gridTemplateColumns="repeat(12, [col-start] 1fr)"
        gridTemplateRows="3em auto"
      >
        <Nav
          boxShadow={0}
          bg="panelBackground"
          gridColumn="span 12"
          width={1}
        />
        <AppWrapper px={3} gridColumn="col-start 1 / 13">
          <EntryList />
        </AppWrapper>
      </Wrapper>
    </>
  );
};

export default App;
