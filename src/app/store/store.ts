import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import timerReducer, {
	incrementWithActiveCondition,
	updateTimer,
	addBonusEvent,
	updateAndRemoveInactiveTimers
} from '../slices/timer';
import goldReducer, { increment } from '../slices/gold';
import counterReducer from '../slices/counter';
import employeesReducer from '../slices/employee';
import hudReducer from '../slices/hud';
import throttle from 'lodash/throttle';
import { eventsGenerator, loadState, saveState } from '../utils/progressUtils';
import { CONSTANTS } from '../utils/constants';

export const store = configureStore({
	reducer: {
		counter: counterReducer,
		timer: timerReducer,
		gold: goldReducer,
		employee: employeesReducer,
		hud: hudReducer,
	},
	preloadedState: loadState(),
});

/**
 * Persistency trigger
 */
store.subscribe(
	throttle(() => {
		saveState(store.getState());
	}, CONSTANTS.PERSISTENCY_TRIGGER_TIMER),
);

/**
 * Bonus events every 20s
 */
store.subscribe(
	throttle(() => {
		const event = eventsGenerator();
		console.log( !! event );
		if( event ) {
			store.dispatch(addBonusEvent({ ...event }));
		}
	}, CONSTANTS.BONUS_TRIGGER_TIMER ),
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
	store.dispatch(updateAndRemoveInactiveTimers(deltaTime));
}, CONSTANTS.GOLD_RENEWAL_TIMER);

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
	ReturnType,
	RootState,
	unknown,
	Action<string>
>;
