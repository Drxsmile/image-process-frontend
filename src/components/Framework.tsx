import { HomeOutlined, SaveOutlined, SearchOutlined } from "@ant-design/icons";
import { Layout, Menu } from "antd";
import React from "react";
import { withRouter } from "react-router-dom";

const { Header, Content, Sider } = Layout;

class Framework extends React.Component<any, any> {
  public render() {
    return (
      <Layout>
        <Header
          className="header"
          style={{
            color: "white",
            fontSize: 24
          }}
        >
          <div className="logo">Welcome to Image Process App!</div>
        </Header>
        <Layout>
          <Sider width={200} className="site-layout-background">
            <Menu
              mode="inline"
              // defaultSelectedKeys={["/home"]}
              style={{ height: "100%", borderRight: 0 }}
            >
              <Menu.Item
                key="/home"
                onClick={p => this.props.history.push(p.key)}
              >
                Home
              </Menu.Item>
              <Menu.Item
                key="/save"
                onClick={p => this.props.history.push(p.key)}
              >
                Save Images
              </Menu.Item>
              <Menu.Item
                key="/search"
                onClick={p => this.props.history.push(p.key)}
              >
                Search Images
              </Menu.Item>
            </Menu>
          </Sider>
          <Layout style={{ padding: "0 24px 24px" }}>
            <Content
              className="site-layout-background"
              style={{
                padding: 24,
                // tslint:disable-next-line:object-literal-sort-keys
                margin: 0,
                minHeight: 280
              }}
            >
              {this.props.children}
            </Content>
          </Layout>
        </Layout>
      </Layout>
    );
  }
}

export default withRouter(Framework);
