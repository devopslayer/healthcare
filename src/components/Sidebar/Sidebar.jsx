import {
  FaThLarge,
  FaHistory,
  FaCalendar,
  FaPlusSquare,
  FaChartLine,
  FaCommentDots,
  FaPhone,
  FaCog,
} from "react-icons/fa";
import { useEffect, useState } from "react";
import { NavLink, useLocation } from "react-router-dom";
import sidebarData from "../../data/sidebarData.json";
import "./Sidebar.css";

const iconMap = {
  FaThLarge: <FaThLarge />,
  FaHistory: <FaHistory />,
  FaCalendar: <FaCalendar />,
  FaPlusSquare: <FaPlusSquare />,
  FaChartLine: <FaChartLine />,
  FaCommentDots: <FaCommentDots />,
  FaPhone: <FaPhone />,
  FaCog: <FaCog />,
};

function Sidebar({ isOpen, setIsOpen }) {
  const [menuData, setMenuData] = useState([]);
  const location = useLocation();

  useEffect(() => {
    setMenuData(sidebarData);
  }, []);

  return (
    <div
      className={`sidebar-container ${isOpen ? "show" : ""}`}
      onClick={() => setIsOpen(!isOpen)}
    >
      <div className={`sidebar ${isOpen ? "open" : ""}`}>
        <h2 className="brand-name">
          <span>Health</span>
          <span>care.</span>
        </h2>
        <div className="sidebar-menu">
          {menuData.map((section, headerIndex) => (
            <ul key={headerIndex}>
              {section.header && (
                <li className="sidebar-header">{section.header}</li>
              )}
              {section.items.map((item, index) => {
                const fullHref = `${
                  import.meta.env.BASE_URL
                }${item.href.replace(/^\//, "")}`;
                const isActive = location.pathname === fullHref;
                return (
                  <li
                    className={"sidebar-item " + (isActive ? "active" : "")}
                    key={index}
                  >
                    <span
                      className={`icons ${
                        item.label === "Support" ? "rotate-icon" : ""
                      }`}
                    >
                      {iconMap[item.icon]}
                    </span>
                    <NavLink to={fullHref} className={"anchor"}>
                      {item.label}
                    </NavLink>
                  </li>
                );
              })}
            </ul>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Sidebar;
