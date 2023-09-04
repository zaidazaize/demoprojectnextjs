export interface UserReqBody {
    userName: string;
    email: string;
    password: string;
}

export interface SigninUser {
    email: string;
    password: string;
}

export interface NetworkUser {
    userName: string;
    email: string;
    _id: string;
    isAdmin: boolean;
    isVarified: boolean;
}

export enum EmailType {
    VARIFICATION,
    FORGOT_PASSWORD,
}
export type EmailData = {
    user: any;
    emailType: EmailType;
    validLoc : string;
};