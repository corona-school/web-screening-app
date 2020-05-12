import React from "react";
import Login from "./pages/LoginForm";
import { Switch, Route } from "react-router-dom";
import App from "./App";
import ApiContext from "./api/ApiContext";
import Onboarding from "./pages/Onboarding";
import Procedure from "./pages/Procedure";
import Checklist from "./pages/Checklist";
import Page from "./pages/Page";

const Routes = () => {
	return (
		<Switch>
			<Route path="/queue/:email">
				<ApiContext>
					<Page>
						<App />
					</Page>
				</ApiContext>
			</Route>
			<Route path="/login">
				<ApiContext>
					<Page>
						<Login />
					</Page>
				</ApiContext>
			</Route>
			<Route path="/procedure">
				<Page>
					<Procedure />
				</Page>
			</Route>
			<Route path="/checklist">
				<Page>
					<Checklist />
				</Page>
			</Route>
			<Route path="/">
				<Page>
					<Onboarding />
				</Page>
			</Route>
		</Switch>
	);
};

export default Routes;
