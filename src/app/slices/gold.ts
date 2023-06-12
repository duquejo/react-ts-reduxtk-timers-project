import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { RootState, AppThunk } from '../store/store';
import { selectTools, update } from './tools';

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
			return {
				...state,
				total: state.total - cost,
				multiplier: state.multiplier + multiplier,
			};
		},
	},
});

export const selectGold = (state: RootState): IGoldState => state.gold;

export const upgradeBroughtItem =
	(index: number): AppThunk =>
	(dispatch, getState) => {
		const tools = selectTools(getState());
		const { total } = selectGold(getState());

		if (tools[index]) {
			if (total < tools[index].cost) {
				alert("You don't have enough money");
				return;
			}
			/**
			 * Global gold multiplier state change.
			 */
			dispatch(
				upgrade({
					cost: tools[index].cost,
					multiplier: tools[index].profit,
				})
			);
			/**
			 * Global selected tool updation.
			 */
			dispatch(
				update({
					index,
					quantity: 1,
				})
			);
		}
	};

export const { increment, upgrade } = goldSlice.actions;
export default goldSlice.reducer;
