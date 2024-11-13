
import type { LoginForm, User } from "../types"
import axios from "~/services/app-client/axios"

interface IAuthService {
    login(form: LoginForm): Promise<User>
}

export class AuthService implements IAuthService {

    async login(form: LoginForm): Promise<User> {
        const response = await axios.post<User>("/login", form)
        return response.data
    }
}
