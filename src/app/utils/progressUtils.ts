import { ITimerState } from '../slices/timer';

export const progressBarCalculation = ({ time, base }: ITimerState): number => {
	return base > 0 ? (time * 100) / base : 0;
};

export const formatTime = (time: number): string => {
	const ms = Math.round(time / 100) % 10;
	const secs = Math.floor(time / 1000) % 60;
	return `${secs}.${ms}s`;
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
