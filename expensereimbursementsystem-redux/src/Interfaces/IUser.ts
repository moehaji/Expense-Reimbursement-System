import { IReimbursement } from "./IReimbursement"

export interface IUser {
    userID: number,
    username: string,
    password: string,
    firstName: string,
    lastName: string,
    email: string,
    role: number,
}