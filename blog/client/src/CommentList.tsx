import React, { useState, useEffect } from "react";
import axios from "axios";

type CommentListProps = {
  postID: string;
};

type CommentType = {
  id: any;
  text: string;
};

const CommentList = (props: CommentListProps) => {
  const [comments, setComments] = useState<CommentType[]>([]);

  const { postID } = props;

  const fetchData = async () => {
    const res = await axios.get(
      `http://localhost:4001/posts/${postID}/comments`
    );

    setComments(res.data);
  };

  useEffect(() => {
    fetchData();
  }, []);

  const renderedComments = comments?.map((comment) => {
    return <li key={comment.id}>{comment.text}</li>;
  });

  return <ul>{renderedComments}</ul>;
};

export default CommentList;
