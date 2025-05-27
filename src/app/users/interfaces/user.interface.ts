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
}

export interface Role {
    id:   string;
    name: string;
}


export interface RolesResponse {
    success: boolean;
    message: string;
    data:    Role[];
}

export interface Role {
    id:        string;
    name:      string;
    createdAt: Date;
    updatedAt: Date;
}

