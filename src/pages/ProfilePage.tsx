import "./ProfilePage.css";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { PostItem, User } from "../types";

type Props = {
  user: User | null;
  handleSignOut: () => void;
};

export function ProfilePage({ user, handleSignOut }: Props) {
  const navigate = useNavigate();
  const params = useParams();
  const [targetedUser, setTargetedUser] = useState<User | null>(null);
  const [targetedUserPosts, setTargetedUserPosts] = useState<PostItem[]>([]);

  useEffect(() => {
    if (user === null) {
      navigate("/sign-in");
    }
  }, [user]);

  useEffect(() => {
    fetch(`http://localhost:3005/users/${params.userId}`)
      .then((resp) => resp.json())
      .then((userFromServer) => setTargetedUser(userFromServer));
  }, []);

  useEffect(() => {
    fetch(`http://localhost:3005/posts?userId=${params.userId}`)
      .then((resp) => resp.json())
      .then((postsFromServer) => setTargetedUserPosts(postsFromServer));
  }, []);

  // console.log(targetedUserPosts[0].username);

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
      <div className="profile__container">
        <section className="profile__bio-section">
          <div className="profile__bio-section-left">
            <img
              src="https://images.pexels.com/photos/1009922/pexels-photo-1009922.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
              alt="Profile"
            />
          </div>
          <div className="profile__bio-section-right">
            <h2>"targetedUserPosts[0].username"</h2>
          </div>
        </section>
        <section className="profile__posts-section"></section>
      </div>
    </div>
  );
}
