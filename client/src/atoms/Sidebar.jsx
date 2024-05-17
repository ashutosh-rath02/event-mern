import "../index.css";
import { IoPersonOutline } from "react-icons/io5";
import { BiAddToQueue } from "react-icons/bi";
import { CiCalendarDate } from "react-icons/ci";

// eslint-disable-next-line react/prop-types
const Sidebar = ({ onSidebarClick }) => {
  const handleClick = (component) => {
    onSidebarClick(component);
  };

  return (
    <div className="sidebar">
      <button onClick={() => handleClick("profile")} className="sidebar-item">
        <IoPersonOutline size={18} style={{ marginRight: "6px" }} /> Profile
      </button>
      <button onClick={() => handleClick("myEvents")} className="sidebar-item">
        <BiAddToQueue style={{ marginRight: "6px" }} size={18} /> My Events
      </button>
      <button
        onClick={() => handleClick("registeredEvents")}
        className="sidebar-item"
      >
        <CiCalendarDate style={{ marginRight: "6px" }} size={18} /> Registered
        Events
      </button>
    </div>
  );
};

export default Sidebar;
