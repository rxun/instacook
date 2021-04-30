import React, { useEffect, useState } from "react";
import { Button, Input } from "antd";
import {
  getCommentsByPostId,
  getPost,
  getRecipe,
  getIngredientsByRecipeId,
  createComment,
} from "../utils/api";
import { UserOutlined } from "@ant-design/icons";
import { useParams } from "react-router-dom";
import FeedCard from "../components/FeedCard";

import "../css/postdetails.scss";
import "../css/feedcard.scss";

const Comment = ({ comment }) => (
  <div>
    <div className="user-info">
      <Button className="user-icon" icon={<UserOutlined />} />
      username
    </div>
    {comment.text}
    <br />
    <br />
  </div>
);

const PostDetails = () => {
  const { id } = useParams();
  const [comments, setComments] = useState();
  const [steps, setSteps] = useState();
  const [ingredients, setIngredients] = useState();
  const [post, setPost] = useState();
  const [comment, setComment] = useState();

  useEffect(() => {
    async function fetchData() {
      setComments(await getCommentsByPostId(id));
      const post = await getPost(id);
      setPost(post[0]);
      const recipe = await getRecipe(post[0].recipe_id);
      setSteps(recipe[0].steps);
      setIngredients(await getIngredientsByRecipeId(post[0].recipe_id));
    }

    fetchData();
  }, []);

  const handleCommentPost = async () => {
    console.log(comment);
    const commentInfo = {
      postId: id,
      accountId: 0,
      text: comment,
      date: "1/1/2021",
    };
    await createComment(commentInfo);
    setComments(await getCommentsByPostId(id));
  };

  return (
    <div className="post-details-container">
      {post && (
        <div className="card">
          <FeedCard post={post} />
        </div>
      )}
      <div className="divider" />
      <div className="card-title">Ingredients</div>
      {ingredients &&
        ingredients.map((i) => (
          <div>
            {i.name}
            <br />
          </div>
        ))}
      <div className="divider" />
      <div className="card-title">Steps</div>
      {steps && steps}
      <div className="divider" />
      <div className="card-title">Comments</div>
      {comments && comments.map((c) => <Comment comment={c} />)}
      <br />
      <div className="comment-input">
        <Input
          onChange={(e) => setComment(e.target.value)}
          type="text"
          placeholder="Comment"
        />
        <Button onClick={handleCommentPost}>Post</Button>
      </div>
      <div className="divider" />
    </div>
  );
};

export default PostDetails;
