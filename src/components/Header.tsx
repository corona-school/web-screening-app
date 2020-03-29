import React from "react";
import logo from "../icons/logo.svg";
import "./Header.scss";

const Header = () => {
	return (
		<div className="header">
			<img src={logo} className="logo" alt="Corona School Logo"></img>
			<div className="logo-title">Corona School</div>
		</div>
	);
};

export default Header;
