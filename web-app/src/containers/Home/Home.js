import React, { PureComponent, Fragment } from "react";
import { connect } from "react-redux";
import { compose, graphql } from "react-apollo";

import axios from "axios";

import { withStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import Card from "@material-ui/core/Card";
import CardMedia from "@material-ui/core/CardMedia";
import CardActions from "@material-ui/core/CardActions";
import FavoriteIcon from "@material-ui/icons/Favorite";
import CircularProgress from "@material-ui/core/CircularProgress";
import IconButton from "@material-ui/core/IconButton";
import Paper from "@material-ui/core/Paper";

import ADD_FAVORITE_MUTATION from "../../graphql/mutations/add-favorite-mutation";
import Notification from "../../components/Notification/Notification";

const styles = {
  paper: {
    height: "auto",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 16,
    padding: 8
  },
  card: {
    height: 400,
    display: "flex",
    alignItems: "center",
    flexDirection: "column"
  },
  media: {
    height: "100%",
    width: 400,
    backgroundRepeat: "no-repeat",
    backgroundSize: "contain"
  },
  buttonWrapper: {
    marginTop: 16,
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center"
  },
  button: {
    background: "linear-gradient(45deg, #3ED3CF 30%, #1FE9AE 90%)"
  }
};
class Home extends PureComponent {
  state = {
    loading: false,
    file: "https://purr.objects-us-east-1.dream.io/i/lddng.jpg",
    showNotification: false
  };
  getRandomImage = () => {
    this.setState({ loading: true });
    axios
      .get("https://aws.random.cat/meow")
      .then(({ data: { file } }) => {
        // handle success
        this.setState({ loading: false, file });
      })
      .catch(error => {
        // handle error
        this.setState({ loading: false });
      });
  };

  handleAddFavorite = () => {
    const { file } = this.state;
    this.props
      .addFavrotie({ url: file })
      .then(({ data }) => {
        this.setState({ showNotification: true });
      })
      .catch(error => {
        console.log("error", error);
      });
  };

  handleCloseNotification = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    this.setState({ showNotification: false });
  };
  render() {
    const { classes, userEmail } = this.props;
    const { loading, file, showNotification } = this.state;
    return (
      <Fragment>
        <Paper className={classes.paper}>
          <Typography variant="h4" color="secondary">
            {userEmail
              ? `Welcome back ${userEmail}`
              : `Welcome to random cat pic generator`}
          </Typography>
        </Paper>

        {loading ? (
          <Card className={classes.card}>
            <CircularProgress className={classes.progress} color="secondary" />
          </Card>
        ) : (
          <Card className={classes.card}>
            <CardMedia
              className={classes.media}
              image={file}
              title="Contemplative Reptile"
            />

            <CardActions className={classes.actions} disableActionSpacing>
              <IconButton
                aria-label="Add to favorites"
                disabled={!userEmail}
                onClick={this.handleAddFavorite}
              >
                <FavoriteIcon />
              </IconButton>
            </CardActions>
          </Card>
        )}
        <div className={classes.buttonWrapper}>
          <Button className={classes.button} onClick={this.getRandomImage}>
            Give me a cat Picture
          </Button>
        </div>
        <Notification
          showNotification={showNotification}
          closeNotification={this.handleCloseNotification}
          message="Added cat to Favorites"
        />
      </Fragment>
    );
  }
}

const mapStateToProps = state => {
  return {
    userEmail: state.auth.email
  };
};

const addFavrotie = graphql(ADD_FAVORITE_MUTATION, {
  props: ({ mutate }) => ({
    addFavrotie: ({ url }) =>
      mutate({
        variables: { url }
      })
  })
});

export default compose(
  addFavrotie,
  withStyles(styles, { withTheme: true }),
  connect(
    mapStateToProps,
    null
  )
)(Home);
