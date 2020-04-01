export type Status = "waiting" | "active" | "completed" | "rejected";

export interface Screener {
	firstname: string;
	lastname: string;
}

export interface Job {
	firstname: string;
	lastname: string;
	email: string;
	time: number;
	jitsi: string;
	status: Status;
}
export interface JobInfo extends Job {
	position?: number;
	screener?: Screener;
}
