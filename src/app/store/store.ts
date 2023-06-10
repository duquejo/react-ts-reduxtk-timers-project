import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import timerReducer, { incrementWithActiveCondition, updateTimer } from '../slices/timer';
import goldReducer, { increment } from '../slices/gold';
import counterReducer from '../slices/counter';

export const store = configureStore({
	reducer: {
		counter: counterReducer,
		timer: timerReducer,
		gold: goldReducer,
	},
});

const base = 1;

let lastUpdatedTime = Date.now();
setInterval(() => {
	const now = Date.now();
	const deltaTime = now - lastUpdatedTime;
	lastUpdatedTime = now;
	// Gold per Second
	store.dispatch(increment(base));
	// Bonus handling
	store.dispatch(incrementWithActiveCondition(deltaTime));
	// Time handlers
	store.dispatch(updateTimer(deltaTime));
}, 50);

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
	ReturnType,
	RootState,
	unknown,
	Action<string>
>;
