export declare class User {
    id: number;
    email: string;
    firstName: string;
    lastName: string;
    password: string;
    isEmailVerified: boolean;
    phoneNumber?: string;
    profilePicture?: string;
    role: string;
    createdAt: Date;
    updatedAt: Date;
    get fullName(): string;
}
