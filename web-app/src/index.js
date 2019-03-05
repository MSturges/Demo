import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { ApolloProvider } from "react-apollo";

import { client } from "./graphql/apollo-client";
import configureStore from "./redux/store";
import Router from "./Router";
import * as serviceWorker from "./serviceWorker";

const { store, persistor } = configureStore();
// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA

serviceWorker.unregister();

const render = () => {
  return ReactDOM.render(
    <ApolloProvider client={client}>
      <Provider store={store}>
        <PersistGate persistor={persistor}>
          <Router />
        </PersistGate>
      </Provider>
    </ApolloProvider>,
    document.getElementById("root")
  );
};

render();

if (module.hot) {
  module.hot.accept("./Router", () => {
    const NextApp = require("./Router").default;
    render(NextApp);
  });
}
