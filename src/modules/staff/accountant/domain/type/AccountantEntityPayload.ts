
export interface AccountantEntityPayload {
    id?: string;
    name: string;
    email: string;
    password: string;
    joinedAt?: Date;
    updatedAt?: Date;
    suppliedDrugs?: any[];
}