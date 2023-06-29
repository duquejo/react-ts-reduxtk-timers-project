import React, { FC } from 'react';
import {
	ITimerState,
	deleteTimer,
	resetTimer,
	toggleTimer,
} from '../../slices/timer';
import { useAppDispatch } from '../../hooks/hooks';

interface ITimerControl extends ITimerState {
	index: number;
}

export const TimerControl: FC<ITimerControl> = ({
	bonus,
	isRunning,
	index,
	base: baseTime,
}: ITimerControl) => {
	const dispatch = useAppDispatch();

	const handleOnClickToggle = (index: number) => {
		dispatch(toggleTimer(index));
	};

	const handleOnClickDelete = (index: number) => {
		dispatch(deleteTimer(index));
	};

	const handleOnClickReset = (time: number, index: number) => {
		dispatch(resetTimer(index));
	};

	return (
		<li>
			<span>Bonus: {bonus}x</span>
			<button onClick={() => handleOnClickToggle(index)}>
				{isRunning ? 'Stop' : 'Resume'}
			</button>
			<button onClick={() => handleOnClickReset(baseTime, index)}>Reset</button>
			<button onClick={() => handleOnClickDelete(index)}>Remove</button>
		</li>
	);
};
