import React from "react";
import logo from "../icons/logo.svg";
import "./Header.scss";

const Header = () => {
	return (
		<div className="header">
			<div>
				<img src={logo} className="logo" alt="Corona School Logo"></img>
				<span className="logo-title">Corona School</span>
			</div>
		</div>
	);
};

export default Header;
