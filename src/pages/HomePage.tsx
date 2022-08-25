import { CharacteristicsItem, PostItem, User } from "../types";
import { GrHomeRounded } from "react-icons/Gr";
import { RiMessengerLine } from "react-icons/Ri";
import { CgAddR } from "react-icons/cg";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { PostsContainer } from "../components/PostsContainer";
type Props = {
  user: User | null;
  setUser: React.Dispatch<React.SetStateAction<User | null>>;
};

export function HomePage({ user, setUser }: Props) {
  const [usersIds, setUsersIds] = useState<number[]>([]);

  const [currentUserCharacteristics, setCurrentUserCharacteristics] =
    useState<CharacteristicsItem>();

  const [usersCharacteristics, setUsersCharacteristics] = useState<
    CharacteristicsItem[]
  >([]);

  const [posts, setPosts] = useState<PostItem[]>([]);

  const navigate = useNavigate();

  function findCompatibleUsersIds() {
    let compatibleUsersIds: number[] = [];

    usersCharacteristics.forEach((userCharacteristic) => {
      let totalCommonAnswers = 0;
      if (!currentUserCharacteristics) return;
      if (currentUserCharacteristics.answer1 === userCharacteristic.answer1)
        totalCommonAnswers++;
      if (currentUserCharacteristics.answer2 === userCharacteristic.answer2)
        totalCommonAnswers++;
      if (currentUserCharacteristics.answer3 === userCharacteristic.answer3)
        totalCommonAnswers++;
      if (currentUserCharacteristics.answer4 === userCharacteristic.answer4)
        totalCommonAnswers++;
      if (currentUserCharacteristics.answer5 === userCharacteristic.answer5)
        totalCommonAnswers++;
      if (currentUserCharacteristics.answer6 === userCharacteristic.answer6)
        totalCommonAnswers++;

      if (totalCommonAnswers >= 4)
        compatibleUsersIds.push(userCharacteristic.userId);
    });
    setUsersIds(compatibleUsersIds);
  }

  function filterPostsForCompatibleUsers() {
    let compatiblePosts: PostItem[] = [];
    posts.forEach((post) => {
      if (usersIds.includes(post.userId)) compatiblePosts.push(post);
    });
    setPosts(compatiblePosts);
  }

  function handleSignOut() {
    localStorage.removeItem("id");
    setUser(null);
  }

  useEffect(() => {
    if (user === null) {
      navigate("/sign-in");
    }
  }, [user]);

  useEffect(() => {
    fetch(`http://localhost:3005/posts?_embed=comments`)
      .then((res) => res.json())
      .then((postsFromServer) => setPosts(postsFromServer));
  }, []);

  useEffect(() => {
    fetch(`http://localhost:3005/characteristics?userId=${user?.id}`)
      .then((res) => res.json())
      .then((userCharacteristics) =>
        setCurrentUserCharacteristics(userCharacteristics[0])
      );
  }, []);

  useEffect(() => {
    fetch(`http://localhost:3005/characteristics?userId_ne=${user?.id}`)
      .then((res) => res.json())
      .then((userCharacteristics) =>
        setUsersCharacteristics(userCharacteristics)
      );
  }, []);

  useEffect(() => {
    findCompatibleUsersIds();
    filterPostsForCompatibleUsers();
  }, [currentUserCharacteristics, usersCharacteristics]);

  return (
    <div>
      <header className="header">
        <div className="app-title">
          <h1>Swinder</h1>
        </div>
        <input
          className="search-input"
          type="search"
          name="search"
          placeholder="Search"
        />
        <div className="header-right-section">
          <GrHomeRounded className="react-icons" />
          <RiMessengerLine className="react-icons" />
          <CgAddR className="react-icons" />
          <img
            className="user-avatar"
            src="https://images.pexels.com/photos/1851164/pexels-photo-1851164.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
            alt="Profile"
          />
          <span>
            <button className="signout-btn" onClick={() => handleSignOut()}>
              Sign out
            </button>
          </span>
        </div>
      </header>
      <aside></aside>
      <main>
        <PostsContainer posts={posts} />
        <article>
          <img
            className="user-avatar"
            src="https://images.pexels.com/photos/1851164/pexels-photo-1851164.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
            alt="profile"
          />
          <span>username</span>
          <img
            src="https://images.pexels.com/photos/1851164/pexels-photo-1851164.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
            alt="post img"
          />
        </article>
        <article className="image-card">
          <h2 className="title">Username</h2>
          <img
            src="https://images.pexels.com/photos/1851164/pexels-photo-1851164.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
            className="image"
          />
          <div className="likes-section">
            <span className="likes">post.likes likes</span>
            <button className="like-button">♥</button>
          </div>
          <ul className="comments">
            <li>
              Lorem ipsum dolor sit, amet consectetur adipisicing elit. Quasi,
              sit?
            </li>
          </ul>
          <form
            onSubmit={(event) => {
              event.preventDefault();
              // addComment(event.target.comment.value);
              // event.target.reset();
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
      </main>
      <aside>
        <footer></footer>
      </aside>
    </div>
  );
}
