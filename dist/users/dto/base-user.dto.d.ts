export declare class BaseUserReq {
    email?: string;
    phone: string;
    fio?: string;
}
export declare class BaseUserRes {
    id?: number;
    email?: string;
    phone: string;
    fio?: string;
    createdAt?: Date;
    updatedAt?: Date;
}
export declare class LoginResDto {
    accessToken: string;
    id: number;
    fio?: string;
    phone: string;
    email?: string;
}
export declare class LoginDto {
    phone: string;
    password: string;
}
