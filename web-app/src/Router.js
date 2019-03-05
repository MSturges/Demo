import React, { PureComponent } from "react";
import { BrowserRouter, Route, Redirect, Switch } from "react-router-dom";
import { asyncComponent } from "react-async-component";

import Layout from "./components/Layout/Layout";

const RandomCatPicture = asyncComponent({
  resolve: () => import("./containers/RandomCatPicture/RandomCatPicture")
});

const FavoriteCatPictures = asyncComponent({
  resolve: () => import("./containers/FavoriteCatPictures/FavoriteCatPictures")
});

const Login = asyncComponent({
  resolve: () => import("./containers/Login/Login")
});

const SignUp = asyncComponent({
  resolve: () => import("./containers/SignUp/SignUp")
});

class Router extends PureComponent {
  render() {
    let routes = (
      <Switch>
        <Route exact path="/" component={RandomCatPicture} />
        <Route exact path="/favorites" component={FavoriteCatPictures} />
        <Route exact path="/login" component={Login} />
        <Route exact path="/sign-up" component={SignUp} />
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
