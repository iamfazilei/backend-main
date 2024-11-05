import React from "react";
import { Icon } from '@iconify/react';
import menuIcon from '@iconify/icons-mdi/menu';
import PropTypes from "prop-types";
import '../css/Instructor.css'; 

const HeaderSideBar = ({ toggleSidebar }) => {
  return (
    <header id="burger" className="d-flex justify-content-left align-items-left p-3">
      <button className="btn custom-btn d-md-none" onClick={toggleSidebar}>
        <Icon icon={menuIcon} />
      </button>
    </header>
  );
};

HeaderSideBar.propTypes = {
  toggleSidebar: PropTypes.func.isRequired,
};

export default HeaderSideBar;