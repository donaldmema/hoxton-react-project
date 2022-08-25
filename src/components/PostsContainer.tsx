import { PostItem } from "../types";
import { Post } from "./Post";

type Props = { posts: PostItem[] };

export function PostsContainer({ posts }: Props) {
  return (
    <section className="image-container">
      {posts.map((post: PostItem) => (
        <Post key={post.id} post={post} />
      ))}
    </section>
  );
}
