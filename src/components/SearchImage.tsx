import { Input } from "antd";
import React, { Component } from "react";

export default class SaveImage extends Component<any, any> {
  public render() {
    return (
      <div>
        <h1>search</h1>
        <p>image name : </p>
        <Input placeholder="Enter image name" />
        <p>select an image</p>
      </div>
    );
  }
}
