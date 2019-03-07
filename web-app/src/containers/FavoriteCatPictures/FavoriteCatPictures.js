import React, { PureComponent } from "react";
import Typography from "@material-ui/core/Typography";
import { connect } from "react-redux";
import { compose, Query } from "react-apollo";
import PropTypes from "prop-types";

import { withStyles } from "@material-ui/core/styles";
import CircularProgress from "@material-ui/core/CircularProgress";
import CardMedia from "@material-ui/core/CardMedia";
import GridList from "@material-ui/core/GridList";
import GridListTile from "@material-ui/core/GridListTile";

import GET_USER_INFO_QUERY from "../../graphql/queries/get-user-info-query";

const styles = theme => ({
  media: {
    height: "100%",
    width: 400,
    backgroundRepeat: "no-repeat",
    backgroundSize: "contain"
  }
});

class FavoriteCatPictures extends PureComponent {
  render() {
    const { userId, classes } = this.props;

    if (!userId) {
      return (
        <Typography variant="h3" color="secondary">
          Nothing to see here, u most be logged in.
        </Typography>
      );
    }

    return (
      <Query query={GET_USER_INFO_QUERY} variables={{ userId }}>
        {({ data: { user }, loading }) => {
          if (loading) {
            return (
              <CircularProgress
                className={classes.progress}
                color="secondary"
              />
            );
          }

          console.log("data", user);
          return (
            <React.Fragment>
              <GridList cellHeight={160} className={classes.gridList} cols={3}>
                {user.favoriteCatPics.map(({ url, id }) => (
                  <GridListTile key={id} cols={1}>
                    <CardMedia
                      className={classes.media}
                      image={url}
                      title="Contemplative Reptile"
                    />
                  </GridListTile>
                ))}
              </GridList>
            </React.Fragment>
          );
        }}
      </Query>
    );
  }
}
FavoriteCatPictures.defaultProps = {
  userId: ""
};

FavoriteCatPictures.propTypes = {
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
)(FavoriteCatPictures);
