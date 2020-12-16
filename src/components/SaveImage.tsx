import { Button, Card, Form, Input, message, Upload } from "antd";
import { FormInstance } from "antd/lib/form";
import React, { Component } from "react";
import { withRouter } from "react-router-dom";

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
  public formRef = React.createRef<FormInstance>();
  public formData = new FormData();
  constructor(props: any) {
    super(props);
    this.state = { value: "" };
    this.handleSubmit = this.handleSubmit.bind(this);
  }
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
    return isLegal && isLt200M;
  };
  public handleSubmit = async (e: any) => {
    e.preventDefault();
    // this.formData.append("name", this.formRef.current.getFieldsValue("name"));
    this.formData.append("image", e.fileList);
    await fetch("/api/save", {
      body: this.formData,
      headers: {
        "Content-Type": "multipart/form-data"
      },
      method: "POST"
    })
      .then(response => response.json())
      .catch(error => console.error("Error:", error))
      .then(response => console.log("Success:", response));
  };
  public onFinish = (values: any) => {
    console.log("Received values of form: ", values);
  };
  public render() {
    return (
      <Card title="save an origin image">
        <Form {...layout} onFinish={this.handleSubmit} name="saveImage">
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
            <Input placeholder="Please input the name of your image!" />
          </Form.Item>
          <Form.Item
            name="upload"
            label="image"
            valuePropName="fileList"
            // getValueFromEvent={normFile}
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
              beforeUpload={this.beforeUpload}
            >
              <Button>+ Click to upload image</Button>
            </Upload>
          </Form.Item>
          <Form.Item {...tailLayout}>
            <Button type="primary" htmlType="submit">
              Save
            </Button>
          </Form.Item>
        </Form>
      </Card>
    );
  }
}
export default withRouter(SaveImage);
