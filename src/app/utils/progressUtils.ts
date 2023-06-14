import { ITimerState } from '../slices/timer';
import { IPersonalState } from '../slices/tools';

export const progressBarCalculation = ({ time, base }: ITimerState): number => {
	return base > 0 ? (time * 100) / base : 0;
};

export const formatTime = (ms: number) => {
	if (ms < 0) ms = -ms;
	const time = {
		d: Math.floor(ms / 86400000),
		h: Math.floor(ms / 3600000) % 24,
		m: Math.floor(ms / 60000) % 60,
		s: Math.floor(ms / 1000) % 60,
	};
	return Object.entries(time)
		.filter((val) => val[1] !== 0)
		.map((val) => val[1] + '' + val[0])
		.join('');
};

interface IFormatGold {
	suffix: string;
	threshold: number;
	precision: 1 | 0;
}

export const formatGold = (number: number, precisionForce = false): string => {
	const equivalencies: Array<IFormatGold> = [
		{ suffix: 'T', threshold: 1e12, precision: 1 },
		{ suffix: 'B', threshold: 1e9, precision: 1 },
		{ suffix: 'M', threshold: 1e6, precision: 1 },
		{ suffix: 'K', threshold: 1e3, precision: 1 },
		{ suffix: '', threshold: 1, precision: 0 },
	];

	const found = equivalencies.find(
		(x: IFormatGold) => Math.abs(number) >= x.threshold
	);
	if (found) {
		const fraction = number / found.threshold;
		return (
			fraction.toFixed(!precisionForce ? found.precision : 1) + found.suffix
		);
	}
	return number.toString();
};

export const activeEmployeesCheck = (
	employees: Array<IPersonalState>
): boolean => employees.some((p: IPersonalState) => p.quantity > 0);


export const loadState = (): Object | undefined => {
	try {
		let serializedState = localStorage.getItem('IdleWorkers');
		return serializedState === null
			? undefined
			: JSON.parse(serializedState);
	} catch (error) {
		return undefined;
	}
};

/**
 * The function saves the state object to local storage as a serialized JSON string.
 * @param {any} state - The state parameter is of type "any", which means it can be any data type. In
 * this case, it is the state object that needs to be saved to the local storage.
 */
export const saveState = (state: any): void => {
	try {
		const serializedState = JSON.stringify(state);
		localStorage.setItem('IdleWorkers', serializedState);
	} catch (error) {
		console.error('Error saving data');
	}
};