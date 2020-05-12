import React from "react";
import classes from "./index.module.scss";

interface ListProps {}

const List = (props: React.PropsWithChildren<ListProps>) => {
	return <div className={classes.container}>{props.children}</div>;
};

interface ItemProps {
	itemNumber: React.ReactNode | number | string;
}

export const Item = (props: React.PropsWithChildren<ItemProps>) => {
	return (
		<div className={classes.item}>
			<div className={classes.itemNumber}>{props.itemNumber}</div>
			<div className={classes.itemText}>{props.children}</div>
		</div>
	);
};

List.Item = Item;

export default List;
