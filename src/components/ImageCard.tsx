import { Button, Card, Result } from "antd";
import React, { Component } from "react";
import { withRouter } from "react-router-dom";

const { Meta } = Card;
class ImageCard extends Component<any, any> {
  constructor(props: any) {
    super(props);
    this.state = { imageList: [] };
  }
  public deleteImage = async () => {
    console.log(2209);
    console.log(this.props.filterName === "origin");
    if (this.props.fileterName === "origin") {
      console.log(4443);
      const id = this.props.id;
      const name = this.props.name;
      this.props.history.push({
        pathname: "/error/" + id + "/" + name
      });
    } else {
      const response = await fetch("/api/del", {
        body: JSON.stringify({ id: this.props.id, name: this.props.name }),
        headers: {
          "Content-Type": "application/json"
        },
        method: "POST"
      })
        .then(res => res.json())
        .then(data => {
          console.log(data);
          this.props.history.push("/");
        })
        .catch(err => console.log(err));
    }
  };
  public showRelated = () => {
    const id = this.props.id;
    const name = this.props.name;
    this.props.history.push({
      pathname: "/related/" + id + "/" + name,
      state: { filter: this.props.filterName }
    });
  };
  public update = () => {
    const id = this.props.id;
    const name = this.props.name;
    this.props.history.push({
      pathname: "/update/" + id + "/" + name
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
          <Button type="primary" onClick={this.update}>
            Update
          </Button>,
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
