import { FaPlus } from "react-icons/fa";
import Avatar1 from "../../assets/avatar1.png";
import "./User.css";

function User() {
  return (
    <div className="user">
      <div className="user-avatar">
        <img src={Avatar1} alt="User Avatar" />
      </div>
      <button className="user-button">
        <FaPlus />
      </button>
    </div>
  );
}

export default User;
