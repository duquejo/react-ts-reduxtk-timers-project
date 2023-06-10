import { ITimerState } from '../slices/timer';

export const progressBarCalculation = ({ time, base }: ITimerState): number => {
	return base > 0 ? (time * 100) / base : 0;
};

export const formatTime = (time: number): string => {
	const ms = Math.round(time / 100) % 10;
	const secs = Math.floor(time / 1000) % 60;
	return `${secs}.${ms}s`;
};

export const formatGold = (number: number, precisionForce: boolean = false ): string => {
	const equivalencies = [
		{ suffix: 'T', threshold: 1e12, precision: 1 },
		{ suffix: 'B', threshold: 1e9, precision: 1 },
		{ suffix: 'M', threshold: 1e6, precision: 1 },
		{ suffix: 'K', threshold: 1e3, precision: 1 },
		{ suffix: '', threshold: 1, precision: 0 },
	];

	const found = equivalencies.find((x: any) => Math.abs(number) >= x.threshold );
	if( found ) {
		const fraction = ( number / found.threshold );
		return ( number / found.threshold ).toFixed( ! precisionForce ? found.precision : undefined ) + found.suffix;
	}
	return number.toString();
};