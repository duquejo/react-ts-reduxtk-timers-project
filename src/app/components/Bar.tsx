import React, { FC } from 'react';
import { useAppSelector } from '../hooks/hooks';
import { ITimerState, selectTimer } from '../slices/timer';
import { formatTime, progressBarCalculation } from '../utils/progressUtils';

export const Bar: FC<any> = () => {
	const timers = useAppSelector(selectTimer);
	return (
		<>
			{timers &&
				timers.map((timer: ITimerState) => {
					return (
						<div key={timer.name} className="bar__block-outer">
							<div
								className="bar__block-inner"
								style={{ width: `${progressBarCalculation(timer)}%` }}
							>
								{formatTime(timer.time)}
							</div>
						</div>
					);
				})}
		</>
	);
};
