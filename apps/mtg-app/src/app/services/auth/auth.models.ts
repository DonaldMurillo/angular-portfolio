export interface UserCredentials {
	username: string;
	password: string;
}

export interface CreateUserCommand extends UserCredentials{
	email: string;
}

export interface AuthState {
	isLoading: boolean;
	//JWT
	username: string;
	accessToken: string;
	userType: string;
	exp: number;
	userId?: string;
}


export function createInitialState(): AuthState {
	return {
		username: '',
		accessToken: '',
		userType: '',
		exp: 0,
		isLoading: false,
	};
}
