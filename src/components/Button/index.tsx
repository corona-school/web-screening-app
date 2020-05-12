import React from "react";
import classes from "./index.module.scss";
import classnames from "classnames";

interface ExternalProps {
	onClick?: () => void;
	inverse?: boolean;
}

const Button: React.FunctionComponent<ExternalProps> = (props) => (
	<button
		onClick={props.onClick}
		className={classnames(classes.buttonBase, {
			[classes.buttonStyle]: !props.inverse,
			[classes.buttonInverseStyle]: props.inverse,
		})}>
		{props.children}
	</button>
);

interface LinkButtonProps {
	link: string;
	inverse?: boolean;
}

export const LinkButton: React.FunctionComponent<LinkButtonProps> = (props) => (
	<a
		href={props.link}
		className={classnames(classes.buttonBase, {
			[classes.buttonStyle]: !props.inverse,
			[classes.buttonInverseStyle]: props.inverse,
		})}
		target="_blank"
		rel="noopener noreferrer">
		{props.children}
	</a>
);

export default Button;
