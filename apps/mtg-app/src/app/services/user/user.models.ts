import { AppTheme } from "../app/app.model";

export interface UserState {
	id: string | null;
	nickname: string;
	avatarImage?: ArrayBuffer | null;
	showTrades: boolean;
	theme: AppTheme | undefined;
	isLoading: boolean;
	//collections: Collection[];

	// createdAt: Date;
	// updatedAt: Date;
	// isActive: boolean;
}

export function createInitialState(): UserState {
	return {
		id: null,
		nickname: '',
		avatarImage: null,
		showTrades: false,
		theme: undefined,
		isLoading: false
	}
};


export type CreateProfileDto = Omit<UserState, 'id' | 'avatarImage' | 'isLoading'>
export type UpdateProfileDto = Omit<UserState, 'avatarImage' | 'isLoading'>