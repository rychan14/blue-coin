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

const th = prop => ({ theme }) =>
  prop.split(".").reduce((path, key) => (path && path[key]) || null, theme);

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

const List = styled(Box)``;

const Cell = styled(Box)`
  ${color};
  ${boxShadow};
  ${gridTemplateRows};
  border-radius: 3px;
  display: grid;
  margin: 8px 0;
  height: 8em;
`;

const CellSection = styled(Box)`
  ${color};
`;

const Title = styled(Box)`
  ${color};
  font-weight: bold;
`;

const Description = styled(Box)`
  ${color};
  overflow: hidden;
  white-space: nowrap;
`;

const Amount = styled(Box)`
  ${color};
  text-align: right;
`;

const Entry = () => (
  <Cell
    w={1}
    p={2}
    boxShadow={0}
    bg="panelBackground"
    gridTemplateRows="1fr 2fr 1fr"
  >
    <CellSection>
      <Title color="text">Title</Title>
    </CellSection>
    <CellSection>
      <Description color="fadedText">Description</Description>
    </CellSection>
    <CellSection>
      <Amount color="text">0</Amount>
    </CellSection>
  </Cell>
);

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
        <AppWrapper p={2} gridColumn="col-start 1 / 13">
          <List>
            <Entry />
            <Entry />
            <Entry />
          </List>
        </AppWrapper>
      </Wrapper>
    </>
  );
};

export default App;
