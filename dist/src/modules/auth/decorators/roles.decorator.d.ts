export declare enum UserRole {
    ADMIN = "admin",
    USER = "user"
}
export declare const ROLES_KEY = "roles";
export declare const Roles: (...roles: UserRole[]) => import("@nestjs/common").CustomDecorator<string>;
