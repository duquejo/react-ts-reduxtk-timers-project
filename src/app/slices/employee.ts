import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { RootState } from '../store/store';
import { CONSTANTS, ROLES, SLICE_NAMES } from '../utils/constants';

export interface IEmployeeState {
	name: ROLES;
	quantity: number;
	profit: number;
	cost: number;
}

const initialState: Array<IEmployeeState> = CONSTANTS.EMPLOYEES_CONFIG;

export const employeesSlice = createSlice({
	name: SLICE_NAMES.EMPLOYEES,
	initialState,
	reducers: {
		update: (
			state: Array<IEmployeeState>,
			action: PayloadAction<{ index: number; quantity: number }>
		) => {
			const { index, quantity } = action.payload;
			return state.map((employee: IEmployeeState, i: number) => {
				if (index === i) {
					const newQuantity = employee.quantity + quantity;
					const nextCost =
						employee.cost * Math.pow(CONSTANTS.COST_INCREASE_RATE, newQuantity);
					return {
						...employee,
						quantity: newQuantity,
						cost: nextCost,
					};
				}
				return employee;
			});
		},
	},
});

export const { update } = employeesSlice.actions;

export const selectEmployees = (state: RootState): Array<IEmployeeState> =>
	state.employee;

export default employeesSlice.reducer;
