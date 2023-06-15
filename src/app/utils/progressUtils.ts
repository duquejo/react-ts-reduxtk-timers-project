import { ReducersMapObject } from '@reduxjs/toolkit';
import { ITimerState } from '../slices/timer';
import { IEmployeeState } from '../slices/employee';
import { CONSTANTS, FORMAT_SUFFIXES } from './constants';
import { RootState } from '../store/store';

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
		{ suffix: FORMAT_SUFFIXES.SEPTILLION, threshold: 1e24, precision: 1 },
		{ suffix: FORMAT_SUFFIXES.SEXTILLION, threshold: 1e21, precision: 1 },
		{ suffix: FORMAT_SUFFIXES.QUINTILLION, threshold: 1e18, precision: 1 },
		{ suffix: FORMAT_SUFFIXES.QUADRILLION, threshold: 1e15, precision: 1 },
		{ suffix: FORMAT_SUFFIXES.TRILLION, threshold: 1e12, precision: 1 },
		{ suffix: FORMAT_SUFFIXES.BILLION, threshold: 1e9, precision: 1 },
		{ suffix: FORMAT_SUFFIXES.MILLION, threshold: 1e6, precision: 1 },
		{ suffix: FORMAT_SUFFIXES.THOUSAND, threshold: 1e3, precision: 1 },
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
	employees: Array<IEmployeeState>
): boolean => employees.some((p: IEmployeeState) => p.quantity > 0);

export const loadState = (): ReducersMapObject | undefined => {
	try {
		const serializedState = localStorage.getItem(CONSTANTS.GAME_STATE_NAME);
		return serializedState === null ? undefined : JSON.parse(serializedState);
	} catch (error) {
		console.error('Error loading data');
		return undefined;
	}
};

/**
 * The function saves the state object to local storage as a serialized JSON string.
 * @param {any} state - The state parameter is of type "any", which means it can be any data type. In
 * this case, it is the state object that needs to be saved to the local storage.
 */
export const saveState = (state: RootState): void => {
	try {
		const serializedState = JSON.stringify(state);
		localStorage.setItem(CONSTANTS.GAME_STATE_NAME, serializedState);
	} catch (error) {
		console.error('Error saving data');
	}
};

export const clearState = (): void => {
	try {
		localStorage.clear();
		window.location.reload();
	} catch (error) {
		console.error('Error cleaning data');
	}
};
