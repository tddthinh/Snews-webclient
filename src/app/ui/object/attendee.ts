import { Label } from "./label";

export class Attendee{
    labels: Label[] = [];
    id: number;
    fullname: string = '';
    code: string = '';
    email: string = '';
    rfid: string;
    error: boolean;
    exists: boolean;
    in: boolean = false;
    out: boolean = false;
    eventId: number;
    errorFullname : string;
    errorEmail: string;
    errorCode: string;
    errorRfid: string;
}