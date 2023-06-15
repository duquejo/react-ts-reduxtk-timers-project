import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import timerReducer, {
	incrementWithActiveCondition,
	updateTimer,
} from '../slices/timer';
import goldReducer, { increment } from '../slices/gold';
import counterReducer from '../slices/counter';
import employeesReducer from '../slices/employee';
import throttle from 'lodash/throttle';
import { loadState, saveState } from '../utils/progressUtils';
import { CONSTANTS } from '../utils/constants';

export const store = configureStore({
	reducer: {
		counter: counterReducer,
		timer: timerReducer,
		gold: goldReducer,
		employee: employeesReducer,
	},
	preloadedState: loadState(),
});

store.subscribe(
	throttle(() => {
		saveState(store.getState());
	}, CONSTANTS.STORE_PERSISTENCY_TIMER)
);

let lastUpdatedTime = Date.now();
setInterval(() => {
	const now = Date.now();
	const deltaTime = now - lastUpdatedTime;
	lastUpdatedTime = now;
	// Gold per Second
	store.dispatch(increment(CONSTANTS.GOLD_PER_SECOND));
	// Bonus handling
	store.dispatch(incrementWithActiveCondition());
	// Time handlers
	store.dispatch(updateTimer(deltaTime));
}, CONSTANTS.GOLD_RENEWAL_TIMER);

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
	ReturnType,
	RootState,
	unknown,
	Action<string>
>;
