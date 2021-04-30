import { Button, Input } from "antd";
import {
  SearchOutlined,
  HeartOutlined,
  UserOutlined,
  FormOutlined,
  SettingOutlined,
} from "@ant-design/icons";
import Form from "antd/lib/form/Form";
import React, { useState } from "react";
import { useHistory } from "react-router";

import "../css/navbar.scss";
import { Header } from "antd/lib/layout/layout";
import { useAuth } from "../utils/useAuth";

const { Search } = Input;

export default () => {
  const history = useHistory();
  const { user } = useAuth();

  return (
    <Header className="navbar">
      <a className="title-link" href="/newfeed">
        <div className="title">InstaCook</div>
      </a>
      <div className="toolbar">
        <Button
          className="logo-btn search-btn"
          icon={<SearchOutlined />}
          onClick={() => history.push("/search")}
        />
        <Button
          className="logo-btn likes-btn"
          icon={<HeartOutlined />}
          onClick={() => history.push("/liked-posts")}
        />
        <Button
          className="logo-btn account-btn"
          icon={<UserOutlined />}
          onClick={() => {
            if (!user) {
              history.push("/login");
            } else {
              history.push("/profile");
            }
          }}
        />
        <Button
          className="logo-btn account-btn"
          icon={<FormOutlined />}
          onClick={() => history.push("/createpost")
          }
        />
        <Button
          className="logo-btn settings-btn"
          icon={<SettingOutlined />}
          onClick={() => history.push("/settings")}
        />
      </div>
    </Header>
  );
};
