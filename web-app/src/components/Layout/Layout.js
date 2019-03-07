import React, { Component, Fragment } from "react";
import PropTypes from "prop-types";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { compose } from "react-apollo";

import { withStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";
import HomeIcon from "@material-ui/icons/Home";

import AuthModal from "../AuthModal/AuthModal";
import { logout } from "../../redux/actions/AuthActions";

const styles = theme => ({
  root: {
    flexGrow: 1,
    alignItems: "center"
  },
  grow: {
    flexGrow: 1
  },
  menuButton: {
    marginLeft: -12,
    marginRight: 20
  },
  appBar: {
    paddingLeft: theme.spacing.unit * 3,
    paddingRight: theme.spacing.unit * 3
  },
  toolBar: {
    width: "100%",
    maxWidth: 1000,
    margin: "0 auto"
  },
  main: {
    padding: theme.spacing.unit * 3,
    width: "100%",
    maxWidth: 1000,
    margin: "0 auto"
  }
});

class Layout extends Component {
  state = {
    authModalModalOpen: false,
    view: ""
  };

  toggleAuthModal = view => {
    this.setState(prevState => ({
      authModalModalOpen: !prevState.authModalModalOpen,
      view
    }));
  };

  handelLogout = () => {
    this.props.logout();
    this.props.history.push("/");
  };

  render() {
    const { classes, routes, history, userEmail } = this.props;
    const { authModalModalOpen, view } = this.state;

    return (
      <div className={classes.root}>
        <AppBar position="static" className={classes.appBar}>
          <Toolbar className={classes.toolBar}>
            <IconButton
              className={classes.menuButton}
              color="inherit"
              aria-label="Menu"
              onClick={() => {
                history.push("/");
              }}
            >
              <HomeIcon />
            </IconButton>
            <div className={classes.grow} />
            {userEmail ? (
              <Fragment>
                <Button
                  onClick={() => {
                    history.push("/favorites");
                  }}
                  color="inherit"
                >
                  Favorites
                </Button>
                <Button
                  onClick={() => {
                    this.handelLogout();
                  }}
                  color="inherit"
                >
                  Logout
                </Button>
              </Fragment>
            ) : (
              <Fragment>
                <Button
                  onClick={() => {
                    this.toggleAuthModal("login");
                  }}
                  color="inherit"
                >
                  Login
                </Button>
                <Button
                  onClick={() => {
                    this.toggleAuthModal("signup");
                  }}
                  color="inherit"
                >
                  Sign Up
                </Button>
              </Fragment>
            )}
          </Toolbar>
        </AppBar>
        <AuthModal
          open={authModalModalOpen}
          toggle={this.toggleAuthModal}
          view={view}
        />
        <main className={classes.main}>{routes}</main>
      </div>
    );
  }
}

Layout.propTypes = {
  classes: PropTypes.object.isRequired
};

const mapStateToProps = state => {
  return {
    userEmail: state.auth.email
  };
};

export default compose(
  withRouter,
  withStyles(styles, { withTheme: true }),
  connect(
    mapStateToProps,
    { logout }
  )
)(Layout);
