import React from "react";
import Home from "./pages/Home";
import Profile from "./pages/Profile";
import { Switch, Route } from "react-router-dom";

function App() {
  return (
    <Switch>
      <Route path="/:username" component={Profile} />
      <Route path="/" component={Home} />
    </Switch>
  );
}

export default App;
