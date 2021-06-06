import React, { useState } from 'react'
import { Layout, Menu } from 'antd';
import { PackageIcon, RepoForkedIcon, TagIcon, RocketIcon, SidebarCollapseIcon, SidebarExpandIcon } from '@primer/octicons-react'
import { Link } from 'react-router-dom'

import './dashboard.css'

const { Header, Sider, Content } = Layout;

const Dashboard = (props) => {

    const [state, setState] = useState(false)

    const toggle = () => {
        setState(!state);
    };


    return (
      <Layout className="h-100 position-relative" style={{zIndex: 20000}}>
        <Sider collapsible collapsed={state} onCollapse={toggle}>
          <Link className="navbar-brand text-center flex-center w-100" to="/">
              <img src="http://localhost:8080/logo_transparent_1.png" className="my-auto" alt=""  width="75" />
          </Link>
          <Menu theme="dark" mode="inline" defaultSelectedKeys={['1']}>
              <Menu.Item key="1" icon={<PackageIcon />}>
                <Link to="/admin/dashboard/products">
                  Produtos
                </Link>
              </Menu.Item>
            <Menu.Item key="2" icon={<RepoForkedIcon />}>
              Categorias
            </Menu.Item>
            <Menu.Item key="4" icon={<TagIcon />}>
              Tags
            </Menu.Item>
            <Menu.Item key="3" icon={<RocketIcon />}>
              Descontos
            </Menu.Item>
          </Menu>
        </Sider>
        <Layout className="site-layout">
          <Content
            className="site-layout-background"
            style={{
              margin: '24px 16px',
              padding: 24,
              minHeight: 700,
            }}
          >
            {props.children}
          </Content>
        </Layout>
      </Layout>
    );
}

export default Dashboard;