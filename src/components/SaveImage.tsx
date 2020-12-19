import {
  Button,
  Card,
  Col,
  Divider,
  Form,
  Input,
  message,
  Row,
  Upload
} from "antd";
// import { FormInstance } from "antd/lib/form";
import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import ImageCard from "./ImageCard";

const layout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 8 }
};
const tailLayout = {
  wrapperCol: { offset: 8, span: 16 }
};
const normFile = (e: any) => {
  console.log("Upload event:", e);
  if (Array.isArray(e)) {
    return e;
  }
  return e && e.fileList;
};

class SaveImage extends Component<any, any> {
  // public formRef = React.createRef<FormInstance>();
  constructor(props: any) {
    super(props);
    this.state = { name: "", isShow: false, origin: {}, image: {} };
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  public changeName = (e: any) => {
    this.setState({ name: e.target.value });
  };
  public changeImage = (e: any) => {
    this.setState({ image: e.file });
  };
  public beforeUpload = (file: any) => {
    const isLegal =
      file.type === "image/jpeg" ||
      file.type === "image/png" ||
      file.type === "image/jpg" ||
      file.type === "image/bmp";
    if (!isLegal) {
      message.error("You can only upload JPG/PNG file!");
    }
    const isLt200M = file.size / 1024 / 1024 < 200;
    if (!isLt200M) {
      message.error("Image must smaller than 200MB!");
    }
    // return isLegal && isLt200M;
    return false;
  };
  public handleSubmit = async (e: any) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("name", this.state.name);
    formData.append("image", this.state.image);
    console.dir(formData);
    console.log(formData.get("name"));
    console.log(formData.get("image"));
    await fetch("/api/save", {
      body: formData,
      // headers: {
      //   "Content-Type": "multipart/form-data"
      // },
      method: "POST"
    })
      .then(response => response.json())
      .then(data => {
        console.log(data);
        this.setState({ origin: data.saveOriginImage });
        this.setState({ isShow: true });
      })
      .catch(error => console.error("Error:", error));
  };
  public onFinish = (values: any) => {
    console.log("Received values of form: ", values);
  };
  public render() {
    return (
      <div>
        <Card title="save an origin image">
          <Form {...layout} onFinish={this.onFinish} name="saveImage">
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
                onChange={this.changeName}
              />
            </Form.Item>
            <Form.Item
              name="upload"
              label="image"
              valuePropName="fileList"
              getValueFromEvent={normFile}
              rules={[
                {
                  required: true,
                  message: "Please upload your image!"
                }
              ]}
            >
              <Upload
                name="logo"
                listType="picture"
                onChange={this.changeImage}
                beforeUpload={this.beforeUpload}
              >
                <Button>+ Click to upload image</Button>
              </Upload>
            </Form.Item>
            <Form.Item {...tailLayout}>
              <Button
                type="primary"
                htmlType="submit"
                onClick={this.handleSubmit}
              >
                Save
              </Button>
            </Form.Item>
          </Form>
        </Card>
        {this.state.isShow ? (
          <div>
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
            </Row>
          </div>
        ) : (
          <div>waiting for save...</div>
        )}
      </div>
    );
  }
}
export default withRouter(SaveImage);
