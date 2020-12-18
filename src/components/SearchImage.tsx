import { Button, Card, Col, Form, Row, Select } from "antd";
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

export default class SearchImage extends Component<any, any> {
  constructor(props: any) {
    super(props);
    this.state = {
      filterName: "",
      imageList: []
    };
  }
  public changeName = (value: string) => {
    this.setState({ filterName: value });
  };
  public search = async (e: any) => {
    e.preventDefault();
    const response = await fetch("/api/filterType", {
      body: JSON.stringify({ filterName: this.state.filterName }),
      headers: {
        "Content-Type": "application/json"
      },
      method: "POST"
    })
      .then(res => res.json())
      .then(data => {
        this.setState({ imageList: data.findImagesByFilterType });
        console.log(data);
      })
      .catch(err => console.log(err));
  };
  public render() {
    const { imageList } = this.state;
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
                onChange={this.changeName}
              >
                <Option value="Grayscale">Grayscale</Option>
                <Option value="MyGray">MyGray</Option>
                <Option value="BlackWhite">BlackWhite</Option>
                <Option value="Film">Film</Option>
              </Select>
            </Form.Item>
            <Form.Item {...tailLayout}>
              <Button type="primary" htmlType="submit" onClick={this.search}>
                Search
              </Button>
            </Form.Item>
          </Form>
        </Card>
        {imageList.length > 0 ? (
          <div>
            <h1>search result of {this.state.filterName} as following:</h1>
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
        ) : this.state.filterName.length > 0 ? (
          <h1>search result of {this.state.filterName} as following:</h1>
        ) : (
          <h1>search result will be here</h1>
        )}
      </div>
    );
  }
}
