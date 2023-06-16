import React, { FC } from 'react';
import { useAppSelector } from '../../hooks/hooks';
import { ITimerState, selectTimer } from '../../slices/timer';
import { Bar } from './Bar';
import { selectGold } from '../../slices/gold';
import { NewTimer } from './NewTimer';
import { TimerControl } from './TimerControl';

export const Timers: FC = () => {
	const timers = useAppSelector(selectTimer);
	const gold = useAppSelector(selectGold);

	return (
		<div className="timers">
			{timers.length > 0 && (
				<div className="timers__debugger">
					<code>{JSON.stringify({ timers, gold }, null, 4)}</code>
				</div>
			)}
			<div className="timers__current-timers-bar">
				{timers.length > 0 &&
					timers.map((timer: ITimerState) => (
						<Bar key={`timer-${timer.name}`} {...timer} />
					))}
			</div>
			{/* Just for debugging */}
			<div className="timers__new-timer">
				<NewTimer />
			</div>
			<div className="timers__current-timers-control">
				{timers.length > 0 && (
					<ul>
						{timers.map((timer: ITimerState, index: number) => {
							return (
								<TimerControl
									key={`counter-${index}`}
									index={index}
									{...timer}
								/>
							);
						})}
					</ul>
				)}
			</div>
		</div>
	);
};
