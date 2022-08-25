import { PostItem } from "../types";

type Props = {
  post: PostItem;
};

export function Post({ post }: Props) {
  function addComment(text: string) {
    let newComment = {
      content: text,
      imageId: post.id,
    };

    fetch("http://localhost:3005/comments", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newComment),
    })
      .then((resp) => resp.json())
      .then((comment) => {
        // setPosts({ ...posts, comments: [...posts.comments, comment] });
        // post.comments.push(comment);
        // setPosts([...posts, comment]);
        //try adding comment/setcomment state to this file and then doing:
        //setComments([...comments, comment]);
      });
  }

  return (
    <article className="image-card">
      <h2 className="title">{post.username}</h2>
      <img src={post.imageUrl} className="image" />
      <div className="likes-section">
        <span className="likes">42 likes</span>
        <button className="like-button">♥</button>
      </div>
      <ul className="comments">
        {post.comments.map((comment) => (
          <li key={comment.id}>{comment.content}</li>
        ))}
      </ul>
      <form
        onSubmit={(event) => {
          event.preventDefault();
          addComment(event.target.comment.value);
          event.target.reset();
        }}
        className="comment-form"
      >
        <input
          className="comment-input"
          type="text"
          name="comment"
          placeholder="Add a comment..."
        />
        <button className="comment-button" type="submit">
          Post
        </button>
      </form>
    </article>
  );
}
