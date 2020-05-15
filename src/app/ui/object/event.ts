import { Time } from "@angular/common";

export class Event{
	id : number;
	date : string;
	end_time : string;
	name : string;
	start_time : string;
	account : number;
	location: string;
	timeout: number = 10;
	attendees_count : number = 0;
	error: boolean;
	errorDate: string;
	errorName: string;
	errorTime: string;
}