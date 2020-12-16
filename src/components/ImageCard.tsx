import { Button, Card } from "antd";
import React, { Component } from "react";

const { Meta } = Card;
class ImageCard extends Component<any, any> {
  public render() {
    return (
      <Card
        style={{ width: 300 }}
        cover={
          <img
            alt="example"
            src="https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png"
          />
        }
        actions={[
          <Button type="primary">Update</Button>,
          <Button type="primary">Delete</Button>,
          <Button type="primary">Related</Button>
        ]}
      >
        <Meta title="Card title" description="This is the description" />
      </Card>
    );
  }
}
export default ImageCard;