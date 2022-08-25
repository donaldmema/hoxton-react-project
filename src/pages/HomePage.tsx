import { Characteristics, User } from "../types";
import { GrHomeRounded } from "react-icons/Gr";
import { RiMessengerLine } from "react-icons/Ri";
import { CgAddR } from "react-icons/cg";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
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
  const navigate = useNavigate();

  useEffect(() => {
    if (user === null) {
      navigate("/sign-in");
    }
  }, []);

  // useEffect(() => {   //maybe i dont need this
  //   fetch(`http://localhost:3005/users?id_ne=${user?.id}`)
  //     .then((res) => res.json())
  //     .then((usersFromServer) => setUsers(usersFromServer));
  // }, []);

  useEffect(() => {
    fetch(`http://localhost:3005/characteristics?userId=${user?.id}`)
      .then((res) => res.json())
      .then((userCharacteristics) =>
        setCurrentUserCharacteristics(userCharacteristics)
      );
  }, []);

  useEffect(() => {
    fetch(`http://localhost:3005/characteristics?userId_ne=${user?.id}`)
      .then((res) => res.json())
      .then((userCharacteristics) =>
        setUsersCharacteristics(userCharacteristics)
      );
  }, []);

  // function findCompatibleUsersIds(
  //   currentUserCharacteristics: Characteristics,
  //   userCharacteristics: Characteristics
  // ) {
  //   let totalCommonAnswers = 0;

  //   if (currentUserCharacteristics.answer1 === userCharacteristics.answer1)
  //     totalCommonAnswers++;
  //   if (currentUserCharacteristics.answer2 === userCharacteristics.answer2)
  //     totalCommonAnswers++;
  //   if (currentUserCharacteristics.answer3 === userCharacteristics.answer3)
  //     totalCommonAnswers++;
  //   if (currentUserCharacteristics.answer4 === userCharacteristics.answer4)
  //     totalCommonAnswers++;
  //   if (currentUserCharacteristics.answer5 === userCharacteristics.answer5)
  //     totalCommonAnswers++;
  //   if (currentUserCharacteristics.answer6 === userCharacteristics.answer6)
  //     totalCommonAnswers++;

  //   if (totalCommonAnswers >= 4) return userCharacteristics.userId;
  //   else return;
  // }

  let compatibleUsersIds: number[] = [];

  let compatibleUsersCharacteristics = usersCharacteristics.forEach(
    (userCharacteristic) => {
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

      console.log(
        currentUserCharacteristics.answer1,
        userCharacteristic.answer1
      );
      console.log(totalCommonAnswers);

      if (totalCommonAnswers >= 4)
        compatibleUsersIds.push(userCharacteristic.userId);
    }
  );

  console.log(compatibleUsersIds);

  return (
    <div>
      <header>
        <h1>Swinder</h1>
        <input type="search" name="search" placeholder="Search" />
        <GrHomeRounded />
        <RiMessengerLine />
        <CgAddR />
        <img src="" alt="Profile" />
        <span>
          <button>Sign out</button>
        </span>
      </header>
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
