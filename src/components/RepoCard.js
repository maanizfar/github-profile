import React from "react";
import styled from "styled-components";
import { mixins } from "../styles/mixins";
import { defaultTheme } from "../styles/theme";
import Octicon, { Repo, Star, RepoForked } from "@primer/octicons-react";

const { colors, fonts } = defaultTheme;

const Container = styled.a`
  ${mixins.flexSpaceBetween}
  text-decoration: none;
  flex-direction: column;
  background-color: ${colors.white};
  color: ${colors.gray};
  padding: 32px;
  border: solid 1px;
  border-radius: 8px;
  font-family: ${fonts.inter};
`;

const Name = styled.h3`
  ${mixins.ellipsis}
  margin-top: 0;
`;

const Description = styled.p`
  font-size: 0.9rem;
  margin-top: 0;
  margin-bottom: 32px;
  font-family: ${fonts.mono};
`;

const BottomContainer = styled.span`
  ${mixins.flexSpaceBetween}
  font-size: 0.85rem;

  span {
    margin-right: 8px;
  }

  span:last-child {
    margin: 0;
  }
`;

const LanguageIcon = styled.div`
  display: inline-block;
  height: 12px;
  width: 12px;
  background-color: ${(props) => props.color};
  border-radius: 50%;
`;

const RepoCard = ({ data }) => {
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
              <LanguageIcon color="red" /> {data.language}
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
          <span>{data.size} KB</span>
        </div>
      </BottomContainer>
    </Container>
  );
};

export default RepoCard;
