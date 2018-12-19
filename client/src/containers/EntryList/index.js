/** @jsx jsx */
import React from "react";
import styled from "@emotion/styled";
import { jsx } from "@emotion/core";
import { Box } from "@rebass/grid/emotion";
import { boxShadow, color, gridRowGap, gridTemplateRows } from "styled-system";

const List = styled(Box)`
  ${gridRowGap};
  display: grid;
`;

const Cell = styled(Box)`
  ${color};
  ${boxShadow};
  ${gridTemplateRows};
  border-radius: 3px;
  display: grid;
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
    bg="panelBackground"
    boxShadow={0}
    gridTemplateRows="1fr 2fr 1fr"
    p={2}
    w={1}
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

const EntryList = () => {
  return (
    <List gridRowGap={8}>
      <Entry />
      <Entry />
      <Entry />
      <Entry />
      <Entry />
    </List>
  );
};

export default EntryList;
