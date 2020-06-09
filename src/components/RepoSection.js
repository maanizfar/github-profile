import React, { useEffect, useState } from "react";
import RepoCard from "./RepoCard";
import styled from "styled-components";
import { defaultTheme } from "../styles/theme";

const { colors, fonts } = defaultTheme;

const Section = styled.section`
  background-color: ${colors.red};
  padding: 48px 80px;
  font-family: ${fonts.inter};
`;

const Container = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(310px, 1fr));
  grid-gap: 1rem;
`;

const Header = styled.header`
  display: flex;
  align-items: baseline;
  margin: 32px 0px;

  div {
    font-size: 1.4rem;
    padding-bottom: 8px;
  }
`;

const Select = styled.select`
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
`;

const Heading = styled.h1`
  font-size: 2.5rem;
  margin: 0;
  margin-right: 32px;
`;

const RepoSection = ({ data }) => {
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

        <div>
          Sort by{" "}
          <Select onChange={changeHandler}>
            <option value="stars">Stars</option>
            <option value="size">Size</option>
            <option value="forks">Forks</option>
          </Select>
        </div>
      </Header>
      <Container>
        {topRepos &&
          topRepos.map((repo) => <RepoCard key={repo.id} data={repo} />)}
      </Container>
    </Section>
  );
};

export default RepoSection;
