import React, { useState, useEffect } from "react";
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

import "../css/login.scss";
import "../css/createcomment.scss";
import {
  createComment,
  getComment,
  searchComment,
  updateComment,
  deleteComment,
} from "../utils/api";

const CRUD_OPTIONS = {
  CREATE: 1,
  READ: 2,
  UPDATE: 3,
  DELETE: 4,
};

const CommentCard = ({ comment, length }) => (
  <Card
    title={`Comment ${comment.comment_id}`}
    style={{ width: 300, paddingLeft: "1em", paddingRight: "1em" }}
  >
    <p>{comment.accountId}</p>
    <p>{comment.postId}</p>
    <p>{comment.text}</p>
    <p>{comment.datePosted}</p>
  </Card>
);

const CreateComment = () => {
  let history = useHistory();
  const [commentId, setCommentId] = useState("");
  const [postId, setPostId] = useState("");
  const [accountId, setAccountId] = useState("");
  const [text, setText] = useState("");
  const [crudOption, setCrudOption] = useState(CRUD_OPTIONS.CREATE);
  const [requestedComment, setRequestedComment] = useState();
  const [searchText, setSearchText] = useState("");
  const [keywordComments, setKeywordComments] = useState([]);

  const onCRUDSubmit = async () => {
    let res;

    switch (crudOption) {
      case CRUD_OPTIONS.CREATE:
        res = await createComment({
          postId,
          accountId,
          text,
          date: new Date(),
        });
        console.log(res);

        if (res && res.success)
          message.success(
            `Successfully created comment ${commentId}`
          );
        else message.error("Failed to create comment");

        break;
      case CRUD_OPTIONS.READ:
        res = await getComment(commentId);

        setRequestedComment(res);

        if (!res) message.error(`Failed to read comment ${commentId}`);

        break;
      case CRUD_OPTIONS.UPDATE:
        res = await updateComment({ commentId, text });

        if (res && res.success)
          message.success(`Successfully updated comment ${commentId}`);
        else message.error(`Failed to update comment ${commentId}`);

        break;
      case CRUD_OPTIONS.DELETE:
        res = await deleteComment({ commentId });

        if (res && res.success)
          message.success(`Successfully deleted comment ${commentId}`);
        else message.error(`Failed to delete comment ${commentId}`);

        break;
      default:
        break;
    }
  };

  const onSearch = async () => {
    const res = await searchComment(searchText);

    if (!res)
      message.error(`Failed to find any comments that contained "${searchText}"`);

    setKeywordComments(res ? res : []);
  };

  return (
    <div className="create-account-container">
      <h1>InstaCook</h1>
      <Form onFinish={onCRUDSubmit}>
        <Form.Item label="Comment ID">
          <Input
            rows={12}
            placeholder="0"
            disabled={crudOption === CRUD_OPTIONS.CREATE}
            onChange={(e) => setCommentId(e.target.value)}
          />
        </Form.Item>
        <Form.Item label="Post ID">
          <Input
            rows={12}
            placeholder="0"
            disabled={
              crudOption === CRUD_OPTIONS.DELETE ||
              crudOption === CRUD_OPTIONS.READ ||
              crudOption === CRUD_OPTIONS.UPDATE
            }
            onChange={(e) => setPostId(e.target.value)}
          />
        </Form.Item>
        <Form.Item label="Author ID">
          <Input
            rows={12}
            placeholder="0"
            disabled={
              crudOption === CRUD_OPTIONS.DELETE ||
              crudOption === CRUD_OPTIONS.READ ||
              crudOption === CRUD_OPTIONS.UPDATE
            }
            onChange={(e) => setAccountId(e.target.value)}
          />
        </Form.Item>
        <Form.Item label="Text">
          <Input.TextArea
            rows={12}
            disabled={
              crudOption === CRUD_OPTIONS.DELETE ||
              crudOption === CRUD_OPTIONS.READ
            }
            onChange={(e) => setText(e.target.value)}
          />
        </Form.Item>
        <Radio.Group
          defaultValue={CRUD_OPTIONS.CREATE}
          onChange={(e) => setCrudOption(e.target.value)}
        >
          <Radio value={CRUD_OPTIONS.CREATE}>Create</Radio>
          <Radio value={CRUD_OPTIONS.READ}>Read</Radio>
          <Radio value={CRUD_OPTIONS.UPDATE}>Update</Radio>
          <Radio value={CRUD_OPTIONS.DELETE}>Delete</Radio>
        </Radio.Group>
        <Form.Item>
          <input type="submit" value="Run Action" />
        </Form.Item>
      </Form>
      {requestedComment && (
        <div>
          <h2>Requested Comment</h2>
          <CommentCard comment={requestedComment} length={300} />
        </div>
      )}

      <h2>Keyword Search</h2>
      <Form onFinish={onSearch}>
        <div style={{ display: "flex" }}>
          <Form.Item>
            <Input
              rows={12}
              placeholder="Search keyword"
              onChange={(e) => setSearchText(e.target.value)}
            />
          </Form.Item>
          <Form.Item>
            <input type="submit" value="Search" />
          </Form.Item>
        </div>
      </Form>
      {keywordComments && keywordComments.length > 0 && (
        <div>
          <h2>Comment List</h2>
          <div className="comment-list">
            {keywordComments &&
              keywordComments.map((comment) => (
                <CommentCard comment={comment} />
              ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default CreateComment;
