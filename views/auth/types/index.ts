export interface LoginForm {
    email: string;
    password: string;
}

export interface User {
    id: string;
    fullName: string;
    email: string;
    role: string;
    roleId: number;
    token: string;
    image?: string;
    companyName?: null;
    cardNumber?: null;
}