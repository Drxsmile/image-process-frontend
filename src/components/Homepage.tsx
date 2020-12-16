import { Button, Col, Row } from "antd";
import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import ImageCard from "./ImageCard";

class Homepage extends Component<any, any> {
  constructor(props: any) {
    super(props);
    this.state = {
      imageList: []
    };
  }

  public componentDidMount = () => {
    console.log(333);
    this.getOriginImages()
      .then(data => {
        this.setState({ imageList: data.body });
        console.log(111);
        console.dir(data);
      })
      // tslint:disable-next-line:no-console
      .catch(err => console.log(err));
    console.log(222);
  };
  public getOriginImages = async () => {
    console.log(44);
    const response = await fetch("/images");
    console.dir(response);
    if (response.status !== 200) {
      throw Error(response.statusText);
    }
    console.log(5);
    return response;
  };
  public render() {
    return (
      <div>
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
