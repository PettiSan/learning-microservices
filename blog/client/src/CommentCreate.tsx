import React, { useState } from "react";
import axios from "axios";

type CommentCreateProps = {
  postID: string;
};

const CommentCreate = (props: CommentCreateProps) => {
  const [text, setText] = useState("");

  const { postID } = props;

  const onSubmit = async (event: any) => {
    event.preventDefault();

    await axios.post(`http://localhost:4001/posts/${postID}/comments`, {
      text,
    });

    setText("");
  };

  return (
    <div>
      <form onSubmit={onSubmit}>
        <div className="form-group">
          <label>New Comment</label>
          <input
            value={text}
            onChange={(e) => setText(e.target.value)}
            className="form-control"
          />
        </div>
        <button className="btn btn-primary">Submit</button>
      </form>
    </div>
  );
};

export default CommentCreate;
