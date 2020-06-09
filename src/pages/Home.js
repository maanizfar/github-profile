import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { getUserData } from "../utils/Data";
import styled from "styled-components";
import Octicon, { MarkGithub } from "@primer/octicons-react";

import LoadingBar from "../components/LoadingBar";

import { mixins } from "../styles/mixins";
import { defaultTheme } from "../styles/theme";
const { colors, fonts } = defaultTheme;

const Container = styled.div`
  ${mixins.flexCenter};
  height: 100vh;
  background-color: ${colors.darkGray};
  background-image: radial-gradient(
    ${colors.darkGray} 0%,
    ${colors.black} 100%
  );
  color: ${colors.white};
`;

const Form = styled.form`
  ${mixins.flexCenter}
  flex-direction: column;
  padding: 32px;
  max-width: 600px;
  margin-bottom: 20vh;
  text-align: center;
  svg {
    color: ${colors.purple};
  }

  @media (max-width: 600px) {
    margin-bottom: 0;
  }
`;

const Label = styled.label`
  font-size: 2.5rem;
  margin: 32px;
  font-family: ${fonts.inter};

  @media (max-width: 600px) {
    font-size: 1.5rem;
  }
`;

const Input = styled.input`
  width: 100%;
  font-size: 2rem;
  text-align: center;
  padding: 1rem;
  border: none;
  border-radius: 8px;
  font-family: ${fonts.mono};
  background-color: ${colors.gray};
  color: ${colors.lightPurple};

  @media (max-width: 600px) {
    font-size: 1.2rem;
    padding: 0.5rem;
  }
`;

const ErrorText = styled.p`
  color: ${colors.red};
`;

const Home = () => {
  document.title = "GitHub Profile";

  const [username, setUsername] = useState("");
  const [error, setError] = useState({ active: false, type: 200, text: "OK" });
  const [isLoading, setIsLoading] = useState(false);
  const history = useHistory();

  const changeHandler = (e) => setUsername(e.target.value);

  const submitHandler = (e) => {
    e.preventDefault();

    setIsLoading(true);

    getUserData(
      username,
      () => history.push(`/${username}`),
      (type, text) => {
        setError({ active: true, type, text });
        setIsLoading(false);
      }
    );
  };

  const clearError = () => {
    if (error.active) {
      setError({ active: false });
    }
  };

  return (
    <Container>
      {isLoading && <LoadingBar />}

      <Form onSubmit={submitHandler}>
        <Octicon icon={MarkGithub} size="large" />
        <Label htmlFor="username">Find A Profile</Label>
        <Input
          type="text"
          name="username"
          id="username"
          onChange={changeHandler}
          onInput={clearError}
        />

        <ErrorText>
          {error.active ? username + " " + error.text.toLowerCase() : ""}
        </ErrorText>
      </Form>
    </Container>
  );
};

export default Home;
