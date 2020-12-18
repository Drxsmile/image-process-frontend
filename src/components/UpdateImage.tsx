import {Button, Card, Col, Divider, Form, Input, Row, Select} from "antd";
import React, { Component } from "react";
import ImageCard from "./ImageCard";

const { Option } = Select;
const layout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 8 }
};
const tailLayout = {
  wrapperCol: { offset: 8, span: 16 }
};
export default class UpdateImage extends Component<any, any> {
  constructor(props: any) {
    super(props);
    this.state = {
      id: this.props.match.params.id,
      name: this.props.match.params.name,
      filterName: "",
      newName: "",
      origin: {},
      filtered: {}
    };
  }
  public newName = (e: any) => {
    this.setState({ newName: e.target.value });
  };
  public filter = (value: string) => {
    this.setState({ filterName: value });
  };
  public update = async () => {
    const response = await fetch("/api/update", {
      body: JSON.stringify({
        filterName: this.state.filterName,
        newName: this.state.newName,
        id: this.state.id,
        name: this.state.name
      }),
      headers: {
        "Content-Type": "application/json"
      },
      method: "POST"
    })
      .then(res => res.json())
      .then(data => {
        console.log(data);
        this.setState({ filtered: data.updateImage });
        this.getOrigin();
      })
      .catch(err => console.log(err));
  };
  public getOrigin = async () => {
    const response = await fetch("/api/origin", {
      body: JSON.stringify({
        id: this.state.id,
        name: this.state.name
      }),
      headers: {
        "Content-Type": "application/json"
      },
      method: "POST"
    })
      .then(res => res.json())
      .then(data => {
        console.log(data);
        this.setState({ origin: data.getImageByPrimaryKey });
      })
      .catch(err => console.log(err));
  };
  public render() {
    return (
      <div>
        <Card>
          <Form {...layout} name="control-hooks">
            <Form.Item
              name="filterName"
              label="Filter Type"
              rules={[{ required: true }]}
            >
              <Select
                placeholder="Select a filter"
                allowClear={true}
                onChange={this.filter}
              >
                <Option value="Grayscale">Grayscale</Option>
                <Option value="MyGray">MyGray</Option>
                <Option value="BlackWhite">BlackWhite</Option>
                <Option value="Film">Film</Option>
              </Select>
            </Form.Item>
            <Form.Item
              label="name"
              name="name"
              rules={[
                {
                  required: true,
                  message: "Please input the name of your image!"
                }
              ]}
            >
              <Input
                placeholder="Please input the name of your image!"
                onChange={this.newName}
              />
            </Form.Item>
            <Form.Item {...tailLayout}>
              <Button type="primary" htmlType="submit" onClick={this.update}>
                Update
              </Button>
            </Form.Item>
          </Form>
        </Card>
        <Divider />
        <Row gutter={16}>
          <Col span={8}>
            <ImageCard
              name={this.state.origin.name}
              time={this.state.origin.time}
              id={this.state.origin.id}
              s3Key={this.state.origin.s3Key}
              filterName={this.state.origin.filterName}
            />
          </Col>
          <Col span={8}>
            <ImageCard
              name={this.state.filtered.name}
              time={this.state.filtered.time}
              id={this.state.filtered.id}
              s3Key={this.state.filtered.s3Key}
              filterName={this.state.filtered.filterName}
            />
          </Col>
        </Row>
      </div>
    );
  }
}
