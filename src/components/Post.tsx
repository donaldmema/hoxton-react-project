import "./Post.css";
import { PostItem } from "../types";
import { Link } from "react-router-dom";

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
    }).then((resp) => resp.json());
  }

  return (
    <article className="image-card">
      <Link to={`/${post.userId}/${post.username}`}>
        <div className="image-card-header">
          <img
            className="image-card__user-avatar"
            src="https://images.pexels.com/photos/2023384/pexels-photo-2023384.jpeg"
            alt="profile pic"
          />
          <h2 className="title">{post.username}</h2>
        </div>
      </Link>

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
