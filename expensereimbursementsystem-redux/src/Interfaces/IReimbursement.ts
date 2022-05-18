export interface IReimbursement {
    reimbursementID: number,
    amount: number,
    submittedDate: string,
    resolvedDate?: string,
    description: string,
    reimbursementAuthor: number,
    reimbursementResolver?: number,
    reimbursementStatus: number,
    reimbursementType: number
} 
