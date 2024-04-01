import React, { useState } from 'react';
import { NavLink } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { toggleCategory } from "../features/ui";
import "./css/VerticalMenu.css";

const VerticalMenu = ({ categories }) => {
  const dispatch = useDispatch()
  const [hoveredIndex, setHoveredIndex] = useState(null);

  const { expandedCategories } = useSelector(state => state.ui);

  const handleToggleCategory = (category) => {
    dispatch(toggleCategory(category));
  };

  return (
    <div className="vertical-menu">
      {categories.map((category, index) => (
        <div>
        <div className="category-header" onClick={() => handleToggleCategory(category)}>
            <p>
              <span className="material-symbols-outlined">
                {expandedCategories.includes(category) ? "arrow_drop_down" : "arrow_right"}
              </span>
              {category.name}
            </p>
          </div>
          {expandedCategories.includes(category) && (
            <ul className="category-items">
              {category.items.map((item, itemIndex) => (
                <li
                  key={item.name}
                  onMouseEnter={() => setHoveredIndex(item.name)}
                  onMouseLeave={() => setHoveredIndex(null)}
                  className={item.name === hoveredIndex ? "hovered" : ""}
                >
                  <NavLink to={item.url}>
                    {item.name}
                  </NavLink>
                </li>
              ))}
            </ul>
          )}
        </div>
      ))}
    </div>
  );
};

export default VerticalMenu;