import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { getUserData, getReposData, getLangData } from "../utils/Data";
// import {
//   userData as mockUserData,
//   reposData as mockReposData,
//   langData as mockLangData,
// } from "../utils/mockData";
import LoadingBar from "../components/LoadingBar";
// import styled from "styled-components";
// import Octicon from "@primer/octicons-react";
// import { defaultTheme } from "../styles/theme";
// import { mixins } from "../styles/mixins";

import UserInfoSection from "../components/UserInfoSection";
import RepoSection from "../components/RepoSection";

const Profile = () => {
  const { username } = useParams();
  const [userData, setUserData] = useState(null);
  const [reposData, setReposData] = useState(null);
  const [langData, setLangData] = useState(null);
  const [error, setError] = useState({ active: false, type: 200, text: "OK" });

  useEffect(() => {
    // setUserData(mockUserData);
    // setReposData(mockReposData);
    // setLangData(mockLangData);

    getUserData(username, setUserData, (type, text) =>
      setError({ active: true, type, text })
    );
    getReposData(username, setReposData, (type, text) =>
      setError({ active: true, type, text })
    );
    getLangData(username, setLangData, (type, text) =>
      setError({ active: true, type, text })
    );
  }, [username]);

  if (error.active === true) {
    return (
      <p>
        Error: {error.type}, {error.text}
      </p>
    );
  }

  if (userData === null || reposData === null || langData === null) {
    return <LoadingBar />;
  }

  document.title = `${username} | GitHub Profile`;

  return (
    <div>
      <UserInfoSection username={username} userData={userData} />
      <RepoSection data={reposData} />
      {/* <div style={{ backgroundColor: "black", color: "white" }}>
        {langData.map((lang) => (
          <div key={lang.label}>
            <p style={{ color: lang.color }}>
              {lang.label}: {lang.value}
            </p>
          </div>
        ))}
      </div> 
      <div style={{ backgroundColor: "black", color: "white" }}>
        {reposData.map((repo) => {
          return (
            <div key={repo.id}>
              <h1>{repo.name}</h1>
              <p>Description: {repo.description}</p>
              <p>Language: {repo.language}</p>
              <p>Forks: {repo.forks_count}</p>
              <p>Stars: {repo.stargazers_count}</p>
            </div>
          );
        })}
      </div>*/}
    </div>
  );
};

export default Profile;
