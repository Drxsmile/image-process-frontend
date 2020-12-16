import { Col, Row } from "antd";
import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import ImageCard from "./ImageCard";

class Homepage extends Component<any, any> {
  constructor(props: any) {
    super(props);
    this.state = {
      post: "",
      response: "",
      responseToPost: ""
    };
  }
  public componentDidMount() {
    this.getOriginImages()
      .then(res => this.setState({ response: res.express }))
      // tslint:disable-next-line:no-console
      .catch(err => console.log(err));
  }
  public getOriginImages = async () => {
    const response = await fetch("/images");
    const body = await response.json();
    if (response.status !== 200) {
      throw Error(body.message);
    }
    return body;
  };
  public render() {
    return (
      <div>
        {this.state.response}
        <Row gutter={16}>
          <Col span={8}>
            <ImageCard />
          </Col>
        </Row>
      </div>
    );
  }
}

export default withRouter(Homepage);
