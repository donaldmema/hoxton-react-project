import { Characteristics, Post, User } from "../types";
import { GrHomeRounded } from "react-icons/Gr";
import { RiMessengerLine } from "react-icons/Ri";
import { CgAddR } from "react-icons/cg";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Header } from "../components/Header";
type Props = {
  user: User | null;
};

export function HomePage({ user }: Props) {
  const [usersIds, setUsersIds] = useState<number[]>([]);

  const [currentUserCharacteristics, setCurrentUserCharacteristics] =
    useState<Characteristics>();

  const [usersCharacteristics, setUsersCharacteristics] = useState<
    Characteristics[]
  >([]);

  const [posts, setPosts] = useState<Post[]>([]);

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
    let compatiblePosts: Post[] = [];
    posts.forEach((post) => {
      if (usersIds.includes(post.userId)) compatiblePosts.push(post);
    });
    setPosts(compatiblePosts);
  }

  useEffect(() => {
    if (user === null) {
      navigate("/sign-in");
    }
  }, []);

  useEffect(() => {
    fetch(`http://localhost:3005/posts`)
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
      <Header />
      <aside></aside>
      <main>
        <article>
          <img src="" alt="profile" />
          <span>username</span>
          <img src="" alt="post img" />
        </article>
        <article></article>
        <article></article>
      </main>
      <aside>
        <footer></footer>
      </aside>
    </div>
  );
}
