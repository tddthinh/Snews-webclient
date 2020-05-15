import { Role } from "./role";

export class User{
    id: number;
    email: string;
	fullname: string;
    username: string;
    password: string;
	role: Role;
    token: string;
    errorUsername: string;
    errorPassword: string;
    errorEmail: string;
    errorFullname: string;
    error: boolean;
    
}