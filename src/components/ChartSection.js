import React from "react";
import styled from "styled-components";
import { defaultTheme } from "../styles/theme";
import LanguageChart from "./LanguageChart";
import StarsPerLanguage from "./StarsPerLanguage";
import MostStaredChart from "./MostStaredChart";

import langColors from "../utils/langColors";

const { colors, fonts } = defaultTheme;

const Section = styled.section`
  background-color: ${colors.white};
  padding: 48px 80px;
  font-family: ${fonts.inter};

  @media (max-width: 600px) {
    padding: 48px 16px;
  }
`;

const Container = styled.div`
  max-width: 1200px !important;
  margin-top: -8rem !important;
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  grid-gap: 2rem;
  padding: 0;
  max-width: 1200px;
  margin: auto;
  li {
    list-style: none;
  }

  @media (max-width: 806px) {
    justify-items: center;
  }
`;

const ChartSection = ({ repoData, langData }) => {
  // STARS PER LANGUAGE
  const repos = repoData.filter(
    (repo) => !repo.fork && repo.language && repo.stargazers_count > 0
  );
  const uniqueLangs = new Set(repos.map((repo) => repo.language));

  const labels = Array.from(uniqueLangs.values());

  const stars = labels.map((lang) => {
    const langRepos = repos.filter((r) => r.language === lang);
    const starsArray = langRepos.map((r) => r.stargazers_count);
    const starSum = starsArray.reduce((a, b) => a + b, 0);
    return starSum;
  });

  const starsColors = labels.map((label) => langColors[label]);

  const starsPerLangData = [];
  for (let i = 0; i < labels.length; i++) {
    starsPerLangData.push({
      label: labels[i],
      value: stars[i],
      color: starsColors[i],
    });
  }

  // MOST STARRED
  const repoColors = ["red", "blue", "green", "yellow", "purple", "gray"];
  let i = -1;
  const mostStaredData = repos
    .sort((a, b) => b.stargazers_count - a.stargazers_count)
    .slice(0, 5)
    .map((r) => {
      i++;
      return {
        label: r.name,
        value: r.stargazers_count,
        color: repoColors[i],
      };
    });

  return (
    <Section>
      <Container>
        {/* <li> */}
        <LanguageChart data={langData} />
        {/* </li> */}
        {/* <li> */}
        <StarsPerLanguage data={starsPerLangData} />
        {/* </li> */}
        {/* <li> */}
        <MostStaredChart data={mostStaredData} />
        {/* </li> */}
      </Container>
    </Section>
  );
};

export default ChartSection;
