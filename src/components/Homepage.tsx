import { Col, Row } from "antd";
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
    this.getOriginImages()
      .then(res => res.json())
      .then(data => {
        this.setState({ imageList: data.findImagesByFilterType });
        console.log(111);
        console.log(data);
      })
      // tslint:disable-next-line:no-console
      .catch(err => console.log(err));
  };
  public getOriginImages = async () => {
    const response = await fetch("/api/images");
    if (response.status !== 200) {
      throw Error(response.statusText);
    }
    return response;
  };
  public render() {
    const { imageList } = this.state;
    return (
      <div>
        <Row gutter={16}>
          {imageList.map((element: any, index: number) => {
            return (
              <Col span={8} key={index}>
                <ImageCard
                  name={element.name}
                  time={element.time}
                  id={element.id}
                  s3Key={element.s3Key}
                  filterName={element.filterName}
                />
              </Col>
            );
          })}
        </Row>
      </div>
    );
  }
}

export default withRouter(Homepage);
