import { Button, Result } from "antd";
import React, { Component } from "react";
import { withRouter } from "react-router-dom";

class ErrorPage extends Component<any, any> {
  public home = () => {
    this.props.history.push("/");
  };
  public deleteAll = () => {
    const id = this.props.match.params.id;
    const name = this.props.match.params.name;
    this.props.history.push({
      pathname: "/related/" + id + "/" + name,
      state: { filter: "origin" }
    });
  };
  public render() {
    return (
      <div>
        <Result
          status="warning"
          title="Sorry, you can't delete origin image only"
          subTitle="You can delete all related images or cancel delete"
          extra={[
            <Button type="primary" key="cancel" onClick={this.home}>
              Cancel
            </Button>,
            <Button key="delete" onClick={this.deleteAll}>
              Delete all related
            </Button>
          ]}
        />
      </div>
    );
  }
}
export default withRouter(ErrorPage);
