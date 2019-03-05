import React from "react";
import { withRouter } from "react-router-dom";

class ResponsiveDrawer extends React.Component {
  render() {
    return (
      <div>
        <nav>Navigation</nav>
        <main>{this.props.routes}</main>
      </div>
    );
  }
}

export default withRouter(ResponsiveDrawer);
