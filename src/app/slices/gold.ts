import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { RootState } from '../store/store';

export interface IGoldState {
	total: number;
	multiplier: number;
}

const initialState: IGoldState = {
	total: 1,
	multiplier: 0,
};

export const goldSlice = createSlice({
	name: 'gold',
	initialState,
	reducers: {
		increment: (state: IGoldState, action: PayloadAction<number>) => {
			const value = state.total + action.payload * state.multiplier;
			return {
				...state,
				total: value,
			};
		},
		upgrade: (
			state: IGoldState,
			action: PayloadAction<{ cost: number; multiplier: number }>
		) => {
			const { cost, multiplier } = action.payload;

			if (state.total < cost) {
				alert("You don't have enough money");
				return state;
			}

			return {
				...state,
				total: state.total - cost,
				multiplier: state.multiplier + multiplier,
			};
		},
	},
});

export const { increment, upgrade } = goldSlice.actions;

export const selectGold = (state: RootState): IGoldState => state.gold;

export default goldSlice.reducer;
