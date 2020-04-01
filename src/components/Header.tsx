import React from "react";
import logo from "../icons/logo.svg";
import "./Header.scss";

const Header = ({
	isLoggedIn,
	handleLogout
}: {
	isLoggedIn: boolean;
	handleLogout: () => void;
}) => {
	return (
		<div className="header">
			<div>
				<img src={logo} className="logo" alt="Corona School Logo"></img>
				<div className="logo-title">Corona School</div>
			</div>
			{isLoggedIn && (
				<button
					style={{ margin: "4px" }}
					className="button"
					onClick={handleLogout}>
					Später verifizieren lassen
				</button>
			)}
		</div>
	);
};

export default Header;
