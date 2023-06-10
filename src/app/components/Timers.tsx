import React, { ChangeEvent, FC, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../hooks/hooks';
import {
	ITimerState,
	addTimer,
	deleteTimer,
	resetTimer,
	selectTimer,
	toggleTimer,
} from '../slices/timer';
import { Bar } from './Bar';
import { selectGold } from '../slices/gold';

export const Timers: FC<any> = () => {
	const defaultValue = 10000;
	const [timeInput, setTimeInput] = useState<number>(defaultValue);

	const timers = useAppSelector(selectTimer);
	const gold = useAppSelector(selectGold);

	const dispatch = useAppDispatch();

	const dummyBonus = 10;

	const [bonus, setBonus] = useState<number>(dummyBonus);

	const handleOnClickAdd = (name: string = Date.now().toString()) => {
		setBonus((prev) => prev * dummyBonus);
		dispatch(
			addTimer({
				name,
				time: timeInput,
				bonus,
			})
		);
	};

	const handleOnClickToggle = (index: number) => {
		dispatch(toggleTimer(index));
	};

	const handleOnClickDelete = (index: number) => {
		dispatch(deleteTimer(index));
	};

	const handleOnClickReset = (time: number = defaultValue, index: number) => {
		dispatch(
			resetTimer({
				time,
				index,
			})
		);
	};

	const handleOnChange = (e: ChangeEvent<HTMLInputElement>): void => {
		setTimeInput(parseInt(e.target.value));
	};

	return (
		<>
			<h1 className="timers__title">Bonus timers</h1>
			<div className="timers__block">
				{timers.length > 0 && (
					<div className="timers__debugger">
						<code>{JSON.stringify({ timers, gold }, null, 4)}</code>
					</div>
				)}
				<div className="timers__current-timers-bar">
					<Bar />
				</div>
				<div className="timers__new-timer">
					<div className="input__container">
						<input
							type="text"
							name="timer"
							placeholder="New timer ms"
							id="timer"
							onChange={handleOnChange}
							value={timeInput}
						/>
						<div className="caret">ms</div>
					</div>
					<button onClick={() => handleOnClickAdd()}>Add</button>
				</div>
				<div className="timers__current-timers-control">
					<ul>
						{timers.length > 0 &&
							timers.map((timer: ITimerState, index: number) => {
								return (
									<li key={`counter-${index}`}>
										<span>Bonus: {timer.bonus}x</span>
										<button onClick={() => handleOnClickToggle(index)}>
											{timer.isRunning ? 'Stop' : 'Resume'}
										</button>
										<button
											onClick={() => handleOnClickReset(timer.base, index)}
										>
											Reset
										</button>
										<button onClick={() => handleOnClickDelete(index)}>
											Remove
										</button>
									</li>
								);
							})}
					</ul>
				</div>
			</div>
		</>
	);
};
