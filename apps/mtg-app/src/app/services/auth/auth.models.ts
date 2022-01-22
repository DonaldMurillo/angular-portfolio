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
	username: string | null;
	accessToken: string | null;
	userType: string | null;
	exp: number;
	userId: string | null;
}


export function createInitialState(): AuthState {
	return {
		username: null,
		accessToken: null,
		userType: null,
		exp: 0,
		isLoading: false,
		userId: null
	};
}
