import { IReimbursement } from "./IReimbursement"

export interface IUser {
    userID: number,
    userName: string,
    password: string,
    firstName: string,
    lastName: string,
    email: string,
    role: number,
}