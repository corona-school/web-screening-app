export type Status = "waiting" | "active" | "completed" | "rejected";

export type ScreeningType = "intern" | "instructor" | "tutor" | "projectCoach";

export interface Screener {
	email: string;
	firstname: string;
	lastname: string;
}

export interface StudentData {
	id: string;
	email: string;
	firstName: string;
	lastName: string;
	jitsi: string;
	screeningTypes: ScreeningType[];
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
