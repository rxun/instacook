import { Button, Input } from "antd";
import { SearchOutlined, HeartOutlined, UserOutlined, SettingOutlined } from "@ant-design/icons";
import Form from "antd/lib/form/Form";
import React, { useState } from "react";
import { useHistory } from "react-router";

import "../css/navbar.scss";
import { Header } from "antd/lib/layout/layout";

const { Search } = Input;

export default () => {
  let history = useHistory();

  return (
    <Header className="navbar">
      <a className="title-link" href="/newfeed">
        <div className="title">InstaCook</div>
      </a>
      <div className="toolbar">
        <Input className="search-bar" prefix={<SearchOutlined />} />
        <Button className="likes-btn" icon={<HeartOutlined />} />
        <Button className="account-btn" icon={<UserOutlined />} />
        <Button className="settings-btn" icon={<SettingOutlined/>} />
      </div>
    </Header>
  );
};
