import { useState, useEffect } from "react";
import axios from "axios";

const url: string = (window as any).env
	? (window as any).env.REACT_APP_BACKEND_URL
	: process.env.REACT_APP_BACKEND_URL || "http://localhost:3001/";

const openingHoursPath = "openingHours";

export interface ITime {
	id: string;
	week: number;
	from: string;
	to: string;
}

const useOpeningHours = () => {
	const [openingHours, setOpeningHours] = useState<ITime[] | null>(null);
	const [loading, setLoading] = useState(false);

	useEffect(() => {
		setLoading(true);
		axios
			.get(url + openingHoursPath)
			.then(({ data }) => {
				setLoading(false);
				setOpeningHours(data);
			})
			.catch((err) => {
				setLoading(false);
				console.log("Get Database Stats failed.", err);
			});
	}, []);

	return { openingHours, loading };
};

export default useOpeningHours;
