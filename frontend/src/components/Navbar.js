import { Button, Input } from "antd";
import { SearchOutlined, HeartOutlined, UserOutlined, SettingOutlined } from "@ant-design/icons";
import Form from "antd/lib/form/Form";
import React, { useState } from "react";
import { useHistory } from "react-router";

import "../css/navbar.scss";
import { Header } from "antd/lib/layout/layout";

const { Search } = Input;

export default () => {
  const history = useHistory();

  return (
    <Header className="navbar">
      <a className="title-link" href="/newfeed">
        <div className="title">InstaCook</div>
      </a>
      <div className="toolbar">
        <Input className="search-bar" prefix={<SearchOutlined />} />
        <Button className="logo-btn likes-btn" icon={<HeartOutlined />} />
        <Button className="logo-btn account-btn" icon={<UserOutlined />} onClick={() => history.push('/profile')} />
        <Button className="logo-btn settings-btn" icon={<SettingOutlined/>} onClick={() => history.push('/settings')} />
      </div>
    </Header>
  );
};
