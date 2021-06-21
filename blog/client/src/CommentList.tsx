enum StatusEnum {
  Approved = "approved",
  Rejected = "rejected",
  Pending = "pending",
}

export type CommentType = {
  id: any;
  text: string;
  status: StatusEnum;
};

const CommentList = (props: { comments: CommentType[] }) => {
  const { comments } = props;

  const renderedComments = comments?.map((comment) => {
    return (
      <li key={comment.id}>
        {comment.status === StatusEnum.Approved
          ? comment.text
          : comment.status === StatusEnum.Rejected
          ? "Rejeitado"
          : "Pendente"}
      </li>
    );
  });

  return <ul>{renderedComments}</ul>;
};

export default CommentList;
