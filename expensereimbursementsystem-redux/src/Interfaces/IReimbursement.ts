<<<<<<< HEAD
import { IUser} from "./IUser"

export interface IReimbursement {
    reimbursementID: number, 
=======
import { IUser } from "./IUser"

export interface IReimbursement {
    reimbursementID: number,
>>>>>>> mohamed-frontend
    amount: number,
    submittedDate: string,
    resolvedDate?: string,
    description: string,
    reimbursementAuthor: number,
    reimbursementResolver?: number,
    reimbursementStatus: number,
    reimbursementType: number
<<<<<<< HEAD
}
=======
}
>>>>>>> mohamed-frontend
