import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { AppThunk, RootState } from '../store/store';
import { increment, selectGold } from './gold';
import { SLICE_NAMES, BONUS_EVENTS } from '../utils/constants';
import { addMessage } from './hud';

export interface ITimerState {
	time: number;
	isRunning: boolean;
	name: string;
	base: number;
	bonus: number;
}

export interface IBonusEvent {
	name: BONUS_EVENTS;
	bonus: number;
}

const initialState: Array<ITimerState> = [];

export const timerSlice = createSlice({
	name: SLICE_NAMES.TIMER,
	initialState,
	reducers: {
		addTimer: (
			state: Array<Partial<ITimerState>>,
			action: PayloadAction<Partial<ITimerState>>
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
			action: PayloadAction<number>
		) => {
			const payload = action.payload;
			return state.map((timer: ITimerState, i: number) => {
				if (i === payload) {
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
				if (timer.isRunning) {
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

export const selectTimer = (state: RootState): Array<ITimerState> =>
	state.timer;

export const updateAndRemoveInactiveTimers = (deltaTime: number): AppThunk => (dispatch, getState) => {
	const timers = selectTimer(getState());
	dispatch(updateTimer(deltaTime));
	if (timers.length > 0) {
		const finishedIndex = timers.findIndex(({ isRunning, time }: ITimerState) => isRunning === false && time === 0);
		if (finishedIndex !== -1) {
			dispatch(deleteTimer(finishedIndex));
			dispatch(addMessage({
				content: `An event has finished`,
				time: Date.now(),
			}));
		};
	}
};

export const addTimerWithMessageNotification = (time: Partial<ITimerState>, message: string): AppThunk => (dispatch) => {
	dispatch(addTimer({
		...time,
	}));
	dispatch(addMessage({
		content: message,
		time: Date.now(),
	}));
};

export const incrementWithActiveCondition =
	(): AppThunk => (dispatch, getState) => {
		const timers = selectTimer(getState());
		if (timers.length > 0) {
			timers.forEach(({ bonus, isRunning }: ITimerState) => {
				if (isRunning) {
					dispatch(increment(bonus));
				}
			});
		}
	};

export const addBonusEvent = ({ name: bonusName, bonus: bonusValue }: IBonusEvent): AppThunk => (dispatch, getState) => {
	const timers = selectTimer(getState());
	const { multiplier } = selectGold(getState());

	if( multiplier === 0 ) return;

	if (timers.length > 0) {
		const foundIndex = timers.findIndex( ({ name, isRunning }: ITimerState) => name === bonusName && isRunning === true );
		if( foundIndex !== -1 ) {
			console.log('restarted');
			dispatch(resetTimer(foundIndex));
			dispatch(addMessage({
				content: `The event '${ bonusName }' has been restarted!`,
				time: Date.now(),
			}));
			return;
		}
	}

	dispatch(
		addTimerWithMessageNotification(
			{
				name: bonusName,
				time: 10000,
				bonus: bonusValue,
			},
			`An event: '${bonusName}' has been activated!`
		)
	);
};

export const { addTimer, toggleTimer, deleteTimer, resetTimer, updateTimer } =
	timerSlice.actions;
export default timerSlice.reducer;
