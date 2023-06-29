import React, { ChangeEvent, FC, useState } from 'react';
import { useAppDispatch } from '../../hooks/hooks';
import { addTimer, addTimerWithMessageNotification } from '../../slices/timer';
import { addMessage } from '../../slices/hud';

export const NewTimer: FC = () => {
	const defaultValue = 10000;
	const dummyBonus = 10;

	const [bonus, setBonus] = useState<number>(dummyBonus);
	const [timeInput, setTimeInput] = useState<number>(defaultValue);

	const dispatch = useAppDispatch();

	const handleOnClickAdd = (name: string = Date.now().toString()) => {
		setBonus((prev) => prev * dummyBonus);

		dispatch(
			addTimerWithMessageNotification(
				{
					name,
					time: timeInput,
					bonus,
				},
				`An event: \'${name}\' has been activated!`
			)
		);
	};

	const handleOnChange = (e: ChangeEvent<HTMLInputElement>): void =>
		setTimeInput(parseInt(e.target.value));

	return (
		<>
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
		</>
	);
};
