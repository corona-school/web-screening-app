import React from "react";
import Login from "./components/LoginForm";
import { Switch, Route } from "react-router-dom";
import App from "./App";
import ApiContext from "./api/ApiContext";

const Routes = () => {
	return (
		<Switch>
			<Route path="/queue/:email">
				<ApiContext>
					<App />
				</ApiContext>
			</Route>
			<Route path="/">
				<ApiContext>
					<Login />
				</ApiContext>
			</Route>
		</Switch>
	);
};

export default Routes;
