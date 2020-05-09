import React from "react";
import Login from "./components/LoginForm";
import { Switch, Route } from "react-router-dom";
import App from "./App";
import ApiContext from "./api/ApiContext";
import Onboarding from "./components/Onboarding";
import Procedure from "./components/Procedure";
import Checklist from "./components/Checklist";

const Routes = () => {
	return (
		<Switch>
			<Route path="/queue/:email">
				<ApiContext>
					<App />
				</ApiContext>
			</Route>
			<Route path="/login">
				<ApiContext>
					<Login />
				</ApiContext>
			</Route>
			<Route path="/procedure">
				<Procedure />
			</Route>
			<Route path="/checklist">
				<Checklist />
			</Route>
			<Route path="/">
				<Onboarding />
			</Route>
		</Switch>
	);
};

export default Routes;
