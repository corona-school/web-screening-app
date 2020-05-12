import React from "react";
import classes from "./index.module.scss";

interface ExternalProps {
	onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
	inverse?: boolean;
	type?: string;
	value: string;
	placeholder?: string;
	onEnter?: () => void;
	onKeyUp?: (e: React.KeyboardEvent<HTMLInputElement>) => void;
	error: boolean;
}

const Input: React.FunctionComponent<ExternalProps> = (props) => (
	<input
		type={props.type}
		value={props.value}
		placeholder={props.placeholder}
		onChange={props.onChange}
		onKeyUp={(e) => {
			if (props.onKeyUp) props.onKeyUp(e);
			if (props.onEnter && e.key === "Enter") props.onEnter();
		}}
		className={classes.inputStyle}>
		{props.children}
	</input>
);

export default Input;
