import React, { useEffect, useState } from "react";
import { Button, Input } from "antd";
import {
  getCommentsByPostId,
  getPost,
  getRecipe,
  getIngredientsByRecipeId,
  createComment,
  getUserById,
  deleteComment,
  updateComment,
} from "../utils/api";
import { UserOutlined, DeleteOutlined, EditOutlined } from "@ant-design/icons";
import { useParams } from "react-router-dom";
import FeedCard from "../components/FeedCard";
import { useAuth } from "../utils/useAuth";

import "../css/postdetails.scss";
import "../css/feedcard.scss";

const PostDetails = () => {
  const { id } = useParams();
  const { user } = useAuth();

  const [comments, setComments] = useState();
  const [steps, setSteps] = useState();
  const [ingredients, setIngredients] = useState();
  const [post, setPost] = useState();
  const [comment, setComment] = useState();
  const [editCommentId, setEditCommentId] = useState(-1);
  const [editComment, setEditComment] = useState();

  const Comment = ({ comment }) => {
    const [username, setUsername] = useState();

    useEffect(() => {
      async function getUsername() {
        const user = await getUserById(comment.account_id);
        setUsername(user.username);
      }

      getUsername();
    }, []);

    const handleEditComment = () => {
      setEditCommentId(comment.comment_id);
      setEditComment(comment.text);
    };

    const handleDeleteComment = async () => {
      await deleteComment({ commentId: comment.comment_id });
      setComments(await getCommentsByPostId(id));
    };

    return (
      <div>
        <div className="header">
          <div className="user-info">
            <Button className="user-icon" icon={<UserOutlined />} />
            {username}
          </div>
          {username === user.username && (
            <div className="edit-comment-icons">
              <Button
                onClick={handleEditComment}
                className="user-icon"
                icon={<EditOutlined />}
              />
              <Button
                onClick={handleDeleteComment}
                className="user-icon"
                icon={<DeleteOutlined />}
              />
            </div>
          )}
        </div>
        {comment.text}
        <br />
        <br />
      </div>
    );
  };

  useEffect(() => {
    async function fetchData() {
      setComments(await getCommentsByPostId(id));
      const post = await getPost(id);
      setPost(post[0]);
      const recipe = await getRecipe(post[0].recipe_id);
      setSteps(recipe.steps);
      setIngredients(await getIngredientsByRecipeId(post[0].recipe_id));
    }

    fetchData();
  }, []);

  const handleCommentPost = async () => {
    const commentInfo = {
      postId: id,
      accountId: user.account_id,
      text: comment,
      date: new Date(),
    };
    await createComment(commentInfo);
    setComments(await getCommentsByPostId(id));
  };

  const handleCommentEdit = async () => {
    await updateComment({ commentId: editCommentId, text: editComment });
    setComments(await getCommentsByPostId(id));
    setEditCommentId(-1);
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
        <Button onClick={handleCommentPost}>Post Comment</Button>
      </div>
      <br />
      {editCommentId !== -1 && (
        <div className="comment-input">
          <Input
            onChange={(e) => setEditComment(e.target.value)}
            type="text"
            value={editComment}
          />
          <Button onClick={handleCommentEdit}>Edit Comment</Button>
        </div>
      )}
      <div className="divider" />
    </div>
  );
};

export default PostDetails;
