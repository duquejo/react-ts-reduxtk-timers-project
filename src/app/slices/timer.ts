import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { AppThunk, RootState } from '../store/store';
import { increment } from './gold';

export interface ITimerState {
	time: number;
	isRunning: boolean;
	name: string;
	base: number;
	bonus: number;
}

interface PartialTimerState extends Partial<ITimerState> {}

const initialState: Array<ITimerState> = [];

export const timerSlice = createSlice({
	name: 'timer',
	initialState,
	reducers: {
		addTimer: (
			state: Array<PartialTimerState>,
			action: PayloadAction<PartialTimerState>
		) => {
			state.push({
				...action.payload,
				base: action.payload.time,
				isRunning: true,
			});
		},
		toggleTimer: (state: Array<ITimerState>, action: PayloadAction<number>) => {
			const index = action.payload;
			return state.map((timer: ITimerState, i: number) => {
				if (i === index && timer.time > 0) {
					return {
						...timer,
						isRunning: !timer.isRunning,
					};
				}
				return timer;
			});
		},
		deleteTimer: (state: Array<ITimerState>, action: PayloadAction<number>) => {
			const index = action.payload;
			return state.filter((_, i: number) => i !== index);
		},
		resetTimer: (
			state: Array<ITimerState>,
			action: PayloadAction<{ time: number; index: number }>
		) => {
			const payload = action.payload;
			return state.map((timer: ITimerState, i: number) => {
				if (i === payload.index) {
					return {
						...timer,
						time: timer.base,
					};
				}
				return timer;
			});
		},
		updateTimer: (state: Array<ITimerState>, action: PayloadAction<number>) => {
			const deltaTime = action.payload;
			return state.map((timer: ITimerState) => {
				if (!!timer.isRunning) {
					const t = timer.time - deltaTime;
					return {
						...timer,
						time: t < 0 ? 0 : t,
						isRunning: t < 0 ? false : true,
					};
				}
				return timer;
			});
		},
	},
});

export const { addTimer, toggleTimer, deleteTimer, resetTimer, updateTimer } =
	timerSlice.actions;

export const selectTimer = (state: RootState): Array<ITimerState> =>
	state.timer;


export const incrementWithActiveConditionv1 = (index: number): AppThunk => (dispatch, getState) => {
	const timers = selectTimer(getState());

	if( timers.length > 0 ) {
		timers.forEach((timer: ITimerState) => {
			if( !! timer.isRunning ) {
				dispatch(increment(1));
			}
		});
	}

	dispatch(updateTimer(index));
};

export const incrementWithActiveCondition = (index: number): AppThunk => (dispatch, getState) => {
	const timers = selectTimer(getState());

	if( timers.length > 0 ) {
		timers.forEach((timer: ITimerState) => {
			if( !! timer.isRunning ) {
				dispatch(increment(timer.bonus));
			}
		});
	}
};

export default timerSlice.reducer;
