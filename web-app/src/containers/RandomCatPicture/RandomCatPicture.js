import React, { PureComponent } from "react";
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

import ADD_FAVORITE_MUTATION from "../../graphql/mutations/add-favorite-mutation";

const styles = {
  content: {
    flexGrow: 1,
    padding: 16,
    minHeight: 500,
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    flexDirection: "column"
  },
  card: {
    height: 400,
    display: "flex",
    alignItems: "flex-start",
    flexDirection: "column"
  },
  media: {
    height: "100%",
    width: 400,
    backgroundRepeat: "no-repeat",
    backgroundSize: "contain"
  },
  buttonWrapper: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center"
  },
  button: {
    background: "linear-gradient(45deg, #3ED3CF 30%, #1FE9AE 90%)"
  }
};
class RandomCatPicture extends PureComponent {
  state = {
    loading: false,
    file: "https://purr.objects-us-east-1.dream.io/i/lddng.jpg"
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
        console.log("data", data);
      })
      .catch(error => {
        console.log("error", error);
      });
  };
  render() {
    const { classes, userEmail } = this.props;
    const { loading, file } = this.state;
    return (
      <div className={classes.content}>
        <Typography variant="subtitle1" color="secondary">
          {userEmail
            ? `Welcome back ${userEmail}!`
            : `Welcome to randam cat pic generator! Login to save cats to favorites`}
        </Typography>

        {loading ? (
          <CircularProgress className={classes.progress} color="secondary" />
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

        <Button className={classes.button} onClick={this.getRandomImage}>
          Give me a cat Picture
        </Button>
      </div>
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
)(RandomCatPicture);
