import React, { PureComponent } from "react";
import { BrowserRouter, Route, Redirect, Switch } from "react-router-dom";
import { asyncComponent } from "react-async-component";

import Layout from "./components/Layout/Layout";

const Home = asyncComponent({
  resolve: () => import("./containers/Home/Home")
});

const Favorites = asyncComponent({
  resolve: () => import("./containers/Favorites/Favorites")
});

class Router extends PureComponent {
  render() {
    let routes = (
      <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/favorites" component={Favorites} />
        <Redirect from="*" to="/" />
      </Switch>
    );

    return (
      <React.Fragment>
        <BrowserRouter>
          <Layout routes={routes} />
        </BrowserRouter>
      </React.Fragment>
    );
  }
}

export default Router;
