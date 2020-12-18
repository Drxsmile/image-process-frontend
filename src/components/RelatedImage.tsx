import { Button, Col, Divider, Row } from "antd";
import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import ImageCard from "./ImageCard";

class RelatedImage extends Component<any, any> {
  constructor(props: any) {
    super(props);
    this.state = {
      imageList: [],
      id: this.props.match.params.id,
      filterName: this.props.location.state.filter
    };
  }
  public componentDidMount = () => {
    console.log(987);
    this.getRelatedImages()
      .then(res => res.json())
      .then(data => {
        console.log(data);
        if (this.state.filterName === "origin") {
          this.setState({ imageList: data.getImagesByOriginImage });
        } else {
          this.setState({
            imageList: [data.findImageByFilteredImage]
          });
        }
        console.log(this.state.imageList);
        console.log(134);
      })
      .catch(err => console.log(err));
  };
  public getRelatedImages = async () => {
    const response = await fetch("/api/related", {
      body: JSON.stringify({
        id: this.state.id,
        filterName: this.state.filterName
      }),
      headers: {
        "Content-Type": "application/json"
      },
      method: "POST"
    });
    if (response.status !== 200) {
      throw Error(response.statusText);
    }
    console.log(234);
    console.log(response);
    return response;
  };
  public deleteAll = async () => {
    const response = await fetch("/api/delete", {
      body: JSON.stringify({ id: this.state.id }),
      headers: {
        "Content-Type": "application/json"
      },
      method: "POST"
    })
      .then(res => res.json())
      .then(data => {
        console.log(data);
        this.props.history.push("/home");
      })
      .catch(err => console.log(err));
  };
  public render() {
    const { imageList } = this.state;
    return (
      <div>
        <Button type="primary" onClick={this.deleteAll}>
          Delete all related images
        </Button>
        <Divider />
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

export default withRouter(RelatedImage);
