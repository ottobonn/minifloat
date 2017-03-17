import React from "react";
import {
  HashRouter as Router,
  Route,
  NavLink,
  Switch,
  Redirect
} from "react-router-dom";

import {floatFactory, Minifloat, Float} from "../Float";
import FloatPage from "./FloatPage";

const Links = () => {
  return (
    <nav className="nav nav-pills">
      <NavLink className="nav-link" activeClassName="active" to="/floats/minifloat">Minifloat</NavLink>
      <NavLink className="nav-link" activeClassName="active" to="/floats/float">IEEE-754 Float</NavLink>
    </nav>
  );
};

export default class App extends React.Component {
  render() {
    return (
      <Router>
        <div>
          <header id="site-header">
            <h1 id="page-title">Float Explorer</h1>
            <Links />
          </header>
          <Switch>
            <Route exact path="/floats/minifloat" component={() => <FloatPage floatClass={Minifloat} />} />
            <Route exact path="/floats/float" component={() => <FloatPage floatClass={Float} />} />
            <Route path="/" render={() => <Redirect to="/floats/minifloat" />} />
            <Route render={() => <h1>Not found</h1>} />
          </Switch>
        </div>
      </Router>
    );
  }
};
