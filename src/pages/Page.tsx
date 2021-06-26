import React from "react";
import Header from "../components/Header";
import classes from "./Page.module.scss";

const Page: React.FunctionComponent = (props) => {
	return (
		<div className={classes.container}>
			<Header />
			<div className={classes.main}>
				<div className={classes.formContainer}>{props.children}</div>
			</div>
			<div className={classes.legal}>
				<a href="https://www.lern-fair.de/datenschutz">
					Datenschutzerklärung
				</a>
				<a href="https://www.lern-fair.de/impressum"> Impressum </a>
        	</div>
		</div>
	);
};

export default Page;
