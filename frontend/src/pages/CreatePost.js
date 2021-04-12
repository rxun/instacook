import React, { useState } from "react";
import { useHistory } from "react-router";
import {
  Form,
  Input,
  Button,
  Checkbox,
  Card,
  Space,
  Radio,
  message,
} from "antd";
import { createPost, getPost, updatePost, deletePost, getPostsOnKeyword, getFewestStepsPosts } from "../utils/api";

import "../css/feed.scss";

const CRUD_OPTIONS = {
  CREATE: 1,
  READ: 2,
  UPDATE: 3,
  DELETE: 4,
};

const PostCard = ({ post }) => (
  <Card
    title={`Post ${post.title}`}
    style={{ width: 300, paddingLeft: "1em", paddingRight: "1em" }}
  >
    <img src={post.description} />
    <p>Description: {post.picture}</p>
    <p>Account ID: {post.account_id}</p>
    <p>Post Length: {post.stepsLength}</p>
  </Card>
);

const CreatePost = () => {
  const [postId, setPostId] = useState("");
  const [title, setTitle] = useState("");
  const [picture, setPicture] = useState("");
  const [description, setDescription] = useState("");
  const [account_id, setAccount] = useState("");
  const [crudOption, setCrudOption] = useState(CRUD_OPTIONS.CREATE);
  const [requestedPost, setRequestedPost] = useState();
  const [searchText, setSearchText] = useState("");
  const [findText, setFindText] = useState("");
  const [fewestStepsPosts, setFewestStepsPosts] = useState([]);
  const [keywordPosts, setKeywordPosts] = useState([]);

  let history = useHistory();

  const onCRUDSubmit = async () => {
    let res;

    switch (crudOption) {
      case CRUD_OPTIONS.CREATE:
        res = await createPost(title, picture, description, account_id);
        console.log(res);

        if (res)
          message.success(
            `Successfully created recipe ${res.result.post_id}`
          );
        else message.error("Failed to create recipe");

        break;
      case CRUD_OPTIONS.READ:
        res = await getPost(postId);

        if (res) {
          setRequestedPost(res[0]);
          console.log(res[0]);
        } else message.error(`Failed to read post ${postId}`);

        break;
      case CRUD_OPTIONS.UPDATE:
        console.log(postId, title, picture, description);
        res = await updatePost(postId, title, picture, description);

        if (res && res.success)
          message.success(`Successfully updated post ${postId}`);
        else message.error(`Failed to update post ${postId}`);

        break;
      case CRUD_OPTIONS.DELETE:
        res = await deletePost(postId);

        if (res && res.success)
          message.success(`Successfully deleted post ${postId}`);
        else message.error(`Failed to delete post ${postId}`);

        break;
      default:
        break;
    }
  };

  const onSearch = async () => {
    const res = await getPostsOnKeyword(searchText);
    console.log(res)

    if (!res)
      message.error(`Failed to find any posts that matched "${searchText}"`);

    setKeywordPosts(res ? res : []);
    // console.log(keywordPosts);
  };

  const onFind = async () => {
    const res = await getFewestStepsPosts(findText);
    console.log(res)

    if (!res)
      message.error(`Failed to find any posts`);

    setFewestStepsPosts(res ? res : []);
  };

  return (
    <div className="create-post-container">
      <h1>InstaCook</h1>

      <Form onFinish={onCRUDSubmit}>
        <Form.Item label="Post ID">
          <Input
            rows={2}
            placeholder="0"
            disabled={crudOption === CRUD_OPTIONS.CREATE}
            onChange={(e) => setPostId(e.target.value)}
          />
        </Form.Item>
        <Form.Item label="Title">
          <Input.TextArea
            rows={1}
            disabled={
              crudOption === CRUD_OPTIONS.DELETE ||
              crudOption === CRUD_OPTIONS.READ
            }
            onChange={(e) => setTitle(e.target.value)}
          />
        </Form.Item>
        <Form.Item label="Picture">
          <Input.TextArea
            rows={1}
            disabled={
              crudOption === CRUD_OPTIONS.DELETE ||
              crudOption === CRUD_OPTIONS.READ
            }
            onChange={(e) => setPicture(e.target.value)}
          />
        </Form.Item>
        <Form.Item label="Description">
          <Input.TextArea
            rows={2}
            disabled={
              crudOption === CRUD_OPTIONS.DELETE ||
              crudOption === CRUD_OPTIONS.READ
            }
            onChange={(e) => setDescription(e.target.value)}
          />
        </Form.Item>
        <Form.Item label="Account ID">
          <Input.TextArea
            rows={2}
            disabled={
              crudOption === CRUD_OPTIONS.DELETE
            }
            onChange={(e) => setAccount(e.target.value)}
          />
        </Form.Item>
        <Form.Item>
          <input type="submit" value="Run Action" />
        </Form.Item>
      </Form>

      <Radio.Group
          defaultValue={CRUD_OPTIONS.CREATE}
          onChange={(e) => setCrudOption(e.target.value)}
        >
          <Radio value={CRUD_OPTIONS.CREATE}>Create</Radio>
          <Radio value={CRUD_OPTIONS.READ}>Read</Radio>
          <Radio value={CRUD_OPTIONS.UPDATE}>Update</Radio>
          <Radio value={CRUD_OPTIONS.DELETE}>Delete</Radio>
      </Radio.Group>

      {requestedPost && (
        <div>
          <h2>Recipe {requestedPost.post_id}</h2>
          <PostCard post={requestedPost} length={300} />
        </div>
      )}

      <h2>Keyword Search</h2>
      <Form onFinish={onSearch}>
        <div style={{ display: "flex" }}>
          <Form.Item>
            <Input
              rows={2}
              placeholder="Search keyword"
              onChange={(e) => setSearchText(e.target.value)}
            />
          </Form.Item>
          <Form.Item>
            <input type="submit" value="Search" />
          </Form.Item>
        </div>
      </Form>

      {keywordPosts && keywordPosts.length > 0 && (
        <div>
          <h2>Post List</h2>
          <div>
            {keywordPosts && keywordPosts.map((post) => <PostCard post={post} />)}
          </div>
        </div>
      )}

      <h2>Fewest Steps Posts</h2>
      <Form onFinish={onFind}>
        <div style={{ display: "flex" }}>
          <Form.Item>
            <input type="submit" value="Find" />
          </Form.Item>
        </div>
      </Form>

      {fewestStepsPosts && fewestStepsPosts.length > 0 && (
        <div>
          <h2>Post List</h2>
          <div>
            {fewestStepsPosts && fewestStepsPosts.map((post) => <PostCard post={post} />)}
          </div>
        </div>
      )}

    </div>
  );
};

export default CreatePost;

