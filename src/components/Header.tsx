import React from "react";
import logo from "../icons/logo.svg";
import "./Header.scss";
import { Typography } from "antd";

const { Title } = Typography;

const Header = () => {
	return (
		<div className="header">
			<div>
				<img src={logo} className="logo" alt="Corona School Logo"></img>

				<Title
					level={2}
					style={{
						color: "white",
						fontWeight: "bold",
						margin: "0 0 0 12px",
					}}>
					Corona School
				</Title>
			</div>
		</div>
	);
};

export default Header;
