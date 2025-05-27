import { Role } from "@roles/interfaces/role.interface";

export interface UsersResponse {
    success: boolean;
    message: string;
    data:    DataUsers;
}

export interface UserResponse {
    success: boolean;
    message: string;
    data:    User;
}

export interface DataUsers {
    totalItems:  number;
    totalPages:  number;
    currentPage: number;
    users:       User[];
}

export interface User {
    id:         string;
    first_name: string;
    last_name:  string;
    email:      string;
    telephone:  string;
    avatar:     string;
    password?:   string;
    createdAt:  Date;
    updatedAt:  Date;
    Role:       Role;
    auth?:       boolean;
    role_id?:   string;
}



