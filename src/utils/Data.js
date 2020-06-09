import GhPolyglot from "gh-polyglot";

const baseUrl = "https://api.github.com/users/";

export const getUserData = (username, successCallback, errorCallback) => {
  const url = baseUrl + username;
  getData(url, successCallback, errorCallback);
};

export const getReposData = (username, successCallback, errorCallback) => {
  const url = baseUrl + username + "/repos?per_page=100";
  getData(url, successCallback, errorCallback);
};

const getData = (url, successCallback, errorCallback) => {
  fetch(url)
    .then((res) => {
      if (res.status !== 200) {
        return errorCallback(res.status, res.statusText);
      }
      return res.json();
    })
    .then((json) => {
      if (json === undefined) return;
      successCallback(json);
    })
    .catch((err) => {
      console.error("ERROR: ", err);
      errorCallback(404, err);
    });
};

export const getLangData = (username, successCallback, errorCallback) => {
  const me = new GhPolyglot(username);
  me.userStats((err, stats) => {
    if (err) {
      return errorCallback(404, err);
    }
    successCallback(stats);
  });
};
