import { CgAddR } from "react-icons/cg";
import { GrHomeRounded } from "react-icons/gr";
import { RiMessengerLine } from "react-icons/ri";

export function Header() {
  return (
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
  );
}
