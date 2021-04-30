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
import { createPost, getPost, updatePost, deletePost, getPostsOnKeyword, getFewestStepsPosts, createRecipe } from "../utils/api";

import "../css/feed.scss";

const PostCard = ({ post }) => (
  <Card
    title={`Post ${post.title}`}
    style={{ width: 300, paddingLeft: "1em", paddingRight: "1em" }}
  >
    <img src={post.description} width="200px" />
    <p>Description: {post.picture}</p>
    <p>Account ID: {post.account_id}</p>
  </Card>
);

const ReversePostCard = ({ post }) => (
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
  const [title, setTitle] = useState("");
  const [picture, setPicture] = useState("");
  const [description, setDescription] = useState("");
  const [steps, setSteps] = useState("");
  const [recipe_id, setRecipe] = useState(0);
  const [account_id, setAccount] = useState(0);
  const [requestedPost, setRequestedPost] = useState();

  let history = useHistory();

  const onSubmit = async () => {
    setAccount(0);
    let res1 = await createRecipe(steps);
    setRecipe(res1.result.recipe_id);
    
    let res2 = await createPost(title, picture, description, recipe_id, account_id);

    if (res2) {
      message.success(
        `Successfully created post ${res2.result.post_id}`
      );
      let post = await getPost(res2.result.post_id);
      setRequestedPost(post[0]);
    } else message.error("Failed to create post");

  };

  return (
    <div className="create-post-container">
      <h1>InstaCook</h1>

      <Form onFinish={onSubmit} width="100%" display="inline-block" text-align="center">
        <Form.Item label="Title">
          <Input.TextArea
            rows={1}
            onChange={(e) => setTitle(e.target.value)}
          />
        </Form.Item>
        <Form.Item label="Picture">
          <Input.TextArea
            rows={1}
            onChange={(e) => setDescription(e.target.value)}
          />
        </Form.Item>
        <Form.Item label="Description">
          <Input.TextArea
            rows={2}
            onChange={(e) => setPicture(e.target.value)}
          />
        </Form.Item>
        <Form.Item label="Steps">
          <Input.TextArea
            rows={12}
            onChange={(e) => setSteps(e.target.value)}
          />
        </Form.Item>
        <Form.Item>
          <input type="submit" value="Create Post" />
        </Form.Item>
      </Form>

      {requestedPost && (
        <div>
          <h2>Recipe {requestedPost.post_id}</h2>
          <PostCard post={requestedPost} length={300} />
        </div>
      )}

    </div>
  );
};

export default CreatePost;

