import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
// import {
//   userData as mockUserData,
//   reposData as mockReposData,
//   langData as mockLangData,
// } from "../utils/mockData";
import GhPolyglot from "gh-polyglot";

const Profile = () => {
  const { username } = useParams();
  const [userData, setUserData] = useState(null);
  const [reposData, setReposData] = useState(null);
  const [langData, setLangData] = useState(null);
  const [error, setError] = useState({ active: false, type: 200 });

  useEffect(() => {
    getData(`https://api.github.com/users/${username}`, setUserData);
    getData(`https://api.github.com/users/${username}/repos`, setReposData);
    getLangData(`${username}`);
  }, [username]);

  const getLangData = (username) => {
    const me = new GhPolyglot(username);
    me.userStats((err, stats) => {
      if (err) {
        console.log(err);
      }
      console.log(JSON.stringify(stats));
      setLangData(stats);
    });
  };

  const getData = (url, callback) => {
    fetch(url)
      .then((res) => {
        if (res.status !== 200) {
          return setError({ active: true, type: res.status });
        }
        return res.json();
      })
      .then((json) => {
        callback(json);
        // console.log(json);
      });
  };

  if (error.active === true) {
    return <p>Error: {error.type}</p>;
  }

  if (userData === null || reposData === null || langData === null) {
    return <div>loading...</div>;
  }

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

  document.title = `${username} | GitHub Profile`;

  return (
    <div>
      <div style={{ backgroundColor: "black", color: "white" }}>
        <h1>Name: {name}</h1>
        <img src={avatar_url} alt={`${name}'s avatar`} height={230} />
        <div>
          <a href={profile_url}>@{username}</a>
        </div>
        <p>Followers: {followers}</p>
        <p>Following: {following}</p>
        <p>
          Joined:{" "}
          {new Date(created_at).toLocaleDateString("en-US", {
            month: "long",
            day: "numeric",
            year: "numeric",
          })}
        </p>
        <p>Location: {location}</p>
        <p>Company: {company}</p>
        <p>Repos: {public_repos}</p>
      </div>
      <div style={{ backgroundColor: "black", color: "white" }}>
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
      </div>
    </div>
  );
};

export default Profile;
