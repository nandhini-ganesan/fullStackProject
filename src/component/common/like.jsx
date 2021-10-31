import React, { Component } from "react";

class Like extends Component {
  render() {
    let like_class = "fa fa-heart";
    if (!this.props.like_value) like_class += "-o"; //based on likevalue, display the heart icon
    return (
      <i
        className={like_class}
        aria-hidden="true"
        onClick={this.props.onClick} //onclick of this icon, calls method in moviestable component
      />
    );
  }
}

export default Like;
