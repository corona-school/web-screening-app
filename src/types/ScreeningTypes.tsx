export type Status = "waiting" | "active" | "completed" | "rejected";

export interface Screener {
	email: string;
	firstname: string;
	lastname: string;
}

export interface StudentData {
	id: string;
	email: string;
	firstname: string;
	lastname: string;
	jitsi: string;
}

export interface JobInfo {
	id: string;
	data: StudentData;
	assignedTo?: Screener;
	timeWaiting: number;
	timeActive?: number;
	timeDone?: number;
	status: Status;
	position: number;
}
