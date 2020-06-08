import React, { useState } from "react";
import { useHistory } from "react-router-dom";

const Home = () => {
  const [username, setUsername] = useState("");
  const changeHandler = (e) => setUsername(e.target.value);

  const history = useHistory();

  return (
    <div>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          history.push(`/${username}`);
        }}
      >
        <label htmlFor="username">Find a profile</label>
        <input
          type="text"
          name="username"
          id="username"
          onChange={changeHandler}
        />
      </form>
    </div>
  );
};

export default Home;
