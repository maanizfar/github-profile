import React from "react";
import styled from "styled-components";
import Octicon, { Location, Calendar, Briefcase } from "@primer/octicons-react";
import { defaultTheme } from "../styles/theme";
import { mixins } from "../styles/mixins";
import StatsBox from "../components/StatsBox";
const { colors, fonts } = defaultTheme;

const Section = styled.section`
  padding: 48px 80px 148px 80px;
  background-color: ${colors.black};
  background: linear-gradient(to top, ${colors.black}, ${colors.gray});

  @media (max-width: 480px) {
    padding: 48px 8px 148px 8px;
  }
`;

const Container = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  color: ${colors.white};

  @media (max-width: 480px) {
    width: 100%;
  }
`;

const AvatarContainer = styled.div`
  width: 150px;
  height: 150px;
  border: solid 8px ${colors.purple};
  border-radius: 50%;
`;

const Avatar = styled.img`
  border-radius: 50%;
  width: 100%;
`;

const Name = styled.h1`
  font-size: 2.5rem;
  font-family: ${fonts.inter};
  margin: 32px 0px;
  text-align: center;

  @media (max-width: 420px) {
    font-size: 2rem;
  }
`;

const UsernameLink = styled.div`
  font-size: 1.8rem;
  font-family: ${fonts.inter};
  a {
    color: ${colors.lightPurple};
  }

  @media (max-width: 420px) {
    font-size: 1.5rem;
  }
`;

const InfoContainer = styled.div`
  ${mixins.flexCenter}

  margin: 32px 0px;
  span {
    margin: 0px 16px;
    font-family: ${fonts.inter};
  }
  svg {
    margin-right: 8px;
  }

  @media (max-width: 710px) {
    flex-direction: column;

    span {
      margin: 8px 0px;
    }
  }
`;

const StatsContainer = styled.div`
  ${mixins.flexCenter}
  flex-wrap: wrap;
`;

const UserInfoSection = ({ username, userData }) => {
  const {
    name,
    avatar_url,
    followers,
    following,
    created_at,
    html_url: profile_url,
    location,
    public_repos,
    company,
  } = userData;
  return (
    <Section>
      <Container>
        <AvatarContainer>
          <Avatar src={avatar_url} alt={`${name}'s avatar`} />
        </AvatarContainer>
        <Name>{name}</Name>
        <UsernameLink>
          <a href={profile_url}>@{username}</a>
        </UsernameLink>
        <InfoContainer>
          {company && (
            <span>
              <Octicon icon={Briefcase} /> {company}
            </span>
          )}
          {location && (
            <span>
              <Octicon icon={Location} /> {location}
            </span>
          )}
          {created_at && (
            <span>
              <Octicon icon={Calendar} />
              Joined{" "}
              {new Date(created_at).toLocaleDateString("en-US", {
                month: "long",
                day: "numeric",
                year: "numeric",
              })}
            </span>
          )}
        </InfoContainer>
        <StatsContainer>
          <StatsBox value={followers} name="followers" />
          <StatsBox value={following} name="following" />
          <StatsBox value={public_repos} name="repositories" />
        </StatsContainer>
      </Container>
    </Section>
  );
};

export default UserInfoSection;
