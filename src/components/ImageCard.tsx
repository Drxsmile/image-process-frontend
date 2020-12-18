import { Button, Card, Col, Row } from "antd";
import React, { Component } from "react";
import { withRouter } from "react-router-dom";

const { Meta } = Card;
class ImageCard extends Component<any, any> {
  constructor(props: any) {
    super(props);
    this.state = { imageList: [] };
  }
  public deleteImage = () => {
    console.log(2209);
  };
  public showRelated = () => {
    const id = this.props.id;
    this.props.history.push({
      pathname: "/related/" + id,
      state: { filter: this.props.filterName }
    });
  };
  public render() {
    return (
      <Card
        size={"small"}
        style={{ width: 300 }}
        cover={
          <img
            alt={this.props.id}
            src={
              "https://images-management.s3-ap-southeast-1.amazonaws.com/" +
              this.props.s3Key
            }
          />
        }
        actions={[
          <Button type="primary">Update</Button>,
          <Button type="primary" onClick={this.deleteImage}>
            Delete
          </Button>,
          <Button type="primary" onClick={this.showRelated}>
            Related
          </Button>
        ]}
      >
        <Meta
          title={this.props.name}
          description={"UploadTime: " + this.props.time}
        />
      </Card>
    );
  }
}
export default withRouter(ImageCard);
