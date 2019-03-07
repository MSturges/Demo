import React, { PureComponent, Fragment } from "react";
import { connect } from "react-redux";
import { compose, Query } from "react-apollo";
import PropTypes from "prop-types";

import { withStyles } from "@material-ui/core/styles";
import CircularProgress from "@material-ui/core/CircularProgress";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";

import GET_USER_INFO_QUERY from "../../graphql/queries/get-user-info-query";

const styles = theme => ({
  paper: {
    height: "auto",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 16,
    padding: 8
  }
});

class Favorites extends PureComponent {
  render() {
    const { userId, classes } = this.props;

    if (!userId) {
      return (
        <Paper className={classes.paper}>
          <Typography variant="h4" color="secondary">
            Favorite Cats Wall, you must be logged in to view
          </Typography>
        </Paper>
      );
    }

    return (
      <Query
        query={GET_USER_INFO_QUERY}
        variables={{ userId }}
        pollInterval={500}
      >
        {({ data: { user }, loading }) => {
          if (loading) {
            return (
              <CircularProgress
                className={classes.progress}
                color="secondary"
              />
            );
          }
          return (
            <Fragment>
              <Paper className={classes.paper}>
                <Typography variant="h4" color="secondary">
                  Favorite Cats Wall
                </Typography>
              </Paper>
              <div className="photos-container">
                {user.favoriteCatPics.map(({ url, id }) => (
                  <img className="photo" key={id} src={url} alt={id} />
                ))}
              </div>
            </Fragment>
          );
        }}
      </Query>
    );
  }
}
Favorites.defaultProps = {
  userId: ""
};

Favorites.propTypes = {
  userId: PropTypes.string,
  classes: PropTypes.object.isRequired
};

const mapStateToProps = state => {
  return {
    userId: state.auth.id
  };
};

export default compose(
  withStyles(styles, { withTheme: true }),
  connect(
    mapStateToProps,
    null
  )
)(Favorites);
