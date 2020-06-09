import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { getUserData } from "../utils/Data";

const Home = () => {
  document.title = "GitHub Profile";

  const [username, setUsername] = useState("");
  const [error, setError] = useState({ active: false, type: 200, text: "OK" });
  const changeHandler = (e) => setUsername(e.target.value);

  const history = useHistory();

  return (
    <div>
      <form
        onSubmit={(e) => {
          e.preventDefault();

          getUserData(
            username,
            () => history.push(`/${username}`),
            (type, text) => setError({ active: true, type, text })
          );
        }}
      >
        <label htmlFor="username">Find a profile</label>
        <input
          type="text"
          name="username"
          id="username"
          onChange={changeHandler}
          onInput={() => setError({ active: false })}
        />
        {error.active && <p>{username + " " + error.text.toLowerCase()}.</p>}
      </form>
    </div>
  );
};

export default Home;
