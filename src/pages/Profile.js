import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { getUserData, getReposData, getLangData } from "../utils/Data";
// import {
//   userData as mockUserData,
//   reposData as mockReposData,
//   langData as mockLangData,
// } from "../utils/mockData";
import LoadingBar from "../components/LoadingBar";

import UserInfoSection from "../components/UserInfoSection";
import RepoSection from "../components/RepoSection";
import ChartSection from "../components/ChartSection";

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
      <ChartSection langData={langData} repoData={reposData} />
      <RepoSection data={reposData} langData={langData} />
    </div>
  );
};

export default Profile;
