import React from "react";
import styled from "styled-components";
import { defaultTheme } from "../styles/theme";
import { mixins } from "../styles/mixins";
const { colors, fonts } = defaultTheme;

const Container = styled.div`
  ${mixins.flexCenter}
  flex-direction: column;
  padding: 16px 32px;
  margin: 4px;
  background-color: ${(props) => props.backgroundColor || colors.gray};
  border-radius: 8px;
  font-family: ${fonts.inter};
  font-size: 0.9rem;
  color: ${(props) => props.textColor || colors.white};

  @media (max-width: 710px) {
    padding: 8px 16px;
  }
`;

const Value = styled.span`
  font-size: 1.7rem;
  margin-bottom: 0.5rem;

  @media (max-width: 710px) {
    font-size: 1.2rem;
  }
`;

const Name = styled.span`
  font-size: 0.9rem;
  text-transform: uppercase;

  @media (max-width: 710px) {
    font-size: 0.7rem;
  }
`;

const StatsBox = ({ value, name, backgroundColor, textColor }) => (
  <Container backgroundColor={backgroundColor} textColor={textColor}>
    <Value>{value}</Value>
    <Name>{name}</Name>
  </Container>
);

export default StatsBox;
