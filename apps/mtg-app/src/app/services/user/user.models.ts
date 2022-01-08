import { AppTheme } from "../app/app.model";

export interface UserState {
	id: string | null;
	nickname: string;
	avatarImage: ArrayBuffer | null;
	showTrades: boolean;
	theme: AppTheme | undefined;
}

export function createInitialState(): UserState {
	return {
		id: null,
		nickname: '',
		avatarImage: null,
		showTrades: false,
		theme: undefined,
	}
};
