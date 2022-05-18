export interface IReimbursement {
    reimbursementID: number,
    amount: string,
    submittedDate: Date,
    resolvedDate?: string,
    description: string,
    reimbursementAuthor: number,
    reimbursementResolver?: number,
    reimbursementStatus: number,
    reimbursementType: number
} 
