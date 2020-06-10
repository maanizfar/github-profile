import React, { useEffect, useState } from "react";
import RepoCard from "./RepoCard";
import styled from "styled-components";
import { defaultTheme } from "../styles/theme";

import { Flipper, Flipped } from "react-flip-toolkit";
import { mixins } from "../styles/mixins";

const { colors, fonts } = defaultTheme;

const Section = styled.section`
  background-color: ${colors.lightPurple};
  background-image: linear-gradient(${colors.lightPurple}, ${colors.purple});
  padding: 48px 80px;
  font-family: ${fonts.inter};

  @media (max-width: 600px) {
    padding: 48px 16px;
  }
`;

const Container = styled.ul`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(310px, 1fr));
  grid-template-rows: auto;
  grid-gap: 1rem;
  padding: 0;

  li {
    list-style: none;
    height: 100%;
  }
`;

const Header = styled.header`
  ${mixins.flexSpaceBetween}
  align-items: flex-start;
  margin: 32px 0px;
  color: ${colors.white};
  div {
    font-size: 1.4rem;
    padding-bottom: 8px;
  }

  @media (max-width: 600px) {
    flex-direction: column;
    ${mixins.flexCenter}
  }
`;

const Heading = styled.h1`
  font-size: 2.5rem;
  margin: 0;
  margin-right: 32px;
`;

const SortSelector = styled.div`
  ${mixins.flexCenter}

  label {
    padding: 0px 8px;
  }
  @media (max-width: 600px) {
    margin-top: 32px;
  }
`;

const Select = styled.select`
  outline: none;
  padding: 8px;
  background-color: transparent;
  border: solid 2px;
  border-radius: 8px;
  color: ${colors.white};
  font-family: ${fonts.inter};
  font-size: 1.4rem;
  margin-left: 4px;

  option {
    background-color: ${colors.purple};
  }

  :hover {
    box-shadow: rgba(0, 0, 0, 0.2) 0px 5px 10px -7px;
  }
`;

const RepoSection = ({ data, langData }) => {
  const [topRepos, setTopRepos] = useState(null);
  const [type, setType] = useState("stars");

  const getTopRepos = (sortType, number) => {
    const map = {
      stars: "stargazers_count",
      forks: "forks_count",
      size: "size",
    };
    const sortingProperty = map[sortType];

    return data
      .filter((repo) => !repo.fork)
      .sort((a, b) => b[sortingProperty] - a[sortingProperty])
      .slice(0, number);
  };

  useEffect(() => {
    setTopRepos(getTopRepos(type, 8));
    // eslint-disable-next-line
  }, [type]);

  const changeHandler = (e) => {
    setType(e.target.value);
  };

  return (
    <Section>
      <Header>
        <Heading>Top Repos</Heading>

        <SortSelector>
          <label>Sort by</label>
          <Select onChange={changeHandler}>
            <option value="stars">Stars</option>
            <option value="size">Size</option>
            <option value="forks">Forks</option>
          </Select>
        </SortSelector>
      </Header>
      <Flipper flipKey={`${type}-${JSON.stringify(topRepos)}`} spring="gentle">
        <Container>
          {topRepos &&
            topRepos.map((repo) => (
              <Flipped key={repo.id} flipId={repo.id}>
                <li>
                  <RepoCard data={repo} langData={langData} />
                </li>
              </Flipped>
            ))}
        </Container>
      </Flipper>
    </Section>
  );
};

export default RepoSection;
