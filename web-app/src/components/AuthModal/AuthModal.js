import React, { Component } from "react";
import PropTypes from "prop-types";
import { graphql, compose } from "react-apollo";
import { connect } from "react-redux";

import { withStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import Slide from "@material-ui/core/Slide";
import Input from "@material-ui/core/Input";
import InputLabel from "@material-ui/core/InputLabel";
import FormControl from "@material-ui/core/FormControl";
import CloseIcon from "@material-ui/icons/Close";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";

import SIGNUP_MUTATION from "../../graphql/mutations/signup-mutation";
import LOGIN_MUTATION from "../../graphql/mutations/login-mutation";
import { setCurrentUser } from "../../redux/actions/AuthActions";

const styles = () => ({
  root: {},
  scrollPaper: {
    alignItems: "flex-start",
    paddingTop: 50
  },
  dialogTitle: {
    justifyContent: "space-between",
    alignItems: "center",
    display: "flex",
    flexDirection: "row"
  },
  paper: {
    backgroundColor: "white"
  },
  button: {
    background: "linear-gradient(45deg, #3ED3CF 30%, #1FE9AE 90%)",
    marginRight: 20,
    marginLeft: 20,
    marginBottom: 16
  }
});

const Transition = props => {
  return <Slide direction="up" {...props} />;
};

class AuthModal extends Component {
  state = {
    email: "",
    password: ""
  };

  signup = () => {
    this.setState({
      loading: true
    });
    const { email, password } = this.state;
    const { toggle, setCurrentUser } = this.props;

    this.props
      .signup({ email, password })
      .then(({ data: { signup: user } }) => {
        setCurrentUser({ email: user.email, jwt: user.jwt, id: user.id });
        toggle("");
      })
      .catch(error => {
        console.log("error", error);
      });
  };

  login = () => {
    this.setState({
      loading: true
    });
    const { email, password } = this.state;
    const { toggle, setCurrentUser } = this.props;
    this.props
      .login({ email, password })
      .then(({ data: { login: user } }) => {
        setCurrentUser({ email: user.email, jwt: user.jwt, id: user.id });
        toggle("");
      })
      .catch(error => {
        console.log("error", error);
      });
  };

  render() {
    const { open, toggle, classes, view } = this.props;
    const { email, password } = this.state;

    return (
      <Dialog
        open={open}
        onClose={() => toggle("")}
        aria-labelledby="form-dialog-title"
        TransitionComponent={Transition}
        classes={{
          root: classes.root,
          scrollPaper: classes.scrollPaper,
          paperWidthSm: classes.paperWidthSm,
          paper: classes.paper
        }}
      >
        <DialogTitle id="form-dialog-title">
          <div className={classes.dialogTitle}>
            <Typography variant="h5" align="center">
              {view === "signup" ? "Sign Up" : "Login"}
            </Typography>
            <IconButton
              aria-label="Close"
              className={classes.closeButton}
              onClick={() => toggle("")}
            >
              <CloseIcon />
            </IconButton>
          </div>
        </DialogTitle>
        <DialogContent>
          <FormControl className={classes.margin} fullWidth margin="dense">
            <InputLabel htmlFor="input-with-icon-adornment">Email</InputLabel>
            <Input
              id="email"
              autoFocus
              value={email}
              onChange={event => this.setState({ email: event.target.value })}
            />
          </FormControl>
          <FormControl fullWidth margin="dense">
            <InputLabel htmlFor="input-with-icon-adornment">
              Password
            </InputLabel>
            <Input
              id="password"
              type="password"
              value={password}
              onChange={event =>
                this.setState({ password: event.target.value })
              }
            />
          </FormControl>
        </DialogContent>
        <DialogActions>
          <Button
            className={classes.button}
            fullWidth
            margin="dense"
            onClick={this[view]}
          >
            {view === "signup" ? "Sign Up" : "Login"}
          </Button>
        </DialogActions>
      </Dialog>
    );
  }
}

const submitSignup = graphql(SIGNUP_MUTATION, {
  props: ({ mutate }) => ({
    signup: ({ email, password }) =>
      mutate({
        variables: { email, password }
      })
  })
});

const submitLogin = graphql(LOGIN_MUTATION, {
  props: ({ mutate }) => ({
    login: ({ email, password }) =>
      mutate({
        variables: { email, password }
      })
  })
});

AuthModal.propTypes = {
  open: PropTypes.bool.isRequired,
  toggle: PropTypes.func.isRequired,
  view: PropTypes.string.isRequired
};

export default compose(
  withStyles(styles, { withTheme: true }),
  connect(
    null,
    { setCurrentUser }
  ),
  submitSignup,
  submitLogin
)(AuthModal);
