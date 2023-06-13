import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { RootState } from '../store/store';

export interface IPersonalState {
	name: ROLES;
	quantity: number;
	profit: number;
	cost: number;
}

export enum ROLES {
	DEVELOPER = 'Developer',
	DESIGNER = 'Graphic designer',
	TESTER = 'Tester',
	SCRUM_MASTER = 'Scrum master',
	MARKETER = 'Marketer',
	PRODUCTION_MANAGER = 'Production manager',
}

const initialState: Array<IPersonalState> = [
	{
		name: ROLES.DEVELOPER,
		quantity: 0,
		profit: 1,
		cost: 1,
	},
	{
		name: ROLES.DESIGNER,
		quantity: 0,
		profit: 5,
		cost: 5000,
	},
	{
		name: ROLES.TESTER,
		quantity: 0,
		profit: 10,
		cost: 80000,
	},
	{
		name: ROLES.SCRUM_MASTER,
		quantity: 0,
		profit: 15,
		cost: 200000,
	},
	{
		name: ROLES.MARKETER,
		quantity: 0,
		profit: 20,
		cost: 600000,
	},
	{
		name: ROLES.PRODUCTION_MANAGER,
		quantity: 0,
		profit: 25,
		cost: 1000000,
	},
];

export const toolsSlice = createSlice({
	name: 'tool',
	initialState,
	reducers: {
		update: (
			state: Array<IPersonalState>,
			action: PayloadAction<{ index: number; quantity: number }>
		) => {
			const { index, quantity } = action.payload;
			return state.map((tool: IPersonalState, i: number) => {
				if (index === i) {
					const newQuantity = tool.quantity + quantity;
					const nextCost = tool.cost * Math.pow(1.05, newQuantity);
					console.log(newQuantity, nextCost);
					return {
						...tool,
						quantity: newQuantity,
						cost: nextCost,
					};
				}
				return tool;
			});
		},
	},
});

/**
 * @todo Revisar si el quantity efectivamente se actualiza sin duplicar valores (ver si al comprar el primero salen dos después)
 */

export const { update } = toolsSlice.actions;

export const selectTools = (state: RootState): Array<IPersonalState> =>
	state.tool;

export default toolsSlice.reducer;
