import React from "react";
import styled from "styled-components";
import { mixins } from "../styles/mixins";
import { defaultTheme } from "../styles/theme";
import Octicon, { Repo, Star, RepoForked } from "@primer/octicons-react";
import pretty from "prettysize";

const { colors, fonts } = defaultTheme;

const Container = styled.a`
  ${mixins.flexSpaceBetween}
  text-decoration: none;
  flex-direction: column;
  background-color: ${colors.white};
  color: ${colors.gray};
  padding: 32px;
  border-radius: 8px;
  font-family: ${fonts.inter};
  height: 8rem;
  box-shadow: rgba(0, 0, 0, 1) 0px 10px 30px -15px;
  transition: all 200ms cubic-bezier(0.23, 1, 0.32, 1) 0s;

  :hover {
    box-shadow: rgba(0, 0, 0, 0.2) 0px 5px 10px -7px;
  }
`;

const Name = styled.h3`
  ${mixins.ellipsis}
  margin-top: 0;
`;

const Description = styled.p`
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
  font-size: 0.9rem;
  margin-top: 0;
  margin-bottom: 32px;
  font-family: ${fonts.mono};
`;

const BottomContainer = styled.span`
  ${mixins.flexSpaceBetween}
  font-size: 0.85rem;

  span {
    margin-right: 16px;
    text-transform: uppercase;
  }

  span:last-child {
    margin: 0;
  }

  svg {
    margin-right: 4px;
  }
`;

const LanguageIcon = styled.div`
  display: inline-block;
  height: 12px;
  width: 12px;
  background-color: ${(props) => props.color};
  border-radius: 50%;
  vertical-align: baseline;
  margin-right: 4px;
`;

const RepoCard = ({ data, langData }) => {
  const getLanguageColor = (language) => {
    return langData.filter(
      (l) => l.label.toLowerCase() === language.toLowerCase()
    )[0].color;
  };

  return (
    <Container href={data.html_url} target="_blank">
      <div>
        <Name>
          <Octicon icon={Repo} /> {data.name}
        </Name>
        <Description>{data.description}</Description>
      </div>
      <BottomContainer>
        <div>
          {data.language && (
            <span>
              <LanguageIcon color={getLanguageColor(data.language)} />{" "}
              {data.language}
            </span>
          )}
          <span>
            <Octicon icon={RepoForked} /> {data.forks_count}
          </span>
          <span>
            <Octicon icon={Star} /> {data.stargazers_count}
          </span>
        </div>
        <div>
          <span>{pretty(data.size)}</span>
        </div>
      </BottomContainer>
    </Container>
  );
};

export default RepoCard;
