export type CommentType = {
  id: any;
  text: string;
};

const CommentList = (props: { comments: CommentType[] }) => {
  const { comments } = props;

  const renderedComments = comments?.map((comment) => {
    return <li key={comment.id}>{comment.text}</li>;
  });

  return <ul>{renderedComments}</ul>;
};

export default CommentList;
